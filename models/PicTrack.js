/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicTrack = new Schema(
    {
        creator:{type:Schema.Types.ObjectId,ref:'User',required:true},      // �ϴ���ID
        type_ref:{type:String, required:true},                              // ��ͷ������ͼƬ���ǹ��ͼƬ
        id_ref:{type:String,required:true},                                 // ��Ӧ���û������ӻ����ID
        file_name:{type: String, required: true},                           // ��Ӧ���ļ���
        time_creation: {type: Date, default:Date.now}
        //status:{type: String, required: true}
    }
);


module.exports = mongoose.model('PicTrack', PicTrack);