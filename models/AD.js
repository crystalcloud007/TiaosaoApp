/**
 * Created by Haoran on 2015/8/19.
 * �������ģ��
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ADSchema = new Schema(
    {
        title:{type:String,required:true},
        category:{type:String, default:''},                 // ҵ������ -- �ַ����飬�ÿո�������Ա�������ʽ��ѯ��
        type_display:{type:String, required:true},          // ���ŷ�ʽ���������ҳ��ʲô��
        type_region:{type:String ,required:true},           // �������ͣ�ȫ����ĳʡ����ĳ��
        region_prov:{type:String, default:''},              // ʡ����
        region_city:{type:String, default:''},              // ������
        priority:{type:Number,default:0},                   // ��ʾ���ȼ��������ã�ȫ������ʡ��ʡ�����С�
        pic_url:{type:String, default:''},
        is_active:{type:Boolean, default:false},            // �Ƿ���Ч������Ч�Ĳ�����ʾ��
        desc:{type:String,default:''},                      // �����������������Ϣ
        time_start:{type:Date, default:Date.now()},         // ���ſ�ʼ����
        time_end:{type:Date, default:Date.now()}            // ���Ž�������
    }
);

module.exports = mongoose.model('AD', ADSchema);