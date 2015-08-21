/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema(
    {
        creator: {type: Schema.Types.ObjectId, ref:'User'},             // 创建者ID索引
        category_main: {type: String, required: true},                  // 业务主类别，查找的主键
        category_sub:{type: String, required: true},                    // 业务次类别，某业务下分类主键
        creator_name: String,
        title: {type: String, required: true},
        //price: Number,
        region_prov: {type: String, required: true},
        region_city: {type: String, required: true},
        region_disc: {type: String, default:''},
        region_addr: {type: String, default:''},
        contact_n: {type: String, required: true},
        contact_p: {type: String, required: true},
        desc:Schema.Types.Mixed,
        pic_links: {type: [String], default:[]},
        pic_count: {type: Number, default: 0},
        content: {type: String ,default: ''},
        //create_by_admin:{type:Boolean, default: false},                // 是不是由工作人员批量上传的
        //completed: {type: Boolean, default: false},                    // 若没有完成帖子（无论各种原因），都会标记为false，并在一定时间内删除。
        time_creation: {type: Date, default:Date.now},
        time_last_edit: {type: Date, default: Date.now},
        time_last_read: {type: Date, default: Date.now},
        //count_comments: {type: Number, default:0},
        count_read: {type: Number, default: 0},
    }
);

Entry.methods.verifyCreator = function(creatorID)
{
    return this.creator == creatorID;
}

module.exports = mongoose.model('Entry', Entry);