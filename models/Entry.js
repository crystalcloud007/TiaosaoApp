/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema(
    {
        creator: {type: Schema.Types.ObjectId, ref:'User'},             // 创建者ID索引
        category: {type: String, required: true},                       // 类别，查找的主键
        category_chn:{type:String, required:true},                      // 中文显示的类别，主要作为显示用
        title: {type: String, required: true},
        //price: Number,
        region_prov: {type: String, required: true},
        region_city: {type: String, required: true},
        region_district: {type: String, default:''},
        region_addr: {type: String, default:''},
        index_city: {type:String,default:''},
        contact_n: {type: String, required: true},
        contact_p: {type: String, required: true},
        desc:Schema.Types.Mixed,
        pic_links: {type: [String], default:[]},
        pic_count: {type: Number, default: 0},
        content: {type: String ,default: ''},
        time_creation: {type: Date, default:Date.now},
        //time_last_edit: {type: Date, default: Date.now},
        time_last_read: {type: Date, default: Date.now},
        level_order: {type:Number, default: 0},                         // 影响排序的属性，初始都为0，其值为在帖子上花的钱数。
        count_read: {type: Number, default: 0}
    }
);

Entry.methods.verifyCreator = function(creatorID)
{
    return this.creator == creatorID;
};

module.exports = mongoose.model('Entry', Entry);