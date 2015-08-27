/**
 * Created by Haoran on 2015/8/21.
 */
var entry_config = require('../entry_config');
var http = require('http');

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

    api.get('/category', function(req,res)
    {
        res.send({status:'success', category:entry_config.entry_category});
    });

    // 现在无法验证
    api.get('/ip_to_addr', function(req,res)
    {
        GetInfoByIP(req.ip, function(err, data)
        {
            if(err)
            {
                res.send({status:'err'});
                return;
            }
            res.send({status:'success', data: data});
        });
    });

    return api;
};