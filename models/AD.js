/**
 * Created by Haoran on 2015/8/19.
 * 广告数据模版
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ADSchema = new Schema(
    {
        category:{type:String, required:true},              // 业务类型
        type_region:{type:String ,required:true},           // 区域类型：全国，某省还是某市
        region_prov:{type:String, default:''},              // 省名称
        region_city:{type:String, default:''},              // 市名称
        //region_dist:{type:String ,default:''},
        pic_url:{type:String, default:''},
        time_start:{type:Date, default:Date.now()},         // 播放开始日期
        time_end:{type:Date, default:Date.now()}            // 播放结束日期
    }
);

module.exports = mongoose.model('AD', ADSchema);