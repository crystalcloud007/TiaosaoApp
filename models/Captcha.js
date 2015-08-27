/**
 * Created by Haoran on 2015/8/26.
 * ��֤������֤code��ƥ����Ϣ��
 * ������Ҫ��֤���ʱ��
 * ��֤��ͼƬ������CCAPģ����ʵ�֣�������C#дһ������
 * �����ɵ���֤���ŵ�ĳ�����ݿ��У�ͼƬ����ĳ��Ŀ¼��Ȼ����֤���ͼƬ�����ϴ�����������
 * ��Ҫʱ���������������һ����Ȼ���͵��ͻ��ˡ���֤ʱ��ֻ�����ĳID����Ŀ��code�Ƿ�ƥ���������Ϣ���ɡ�
 * ��ID����ܹ����ܣ���ֹ�ڿʹӿͻ��˵�֪ƥ����Ϣ��
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Captcha = new Schema(
    {
        code:{type: String, required:true, select: false},
        url:{type: String, required:true},
        valid:{type: Boolean, default:true}                     // ��valid��Ϊfalse�������ִ��ɾ������
    }
);

module.exports=mongoose.model('Captcha', Captcha);