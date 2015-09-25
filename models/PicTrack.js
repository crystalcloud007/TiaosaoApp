/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicTrack = new Schema(
    {
        creator:{type:Schema.Types.ObjectId,ref:'User',required:true},      // 上传者ID
        type_ref:{type:String, required:true},                              // 是头像、帖子图片或是广告图片
        id_ref:{type:String,required:true},                                 // 对应的用户、帖子或广告的ID
        file_name:{type: String, required: true},                           // 对应的文件名
        time_creation: {type: Date, default:Date.now}
        //status:{type: String, required: true}
    }
);


module.exports = mongoose.model('PicTrack', PicTrack);