/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type:String, required:true, index:{unique: true}},
        password: {type:String, required:true, select: false},
        realname: {type:String, default:''},
        pic_url: {type:String, default:''},
        phone:{type: String, default:''},
        email:{type: String, default:''},
        desc:{type:String, default:''},
        level:Number,
        credit:{type:Number, default:0},                    // 信用值，记录充值数
        username_link: String,                              // 用户名是手机号还是邮箱地址。
        verify_email: {type: Boolean, default: false},      // 是否验证了邮件
        verify_phone: {type:Boolean, default: false},       // 是否验证了手机
        verify_real_name:{type:Boolean, default: false},    // 是否进行了实名验证
        frozen: {type: Boolean, default: false},
        //posts_count_today: {type:Number, default:0},      // 发帖次数，移动到USER LOG中
        time_of_reg:{type:Date, default: Date.now()}
    }
);

// Hash密码
UserSchema.pre('save', function(next)
{
    var user = this;
    if(!this.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash)
    {
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

// 比较密码
UserSchema.methods.comparePassword = function(password)
{
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);