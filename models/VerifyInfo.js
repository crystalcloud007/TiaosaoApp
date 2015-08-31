/**
 * Created by Haoran on 2015/8/30.
 * ����������ַ���Ա������û�������֤������֤Ψһ�ԡ��������Ϊ
 * �û�������Ҫ��֤Ψһ�ԡ����ܶ��û����Զ�ʹ��һ���ֻ��Ž�����֤��
 * ���õ���ð�õ����⣬˭ð��˭��ù��
 * Ŀǰֻ������֤�ֻ���
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VerifyInfo = new Schema(
    {
        target: {type: Schema.Types.ObjectId, ref:'User'},  // ������֤���û�ID
        name: {type: String, default:''},                   // ����֤���ֻ�������������ַ��
        code: {type:String, default:''},                    // ��¼���ɵ���֤�롣
        //processed: {type: Boolean, default: false},         // ��¼����Ϣ�Ƿ񱻴�����ˣ�����ز����١�ȡ����֤֮����Ϊfalse��
        action: String,                                     // ��������Ҫ��֤����ȡ����֤��
        time: {type:Date, default: Date.now()}              // ��¼�����ʱ�䣬���ں���Ҫ�ٴ������ֻ��������Ϊ10���ӣ��ʼ�Ϊ1Сʱ��
    }
);

module.exports = mongoose.model('VerifyInfo', VerifyInfo);