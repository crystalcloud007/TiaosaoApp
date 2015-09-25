/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema(
    {
        creator: {type: Schema.Types.ObjectId, ref:'User'},             // ������ID����
        category: {type: String, required: true},                       // ��𣬲��ҵ�����
        category_chn:{type:String, required:true},                      // ������ʾ�������Ҫ��Ϊ��ʾ��
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
        time_vip_start:{type: Date, default:Date.now},                  // һ����Ϊ���ѵ����ӣ���¼���ѿ�ʼ��ʱ�䣬ֻ����level_order��Ϊ0ʱ����Ч
        time_vip_end:{type: Date, default:Date.now},                    // �����ö��Ľ������ڣ�����������ڣ�level_order����������
        //time_last_edit: {type: Date, default: Date.now},
        time_last_read: {type: Date, default: Date.now},
        level_order: {type:Number, default: 0},                         // Ӱ����������ԣ���ʼ��Ϊ0����ֵΪ�������ϻ���Ǯ����
        count_read: {type: Number, default: 0}
    }
);

Entry.methods.verifyCreator = function(creatorID)
{
    return this.creator == creatorID;
};

module.exports = mongoose.model('Entry', Entry);