/**
 * Created by Haoran on 2015/8/21.
 */
var entry_config = require('../configs/config_entry');
var config = require('../configs/config');
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

    api.get('/category/:city', function(req,res)
    {
        res.send({status:'success', category:entry_config.entry_category[req.params.city]});
    });

    // �����޷���֤-- ��req��ipֵ[::ffff:xxx.xxx.xxx.xxx]�ضϣ���ȡ���������һ��ֵ���ϴ����ص���url��
    // ������ҳ���status���ش�����Ϣ���ص㷵�ر���
    api.get('/ip_to_addr', function(req,res)
    {
        var s_list = req.ip.split(':');
        var s_address = s_list.pop();
        // �������Ե�IP��ַ����ʵӦ�������Ӧ�û�����
        var s_add_test = '222.69.215.255';
        //console.log(s_address);
        GetInfoByIP(s_add_test, function(err, data)
        {
            if(err)
            {
                res.send({status:'err',index_city:'bj'});
                return;
            }
            if(data.city)
            {
                var found_city = false;
                var index_city = '';
                for(var index in config.location_index)
                {
                    if(data.city == config.location_index[index].chn)
                    {
                        index_city = config.location_index[index].index_city;
                        found_city = true;
                        break;
                    }
                }
                if(found_city)
                {
                    res.send({status:'success',index_city:index_city});
                }
                else
                {
                    res.send({status:'city_not_exist',index_city:'bj'});
                }
            }
            else
            {
                res.send({status:'city_not_found_bad_ip',index_city:'bj'})
            }
            //res.send({status:'success', data: data});
        });
    });

    // ��ȡ����������Ϣ
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

    return api;
};