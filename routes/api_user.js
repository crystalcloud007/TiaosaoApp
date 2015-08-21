/**
 * Created by Haoran on 2015/8/17.
 */

var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config');
var secret_key = config.secret_key;

// ����token��ǿ�ƹ涨ÿ�ܹ��ڡ�
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

module.exports = function(app, express)
{
    var api = express.Router();

    // ͨ����ʽ�ӿ�ע����û����ȼ���ʼ��Ϊ��ͨ����
    api.post('/signup', function(req,res)
    {
        var user = new User(
            {
                username: req.body.username,
                password: req.body.password,
                level: config.level_user.common
            }
        );

        user.save(function(err)
        {
            if(err)
            {
                // ע��ʧ�ܣ�success����false������ʽ�汾�У�����message��ֱ����ת������ҳ�档
                res.send({status:'err', message: err});
                return;
            }
            // ע��ɹ�������token�������ء�
            var token = CreateToken(user);
            res.send({status:'success', token: token});
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

    // �ϴ�ͼƬ
    api.post('/pic', function(req,res)
    {
        res.send({status:'function_not_avaliable'});
    });

    return api;
};