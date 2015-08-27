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
        credit:{type:Number, default:5},                    // ����ֵ��ÿ�շ����ܸ���
        active:{type:Boolean, default:false},
        verified: {type: Boolean, default: false},
        frozen: {type: Boolean, default: false},
        //posts_count_today: {type:Number, default:0},      // �����������ƶ���USER LOG��
        time_of_reg:{type:Date, default: Date.now()}
    }
);

// Hash����
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

// �Ƚ�����
UserSchema.methods.comparePassword = function(password)
{
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);