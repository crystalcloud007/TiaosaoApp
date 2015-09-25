/**
 * Created by Haoran on 2015/9/24.
 */
var config = require('../configs/config');
var config_entry = require('../configs/config_entry');
var User = require('../models/User');
var UserLog = require('../models/UserLog');
var AD = require('../models/AD');
var Captcha = require('../models/Captcha');
var Entry = require('../models/Entry');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var formidable = require('formidable');
var secret_key = config.secret_key;

// 设置token，强制规定每周过期。
function CreateToken(user)
{
    var token = jwt.sign(
        {
            id: user._id,
            //username: user.username,
            admin:user.admin
        },
        secret_key,
        {
            expiresInMinutes : 10080
        }
    );

    return token;
}

module.exports = function(app,express)
{
    var api = express.Router();

    api.post('/login', function(req,res)
    {
        User.findOne({username:req.body.username}).select('password admin').exec(function(err,user)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            if(user)
            {
                var valid = user.comparePassword(req.body.password);
                if(valid)
                {
                    var token = CreateToken(user);
                    UserLog.create({target:user._id, action:config.user_action.login, ip:req.ip});
                    res.send({status:'success', token:token});
                }
                else
                {
                    UserLog.create({target:user._id, action:config.user_action.login_err_pass, ip:req.ip});
                    res.send({status:'invalid_password'});
                }
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 需要来一个中间件作为屏障
    api.use(function(req, res, next)
    {
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        if(token)
        {
            jwt.verify(token, secret_key, function(err, decoded)
            {
                if(err)
                {
                    res.status(403).send({status:'auth_failed'});
                    return;
                }

                if(decoded.admin)
                {
                    req.decoded = decoded;
                    next();
                }
                else
                {
                    res.status(403).send({status:'not_admin'});
                }
            });
        }
        else
        {
            res.status(403).send({status:'no_token'});
        }
    });

    api.get('/ad_list/:region/:display/:page',function(req,res)
    {
        var page_num = parseInt(req.params.page);
        if(isNaN(page_num))
        {
            res.send({status:'invalid_page'});
            return;
        }
        AD.find({type_region:config.ad_region[req.params.region], type_display:config.ad_display[req.params.display]})
            .select('title is_active priority pic_url time_start time_end')
            .sort({time_start:1})
            .skip((page_num - 1) * config.entries_per_page).limit(config.entries_per_page)
            .exec(function(err, ads)
            {
                if(err)
                {
                    res.send({status:'err',message:err});
                    return;
                }
                res.send({status:'success',ads:ads});
            });
    });

    api.get('/ad_detail/:id',function(req,res)
    {
        AD.findById(req.params.id,function(err,ad)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            if(ad)
            {
                res.send({status:'success',ad:ad});
            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });

    api.post('/add_ad',function(req,res)
    {
        var ad = new AD();

        ad.title = req.body.title;
        ad.category = req.body.category;
        ad.type_display = config.ad_display[req.body.type_display];
        ad.type_region = config.ad_region[req.body.type_region];
        if(req.body.region_prov)
        {
            ad.region_prov = req.body.region_prov;
        }
        if(req.body.region_city)
        {
            ad.region_city = req.body.region_city;
        }
        if(req.body.priority)
        {
            ad.priority = req.body.priority;
        }
        if(req.body.is_active)
        {
            ad.is_active = req.body.is_active;
        }
        if(req.body.desc)
        {
            ad.desc = req.body.desc;
        }
        if(req.body.time_start)
        {
            ad.time_start = new Date(req.body.time_start);
        }

        ad.time_end = new Date(req.body.time_end);

        ad.save(function(err)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            res.send({status:'success',id:ad._id});
        });

    });

    api.post('/add_ad_pic/:id',function(req,res)
    {
        AD.findById(req.params.id).select('pic_url').exec(function(err,ad)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            if(ad)
            {
                var form = new formidable.IncomingForm();
                form.uploadDir = config.file_ad_path;

                var count_upload = 0;
                var count_success = 0;
                var file_name = '';

                form.parse(req, function(err,fields,files)
                {
                    if(err)
                    {
                        res.send({status:'err',message:err});
                        return;
                    }

                    for(var index in files)
                    {
                        var file_extension = '';
                        var valid_name = false;


                        var file = files[index];
                        var file_type = file.name.split('.').pop();

                        // 检查文件类型是否合法
                        for(var e_index in config.pic_format)
                        {
                            if(file_type == config.pic_format[e_index])
                            {
                                valid_name = true;
                                file_extension = '.' + config.pic_format[e_index];
                                break;
                            }
                        }
                        // 若文件类型不合法，文件大小不合法
                        if(!valid_name || file.size > config.pic_ad_size)
                        {
                            //console.log('file format or size is illegal');
                            // 删除文件
                            fs.unlinkSync(file.path);
                            continue;
                        }

                        // 重命名文件
                        var date = new Date();
                        var str_random = date.getFullYear().toString() + (date.getMonth() + 1).toString()
                            + date.getDate().toString() + (Math.floor(Math.random() * 10000)).toString() ;
                        var file_name = 'ad_' + ad._id.toString() + str_random + file_extension;
                        var file_location = config.file_ad_rename_path + file_name;
                        //console.log(file.path);
                        //console.log(file_location);

                        fs.renameSync(file.path, 'views/' +  file_location);
                        file_name = file_location;
                        count_success += 1;

                        break;
                    }
                    
                    // 将文件上传至百度BOS

                    // 信息存入数据库
                    ad.pic_url = file_name
                    ad.markModified('pic_url');

                    ad.save(function(err)
                    {
                        if(err)
                        {
                            res.send({status:'err',message:err});
                            return;
                        }
                        //console.log('saving success');
                        res.send(
                            {
                                status:'success',
                                pic_url:ad.pic_url
                            }
                        );
                    });

                });


            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });

    api.get('/remove_ad/:id',function(req,res)
    {
        AD.findById(req.params.id).exec(function(err,ad)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            if(ad)
            {
                // TODO: 删除所属图片
                if(ad.pic_url != '')
                {
                    fs.unlinkSync('views/' + ad.pic_url);
                }
                AD.remove({_id:req.params.id},function(err)
                {
                    if(err)
                    {
                        res.send({status:'err',message:err});
                        return;
                    }
                    res.send({status:'success',message:'AD removed'});
                });
            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });

    api.get('/user_status/:id',function(req,res)
    {});

    api.get('/freeze_user/:id',function(req,res)
    {});

    api.get('/unfreeze_user/:id',function(req,res)
    {});

    api.get('/entry_status/:id',function(req,res)
    {});

    api.get('/edit_entry/:id',function(req,res)
    {});

    api.get('/delete_entry/:id',function(req,res)
    {});

    api.get('/delete_entry_pic/:url',function(req,res)
    {});

    api.get('/delete_entry_pic_all',function(req,res)
    {});

    return api;
};