/**
 * Created by Haoran on 2015/9/6.
 */
var jwt = require('jsonwebtoken');
var Entry = require('../models/Entry');
var User = require('../models/User');
var UserLog = require('../models/UserLog');
var config = require('../configs/config');
var config_entry = require('../configs/config_entry');
var secret_key = config.secret_key;

module.exports = function(app,express)
{
    var api = express.Router();



    // 返回帖子列表，req中一定要带上城市信息。
    api.get('/list/:category/:city/:page', function(req,res)
    {
        var page_num = parseInt(req.params.page);
        if(isNaN(page_num))
        {
            res.send({status:'invalid_page'});
            return;
        }

        // 提取全部类型，仅供测试使用。
        if(req.params.category == 'all')
        {
            Entry.find({region_city:config.location_index[req.params.city].chn})
                .select('category title region_city region_district region_addr desc time_last_read pic_count')
                .skip((page_num - 1) * config.entries_per_page).limit(config.entries_per_page)
                .exec(function(err, entries)
                {
                    if(err)
                    {
                        res.send({status:'err',message:err});
                        return;
                    }
                    res.send({status:'success', entries:entries});
                });
        }
        // 正常返回帖子列表 -- 有按照帖子等级排序的功能
        else
        {
            // 按照帖子等级排序，之后按照帖子时间顺序排序
            Entry.find({region_city:config.location_index[req.params.city].chn, category:req.params.category})
                .select('category title region_city region_district region_addr desc time_last_read pic_count')
                .sort({level_order: -1, time_creation: -1})
                .skip((page_num - 1) * config.entries_per_page).limit(config.entries_per_page)
                .exec(function(err, entries)
                {
                    if (err)
                    {
                        res.send({status: 'err', message: err});
                        return;
                    }
                    res.send({status: 'success', entries: entries});
                });
        }
    });

    api.get('/count/:category/:city', function(req,res)
    {
        Entry.count({category: req.params.category, region_city: config.location_index[req.params.city].chn}, function(err,count)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            var page_count = Math.ceil(count / config.entries_per_page);
            //console.log(count + ' / ' + config.entries_per_page + ' / ' + page_count);
            res.send({status:'success',count:count, page_count:page_count});
        });
    });

    // 返回单个帖子详细内容，以帖子id作为判断，只返回用户关心的信息。
    api.get('/detail/:id', function(req,res)
    {
        Entry.findById(req.params.id)
            .select('category category_chn title index_city region_district region_addr contact_n contact_p desc pic_links content count_read')
            .exec(function(err,entry)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            if(entry)
            {
                entry.count_read += 1;
                entry.time_last_read = Date.now();
                entry.markModified('time_last_read');
                entry.save(function(err)
                {
                    if(err)
                    {
                        res.send({status:'err', message:err});
                        return;
                    }
                    res.send({status:'success', entry:entry});
                });

            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });

    // 屏障啊屏障
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
                req.decoded = decoded;
                next();
            });
        }
        else
        {
            res.status(403).send({status:'no_token'});
        }
    });

    // 创建新帖子
    api.post('/new', function(req,res)
    {
        User.findById(req.decoded.id).select('entry_per_day').exec(function(err,user)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            if(user)
            {
                // 检查当前用户是否还能发帖子
                // 初始化当日日期，设置为当日0点整
                var today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);
                UserLog.count({target:req.decoded.id, action:config.user_action.e_create, time:{'$gte': today}}, function(err,count)
                {
                    if(err)
                    {
                        res.send({status:'err',message:err});
                        return;
                    }
                    if(count < user.entry_per_day)
                    {
                        // 检查上传内容是否合法
                        if(!req.body.category || !req.body.category_chn || !req.body.title || !req.body.contact_n || !req.body.contact_p || !req.body.region_prov
                            || !req.body.region_city || !req.body.region_district || !req.body.region_addr || !req.body.desc || !req.body.content || !req.body.index_city)
                        {
                            res.send({status:'invalid_input',message:'must input all information'});
                            return;
                        }

                        // 检查标题等输入信息是否合法
                        if(!config.checkEntryTitle(req.body.title) || !config.checkEntryAddr(req.body.region_addr) || !config.checkEntryCategory(req.body.category)
                            || !config.checkEntryContent(req.body.content) || !config.checkEntryRegion(req.body.region_prov) || !config.checkEntryRegion(req.body.region_city)
                            || !config.checkEntryRegion(req.body.region_district) || !config.checkPhone(req.body.contact_p) || !config.checkRealName(req.body.contact_n)
                            || !config.checkEntryCategory_chn(req.body.category_chn) || !config.checkEntryIndexCity(req.body.index_city))
                        {
                            res.send({status:'invalid_input'});
                            return;
                        }

                        var entry = new Entry(
                            {
                                creator: req.decoded.id,
                                category: req.body.category,
                                category_chn: req.body.category_chn,
                                title: req.body.title,
                                index_city: req.body.index_city,
                                region_prov: req.body.region_prov,
                                region_city: req.body.region_city,
                                region_district: req.body.region_district,
                                region_addr: req.body.region_addr,
                                contact_n:req.body.contact_n,
                                contact_p:req.body.contact_p,
                                content:req.body.content,
                                desc:req.body.desc
                            }
                        );

                        entry.save(function(err)
                        {
                            if(err)
                            {
                                res.send({status:'err',message:err});
                                return;
                            }
                            UserLog.create({target:req.decoded.id, action:config.user_action.e_create, ip:req.ip});
                            res.send({status:'success',id:entry._id});
                        });
                    }
                    else
                    {
                        res.send({status:'too_many'});
                    }
                });
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 插入图片 -- 建设中
    api.post('/pic_add', function(req,res)
    {
        res.send('developing now');
    });

    // 删除图片 -- 建设中
    api.get('/pic_delete', function(req,res)
    {
        res.send('developing now');
    });

    // 返回用户自我创建帖子的总数
    api.get('/count_self',function(req,res)
    {
        Entry.count({creator:req.decoded.id}, function(err,count)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            var page_count = Math.ceil(count / config.entries_per_page);
            res.send({status:'success',count:count, page_count:page_count});
        });
    });
    // 返回用户自己创建的帖子的列表
    api.get('/list_self/:page',function(req,res)
    {
        var page_num = parseInt(req.params.page);
        if(isNaN(page_num))
        {
            res.send({status:'invalid_page'});
            return;
        }
        Entry.find({creator: req.decoded.id})
            .select('title category_chn region_city')
            .sort({time_creation: -1})
            .skip((page_num - 1) * config.entries_per_page).limit(config.entries_per_page)
            .exec(function(err,entries)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            res.send({status:'success',entries:entries});
        });
    });

    // 修改帖子
    api.post('/edit/:id',function(req,res)
    {
        Entry.findById(req.params.id, function(err,entry)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            if(entry)
            {
                // 判断所有权
                if(entry.creator != req.decoded.id)
                {
                    res.send({status:'not_owner'});
                    return;
                }
                // 是否有title
                if(req.body.title)
                {
                    if(!config.checkEntryTitle(req.body.title))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.title = req.body.title;
                }
                // 是否有district
                if(req.body.region_district)
                {
                    if(!config.checkEntryRegion(req.body.region_district))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.region_district = req.body.region_district;
                }
                // 是否有地址
                if(req.body.region_addr)
                {
                    if(!config.checkEntryAddr(req.body.region_addr))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.region_addr = req.body.region_addr;
                }
                // 是否有联系人
                if(req.body.contact_n)
                {
                    if(!config.checkRealName(req.body.contact_n))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.contact_n = req.body.contact_n;
                }
                // 是否有联系人电话
                if(req.body.contact_p)
                {
                    if(!config.checkPhone(req.body.contact_p))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.contact_p = req.body.contact_p;
                }
                // 是否有content
                if(req.body.content)
                {
                    if(!config.checkEntryContent(req.body.content))
                    {
                        res.send({status:'invalid_input'});
                        return;
                    }
                    entry.content = req.body.content;
                }
                // 是否有描述信息desc
                if(req.body.desc)
                {
                    // TODO:需加入检查是否合法的程序块

                    entry.desc = req.body.desc;
                }

                entry.save(function(err)
                {
                    if(err)
                    {
                        res.send({status:'err', message:err});
                        return;
                    }
                    UserLog.create({target:req.decoded.id, action:config.user_action.e_edit, ip:req.ip});
                    res.send({status:'success'});
                });
            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });

    // 删除帖子
    api.get('/delete/:id', function(req,res)
    {
        Entry.findById(req.params.id, function(err,entry)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            if(entry)
            {
                // 判断所有权
                if(entry.creator != req.decoded.id)
                {
                    res.send({status:'not_owner'});
                    return;
                }
                Entry.remove({_id:req.params.id}, function(err)
                {
                    if(err)
                    {
                        res.send({status:'err', message:err});
                        return;
                    }
                    UserLog.create({target:req.decoded.id, action:config.user_action.e_delete, ip:req.ip});
                    res.send({status:'success'});
                });
            }
            else
            {
                res.send({status:'not_found'});
            }
        });
    });




    return api;
};