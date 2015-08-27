/**
 * Created by Haoran on 2015/8/17.
 */

var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config');
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
            expiresInMinute : 1440
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
            expiresInMinute:360
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
        /*var user = new User(
            {
                username: req.body.username,
                password: req.body.password,
                level: config.level_user.common
            }
        );*/
        var user = new User();
        var valid = false;

        switch(req.body.s_type)
        {
            case 'email':
            {
                user.username = req.body.username;
                user.password = req.body.password;
                user.level = config.level_user.common;
                user.email = req.body.username;
                valid = true;
                break;
            }
            case 'phone':
            {
                user.username = req.body.username;
                user.password = req.body.password;
                user.level = config.level_user.common;
                user.phone = req.body.username;
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
                    res.send({status:'success', token:token});
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
        User.findById(req,decoded.id, function(err, user)
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

    api.route('/me')
        .get(function(req,res)
        {
            User.findById(req.decoded.id, function(err, user)
            {
                if(err)
                {
                    res.status(403).send({status:'err', message:err});
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
                    res.status(403).send({status:'err', message:err});
                    return;
                }
                if(user)
                {
                    user.realname = req.body.realname;
                    user.phone = req.body.phone;
                    user.email = req.body.email;
                    user.desc = req.body.desc;

                    user.save(function(err)
                    {
                        if(err)
                        {
                            res.status(403).send({status:'err', message:err});
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

    api.post('/password', function(req,res)
    {
        User.findById(req.decoded.id).select('password').exec(function(err, user)
        {
            if(err)
            {
                res.status(403).send({status:'err', message: err});
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
                            res.send({success: false, message: err});
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