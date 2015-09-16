/**
 * Created by Haoran on 2015/8/17.
 * 用户在做关键操作时，系统会记录的信息。
 * 关键操作有：注册，登录，验证，发帖删帖等。
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLog = new Schema(
    {
        target: {type: Schema.Types.ObjectId, ref:'User'},
        action:{type:String, default:''},
        ip:{type:String, default:''},
        time:{type:Date, default:Date.now()}
    }
);

module.exports = mongoose.model('UserLog', UserLog);
