/**
 * Created by Haoran on 2015/8/17.
 */

var User = require('../models/User');
var mailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var UserLog = require('../models/UserLog');
var config = require('../configs/config');
var VerifyInfo = require('../models/VerifyInfo');
var secret_key = config.secret_key;
var active_key = config.user_active_key;

// 设置token，强制规定每周过期。
function CreateToken(user)
{
    var token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        secret_key,
        {
            expiresInMinutes : 10080
        }
    );

    return token;
}

function CreateActiveToken(user)
{
    var token = jwt.sign(
        {
            id: user._id
        }
        ,
        active_key,
        {
            expiresInMinutes:360
        }
    );
    return token;
}

// 发送验证email的token，一小时后失效。
function CreateVerifyEmailToken(id, email)
{
    var token = jwt.sign(
        {
            id: id,
            email: email
        },
        active_key,
        {
            expiresInMinutes: 60
        }
    );

    return token;
}


module.exports = function(app, express)
{
    var api = express.Router();

    // 通过正式接口注册的用户，等级初始化为普通级别。
    // 现缺少验证码模块
    api.post('/signup', function(req,res)
    {
        var user = new User();
        var valid = false;

        // 加入验证码环节

        // 验证格式 -- 严防黑客，只要是从正当渠道输入来的，一般都没问题。
        if(!config.checkEmail(req.body.username) && !config.checkPhone(req.body.username))
        {
            res.send({status:'invalid_input'});
            return;
        }
        if(!config.checkPassword(req.body.password))
        {
            res.send({status:'invalid_input'});
            return;
        }

        // 验证码及格式无误，开始注册环节。
        switch(req.body.s_type)
        {
            case 'email':
            {
                user.username = req.body.username;
                user.password = req.body.password;
                user.entry_per_day = config.user_entry_per_day.just_register;
                user.email = req.body.username;
                user.username_link = 'email';
                valid = true;
                break;
            }
            case 'phone':
            {
                user.username = req.body.username;
                user.password = req.body.password;
                user.entry_per_day = config.user_entry_per_day.just_register;
                user.phone = req.body.username;
                user.username_link = 'phone';
                valid = true;
                break;
            }
        }

        if(!valid)
        {
            res.send({status:'err', message:'Sign up type is not valid'});
            return;
        }
        user.save(function(err)
        {
            if(err)
            {
                // 注册失败，success返回false，在正式版本中，忽略message，直接跳转到出错页面。
                res.send({status:'err', message: err});
                return;
            }
            // 注册成功，生成token，并返回。
            var token = CreateToken(user);
            //var active_token = CreateActiveToken(user);
            UserLog.create({target:user._id, action:config.user_action.sign_up, ip:req.ip});
            res.send({status:'success', token: token});
        });
    });


    api.get('/exist/:username', function(req,res)
    {
        User.count({username: req.params.username}, function(err, count)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            res.send({status:'success', count:count});
        });
    });

    // 验证email，是以params的形式。
    api.get('/verify/email/:token', function(req,res)
    {
        jwt.verify(req.params.token, active_key, function(err, decoded)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            var id = decoded.id;
            var email = decoded.email;
            User.findById(decoded.id).select('email verify_email entry_per_day').exec(function(err, user)
            {
                if(err)
                {
                    res.send({status:'err', message:err});
                    return;
                }
                if(user)
                {
                    if(!user.verify_email)
                    {
                        VerifyInfo.findOne({target:user._id, name:user.email, action: config.verify_action.verify}, function(err,info)
                        {
                            if(err)
                            {
                                res.send({status:'err', message:err});
                                return;
                            }
                            if(info)
                            {
                                // 确定现在时间
                                var time_now = new Date();
                                var info_time = info.time;
                                var diff = parseInt(time_now.getTime() - info_time.getTime()) / (1000 * 60 * 60);

                                // 验证码1小时失效
                                if(diff <= 1)
                                {
                                    user.verify_email = true;
                                    user.entry_per_day += config.user_entry_per_day.verified_email;
                                    user.save(function(err)
                                    {
                                        if(err)
                                        {
                                            res.send({status:'err', message:err});
                                            return;
                                        }
                                        // 删除相应的验证数据
                                        info.remove();
                                        // User Log记录
                                        UserLog.create({target:decoded.id, action:config.user_action.verify_email, ip: req.ip});
                                        res.send({status:'success'});
                                    });
                                }
                                else
                                {
                                    res.send({status:'expired'});
                                }
                            }
                            else
                            {
                                res.send({status:'info_not_found'});
                            }
                        });
                    }
                    else
                    {
                        res.send({status:'already_verified'});
                    }
                }
                else
                {
                    res.send({status:'user_not_found'});
                }
            });
        });
    });

    api.get('/activate/:active_token', function(req,res)
    {
        jwt.verify(req.params.active_token, active_key, function(err, decoded)
        {
            if(err)
            {
                res.send({status:'err', message:err});
                return;
            }
            var req_id = decoded.id;
            //console.log('Activate ID: ' + req_id);
            User.findById(req_id, function(err, user)
            {
                if(err)
                {
                    res.send({status:'err', message:err});
                    return;
                }
                if(user.active)
                {
                    res.send({status:'already_activated'});
                }
                user.active = true;
                user.save(function(err)
                {
                    if(err)
                    {
                        res.send({status:'err', message:err});
                        return;
                    }
                    var token = CreateToken(user);
                    res.send({status:'success', token:token});
                });
            });
        });
    });

    api.post('/login', function(req,res)
    {
        User.findOne({username:req.body.username}).select('password').exec(function(err,user)
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

    // Middleware for user infos
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

    api.get('/activate_req', function(req,res)
    {
        User.findById(req.decoded.id, function(err, user)
        {
            if(err)
            {
                res.status(403).send({status:'auth_failed'});
                return;
            }
            if(user)
            {
                if(user.active)
                {
                    res.send({status:'already_activated'});
                    return;
                }
                var active_token = CreateActiveToken(user);
                res.send({status:'success', active_token:active_token});
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 处理验证手机号
    api.post('/verify/phone', function(req,res)
    {
        User.findById(req.decoded.id).select('phone verify_phone entry_per_day').exec(function(err, user)
        {
            if(err)
            {
                res.status(403).send({status:'auth_failed'});
                return;
            }
            if(user)
            {
                if(user.verify_phone)
                {
                    res.send({status:'already_verified'});
                    return;
                }
                VerifyInfo.findOne({target:req.decoded.id, name:user.phone, action: config.verify_action.verify}, function(err,info)
                {
                    if(err)
                    {
                        res.send({status:'err', message:err});
                        return;
                    }
                    if(info)
                    {
                        // 确定现在时间
                        var time_now = new Date();
                        var info_time = info.time;
                        var diff = parseInt(time_now.getTime() - info_time.getTime()) / (1000 * 60);

                        // 验证码10分钟失效
                        if(diff <= 10)
                        {
                            if(req.body.code == info.code)
                            {
                                user.verify_phone = true;
                                user.entry_per_day += parseInt(config.user_entry_per_day.verified_phone);
                                console.log(user.entry_per_day);
                                user.save(function(err)
                                {
                                    if(err)
                                    {
                                        res.send({status:'err', message:err});
                                        return;
                                    }
                                    // 删除相应的验证数据
                                    info.remove();
                                    // 处理User Log
                                    UserLog.create({target:req.decoded.id, action:config.user_action.verify_phone,ip:req.ip});
                                    res.send({status:'success'});
                                });
                            }
                            else
                            {
                                res.send({status:'invalid_code'});
                            }
                        }
                        else
                        {
                            res.send({status:'expired'});
                        }
                    }
                    else
                    {
                        res.send({status:'info_not_found'});
                    }
                });
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 申请验证手机号
    api.get('/req_verify/phone', function(req,res)
    {
        User.findById(req.decoded.id).select('phone verify_phone').exec(function(err,user)
        {
            if(err)
            {
                res.status(403).send({status:'auth_failed'});
                return;
            }
            if(user)
            {
                // 发送手机短信，该功能尚未实现，先用res返回消息
                if(user.verify_phone)
                {
                    res.send({status:'already_verified'});
                }
                else if(user.phone == '')
                {
                    res.send({status:'invalid_info'});
                }
                else
                {
                    // 初始化当日日期，设置为当日0点整
                    var today = new Date();
                    today.setHours(0);
                    today.setMinutes(0);
                    today.setSeconds(0);
                    today.setMilliseconds(0);
                    UserLog.count({target:req.decoded.id, action:config.user_action.req_verify_phone, time:{'$gte': today}}, function(err,count)
                    {
                        if(err)
                        {
                            res.send({status:'err', message:err});
                            return;
                        }
                        if(count < 5)
                        {
                            // 生成随机码，一共6位数字.
                            var code = '';
                            for(var i = 0; i < 6; i++)
                            {
                                // 生成0 - 9 的整数
                                var index = Math.floor(Math.random() * 10);
                                code += config.verify_code_container[index];
                            }
                            //console.log(code);
                            // 在验证码记录中添上一笔。
                            VerifyInfo.findOne({target:req.decoded.id, name:user.phone, action:config.verify_action.verify}, function(err, info)
                            {
                                if(err)
                                {
                                    res.send({status:'err', message:err});
                                    return;
                                }
                                // 如果以前有过记录
                                if(info)
                                {
                                    // 检查是否申请过于频繁
                                    var time_now = new Date();
                                    var diff = parseInt(time_now.getTime() - info.time.getTime()) / (1000 * 60);

                                    // 间隔三分钟
                                    if(diff <= 3)
                                    {
                                        res.send({status:'too_frequently'});
                                    }
                                    else
                                    {
                                        info.code = code;
                                        info.time = Date.now();
                                        info.markModified('time');
                                        info.save(function(err)
                                        {
                                            if(err)
                                            {
                                                res.send({status:'err', message:err});
                                                return;
                                            }
                                            UserLog.create({target: req.decoded.id, action:config.user_action.req_verify_phone, ip:req.ip});
                                            res.send({status:'success', code:code});
                                        });
                                    }
                                }
                                // 如果以前没有记录
                                else
                                {
                                    var n_info = new VerifyInfo(
                                        {
                                            target: req.decoded.id,
                                            name: user.phone,
                                            code: code,
                                            action: config.verify_action.verify
                                            //time: Date.now()
                                        }
                                    );
                                    n_info.save(function(err)
                                    {
                                        if(err)
                                        {
                                            res.send({status:'err', message:err});
                                            return;
                                        }
                                        UserLog.create({target: req.decoded.id, action:config.user_action.req_verify_phone, ip:req.ip});
                                        res.send({status:'success', code:code, id: n_info._id});
                                    });
                                }
                            });
                        }
                        else
                        {
                            res.send({status:'too_many_request'});
                        }
                    });
                }
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 申请验证email
    api.get('/req_verify/email', function(req,res)
    {
        User.findById(req.decoded.id).select('email verify_email').exec(function(err, user)
        {
            if(err)
            {
                res.status(403).send({status:'auth_failed'});
                return;
            }
            if(user)
            {
                // 发送电子邮件，由于现在该功能未实现，暂由发送字符串代替。
                if(user.verify_email)
                {
                    res.send({status:'already_verified'});
                }
                else if(user.email == '')
                {
                    res.send({status:'invalid_info'});
                }
                else
                {
                    // 初始化当日日期，设置为当日0点整
                    var today = new Date();
                    today.setHours(0);
                    today.setMinutes(0);
                    today.setSeconds(0);
                    today.setMilliseconds(0);

                    // 查询当日是否已经申请超过5次
                    UserLog.count({target:req.decoded.id, action:config.user_action.req_verify_email, time:{'$gte': today}}, function(err,count)
                    {
                        if(err)
                        {
                            res.send({status:'err', message:err});
                            return;
                        }
                        //console.log(count);
                        if(count < 5)
                        {
                            VerifyInfo.findOne({target:req.decoded.id, name:user.email, action:config.verify_action.verify}, function(err, info)
                            {
                                if(err)
                                {
                                    res.send({status:'err', message:err});
                                    return;
                                }

                                // 生成token
                                var token = CreateVerifyEmailToken(req.decoded.id, user.email);

                                // 如果以前有过记录
                                if(info)
                                {
                                    // 检查是否申请过于频繁
                                    var time_now = new Date();
                                    var diff = parseInt(time_now.getTime() - info.time.getTime()) / (1000 * 60);
                                    //console.log(diff);
                                    if(diff <= 1)
                                    {
                                        res.send({status:'too_frequently'});
                                    }
                                    else
                                    {
                                        info.time = Date.now();
                                        info.markModified('time');
                                        info.save(function(err)
                                        {
                                            if(err)
                                            {
                                                res.send({status:'err', message:err});
                                                return;
                                            }
                                            UserLog.create({target: req.decoded.id, action:config.user_action.req_verify_email, ip:req.ip});

                                            res.send({status:'success', token:token});
                                        });
                                    }
                                }
                                // 如果以前没有记录
                                else
                                {
                                    var n_info = new VerifyInfo(
                                        {
                                            target: req.decoded.id,
                                            name: user.email,
                                            code: 'no code',
                                            action: config.verify_action.verify
                                        }
                                    );
                                    n_info.save(function(err)
                                    {
                                        if(err)
                                        {
                                            res.send({status:'err', message:err});
                                            return;
                                        }
                                        UserLog.create({target: req.decoded.id, action:config.user_action.req_verify_email, ip:req.ip});
                                        res.send({status:'success', token:token});
                                    });
                                }
                            });
                        }
                        else
                        {
                            res.send({status:'too_many_request'});
                        }
                    });

                }
            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    api.route('/me')
        .get(function(req,res)
        {
            User.findById(req.decoded.id, function(err, user)
            {
                if(err)
                {
                    res.send({status:'err', message:err});
                    return;
                }
                if(user)
                {
                    res.send({status:'success', user:user});
                }
                else
                {
                    res.send({status:'user_not_found'});
                }
            });
        })
        .post(function(req,res)
        {
            User.findById(req.decoded.id, function(err, user)
            {
                if(err)
                {
                    res.send({status:'err', message:err});
                    return;
                }
                if(user)
                {
                    if(user.frozen)
                    {
                        res.send({status:'user_frozen'});
                        return;
                    }

                    // 此处设置限制，已经验证的了信息不能修改。作为用户名的信息（邮箱地址，手机号），不能修改。
                    //user.nickname = req.body.nickname;
                    if(!user.verified_real_name && req.body.realname)
                    {
                        if(!config.checkRealName(req.body.realname))
                        {
                            res.send({status:'invalid_input'});
                            return;
                        }
                        user.realname = req.body.realname;
                    }

                    if(!user.verify_real_name && req.body.gender)
                    {
                        if(req.body.gender == 1)
                            user.gender = '男';
                        else
                            user.gender = '女';
                    }

                    if(!user.verify_phone && user.username_link != 'phone' && req.body.phone)
                    {
                        if(!config.checkPhone(req.body.phone))
                        {
                            res.send({status:'invalid_input'});
                            return;
                        }
                        user.phone = req.body.phone;
                    }

                    if(!user.verify_email && user.username_link != 'email' && req.body.phone)
                    {
                        if(!config.checkEmail(req.body.email))
                        {
                            res.send({status:'invalid_input'});
                            return;
                        }
                        user.email = req.body.email;
                    }

                    // 这个随便修改，只要字数不超就行
                    if(req.body.desc)
                    {
                        if(!config.checkUserDesc(req.body.desc))
                        {
                            res.send({status:'invalid_input'});
                            return;
                        }
                        user.desc = req.body.desc;
                    }

                    //console.log(user);
                    user.save(function(err)
                    {
                        if(err)
                        {
                            res.send({status:'err', message:err});
                            return;
                        }

                        res.send({status:'success'});
                    });
                }
                else
                {
                    res.send({status:'user_not_found'});
                }
            });
        });

    api.post('/change_password', function(req,res)
    {
        if(!config.checkPassword(req.body.password))
        {
            res.send({status:'invalid_password'});
            return;
        }
        User.findById(req.decoded.id).select('password').exec(function(err, user)
        {
            if(err)
            {
                res.send({status:'err', message: err});
                return;
            }
            if(user)
            {
                var valid = user.comparePassword(req.body.oldPassword);
                if(valid)
                {
                    user.password = req.body.password;
                    user.save(function(err)
                    {
                        if(err)
                        {
                            res.send({status:'err', message: err});
                            return;
                        }
                        var token = CreateToken(user);
                        res.send({status:'success', token: token});
                    });
                }
                else
                {
                    res.send({status:'invalid_password'});
                }

            }
            else
            {
                res.send({status:'user_not_found'});
            }
        });
    });

    // 上传图片
    api.post('/pic', function(req,res)
    {
        res.send({status:'function_not_avaliable'});
    });

    return api;
};