/**
 * Created by Haoran on 2015/9/24.
 */
var config = require('../configs/config');
var AD = require('../models/AD');

module.exports = function(app,express)
{
    var api = express.Router();

    // 启用进入生效期的广告
    api.get('/activate',function(req,res)
    {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        AD.where({is_active:false,time_start:{'$lte': today}}).update({is_active:true}).exec(function(err)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            res.send({status:'success'});
        });
    });

    // 关闭进入失效期的广告
    api.get('/deactivate',function(req,res)
    {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        AD.where({is_active:true,time_end:{'$gte': today}}).update({is_active:false}).exec(function(err)
        {
            if(err)
            {
                res.send({status:'err',message:err});
                return;
            }
            res.send({status:'success'});
        });
    });

    api.get('/country/:display/:amount',function(req,res)
    {
        var amount = parseInt(req.params.amount);
        if(isNaN(amount))
        {
            res.send({status:'invalid_amount'});
            return;
        }
        AD.find({is_active:true, type_region:config.ad_region.country, type_display:req.params.display})
            .select('pic_url')
            .limit(amount).exec(function(err,ads)
            {
                if(err)
                {
                    res.send({status:'err',message:err});
                    return;
                }
                res.send({status:'success',ads:ads});
            });
    });

    api.get('/prov/:name/:display/:amount',function(req,res)
    {
        var amount = parseInt(req.params.amount);
        if(isNaN(amount))
        {
            res.send({status:'invalid_amount'});
            return;
        }
        AD.find({is_active:true, type_region:config.ad_region.prov, region_prov:config.province_index[req.params.name].chn, type_display:req.params.display})
            .select('pic_url')
            .limit(amount).exec(function(err,ads)
            {
                if(err)
                {
                    res.send({status:'err',message:err});
                    return;
                }
                res.send({status:'success',ads:ads});
            });
    });

    api.get('/city/:name/:display/:amount',function(req,res)
    {
        var amount = parseInt(req.params.amount);
        if(isNaN(amount))
        {
            res.send({status:'invalid_amount'});
            return;
        }
        AD.find({is_active:true, type_region:config.ad_region.city, region_city:config.location_index[req.params.name].chn, type_display:req.params.display})
            .select('pic_url')
            .limit(amount).exec(function(err,ads)
            {
                if(err)
                {
                    res.send({status:'err',message:err});
                    return;
                }
                res.send({status:'success',ads:ads});
            });
    });

    return api;
};