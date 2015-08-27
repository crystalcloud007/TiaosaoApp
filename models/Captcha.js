/**
 * Created by Haoran on 2015/8/26.
 * 验证码与验证code的匹配信息库
 * 用在需要验证码的时候
 * 验证码图片可以用CCAP模块来实现，或者用C#写一个程序。
 * 将生成的验证码存放到某个数据库中，图片放入某个目录，然后将验证码和图片批量上传至服务器。
 * 需要时，就随机从里面挑一个，然后发送到客户端。验证时，只需检验某ID的条目的code是否匹配输入的信息即可。
 * 该ID最好能够加密，阻止黑客从客户端得知匹配信息。
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Captcha = new Schema(
    {
        code:{type: String, required:true, select: false},
        url:{type: String, required:true},
        valid:{type: Boolean, default:true}                     // 若valid变为false，则可以执行删除任务。
    }
);

module.exports=mongoose.model('Captcha', Captcha);