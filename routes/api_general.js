/**
 * Created by Haoran on 2015/8/21.
 */
var entry_config = require('../configs/config_entry');
var config = require('../configs/config');
var http = require('http');
var UserLog = require('../models/UserLog');

function GetInfoByIP(ip, cb)
{
    var info_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
    var url = info_server + ip;
    //console.log(url);
    http.get(url, function(res)
    {
        var code = res.statusCode;
        if(code == 200)
        {
            res.on('data', function(data)
            {
                cb(null, JSON.parse(data));
            });
        }
        else
        {
            cb({code:code});
        }
    }).on('error', function(e)
    {
        cb(e);
    });
}

module.exports = function(app, express)
{
    var api = express.Router();

    api.get('/category/:city', function(req,res)
    {
        res.send({status:'success', category:entry_config.entry_category[req.params.city]});
    });

    // 现在无法验证-- 将req的ip值[::ffff:xxx.xxx.xxx.xxx]截断，并取数组中最后一个值，上传至地点检测url。
    // 如果查找出错，status返回错误信息，地点返回北京
    api.get('/ip_to_addr', function(req,res)
    {
        var s_list = req.ip.split(':');
        var s_address = s_list.pop();
        // 用来测试的IP地址，真实应用情况下应该换掉。
        //var s_add_test = '222.69.215.255';
        //console.log(s_address);
        GetInfoByIP(s_address, function(err, data)
        {
            if(err)
            {
                res.send({status:'err',index_city:'bj',name_city:config.location_index['bj'].chn});
                return;
            }
            if(data.city)
            {
                var found_city = false;
                var index_city = '';
                var name_city = '';

                for(var index in config.location_index)
                {
                    if(data.city == config.location_index[index].chn)
                    {
                        index_city = config.location_index[index].index_city;
                        name_city = data.city;
                        found_city = true;
                        break;
                    }
                }
                if(found_city)
                {
                    res.send({status:'success',index_city:index_city,name_city:name_city});
                }
                else
                {
                    res.send({status:'city_not_exist',index_city:'bj',name_city:config.location_index['bj'].chn});
                }
            }
            else
            {
                res.send({status:'city_not_found_bad_ip',index_city:'bj',name_city:config.location_index['bj'].chn})
            }
            //res.send({status:'success', data: data});
        });
    });

    // 拉取地区区县信息
    api.get('/get_districts/:city', function(req,res)
    {
        //console.log(config.location_index[req.params.city].districts);
        res.send(
            {
                status:'success',
                districts: config.location_index[req.params.city].districts ,
                index_city:config.location_index[req.params.city].index_city,
                city_name: config.location_index[req.params.city].chn,
                prov_name: config.location_index[req.params.city].prov
            });
    });

    // 拉取地区除区县信息外其他信息
    api.get('/get_geo_info/:city', function(req,res)
    {
        // 如果当前城市不存在或者为xxx，则返回北京的信息。
        if(!config.location_index[req.params.city] || req.params.city === undefined)
        {
            console.log('city not exist');
            res.send(
                {
                    status:'not_found',
                    index_city:'bj',
                    index_prov:'bj',
                    city_name: config.location_index['bj'].chn,
                    prov_name: config.location_index['bj'].prov
                });
            return;
        }
        //console.log(config.location_index[req.params.city].districts);
        res.send(
            {
                status:'success',
                index_city:config.location_index[req.params.city].index_city,
                index_prov:config.location_index[req.params.city].index_prov,
                city_name: config.location_index[req.params.city].chn,
                prov_name: config.location_index[req.params.city].prov
            });
    });

    // 遍历省返回城市信息
    api.get('/locations_from_prov',function(req,res)
    {
        res.send({status:'success',locations:config.province_index});
    });

    // 删除无用的USER LOG
    api.get('/remove_user_log',function(req,res)
    {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var actions =
            [
                config.user_action.e_create,config.user_action.e_edit,config.user_action.e_delete,
                config.user_action.profile_modify,config.user_action.req_verify_email,config.user_action.req_verify_phone,
                config.user_action.login_err_pass,config.user_action.pass_modify,config.user_action.photo_modify
            ];

        UserLog.remove({action:{'$in':actions}, time:{'$lte': today}}).exec(function(err)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            res.send({status:'success'});
        });
    });

    return api;
};