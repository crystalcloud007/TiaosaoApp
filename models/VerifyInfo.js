/**
 * Created by Haoran on 2015/8/30.
 * 号码和邮箱地址可以被任意用户拿来验证，不保证唯一性。但如果作为
 * 用户名，就要保证唯一性。即很多用户可以都使用一个手机号进行验证。
 * 不用担心冒用的问题，谁冒用谁倒霉。
 * 目前只用来验证手机号
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VerifyInfo = new Schema(
    {
        target: {type: Schema.Types.ObjectId, ref:'User'},  // 发起验证的用户ID
        name: {type: String, default:''},                   // 待验证的手机号码或者邮箱地址。
        code: {type:String, default:''},                    // 记录生成的验证码。
        //processed: {type: Boolean, default: false},         // 记录该信息是否被处理过了，这个必不可少。取消验证之后，置为false。
        action: String,                                     // 动作，是要认证还是取消认证。
        time: {type:Date, default: Date.now()}              // 记录请求的时间，过期后需要再次请求。手机号码过期为10分钟，邮件为1小时。
    }
);

module.exports = mongoose.model('VerifyInfo', VerifyInfo);