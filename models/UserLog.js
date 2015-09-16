/**
 * Created by Haoran on 2015/8/17.
 * �û������ؼ�����ʱ��ϵͳ���¼����Ϣ��
 * �ؼ������У�ע�ᣬ��¼����֤������ɾ���ȡ�
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
