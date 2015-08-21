/**
 * Created by Haoran on 2015/8/19.
 * �������ģ��
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ADSchema = new Schema(
    {
        category:{type:String, required:true},              // ҵ������
        type_region:{type:String ,required:true},           // �������ͣ�ȫ����ĳʡ����ĳ��
        region_prov:{type:String, default:''},              // ʡ����
        region_city:{type:String, default:''},              // ������
        //region_dist:{type:String ,default:''},
        pic_url:{type:String, default:''},
        time_start:{type:Date, default:Date.now()},         // ���ſ�ʼ����
        time_end:{type:Date, default:Date.now()}            // ���Ž�������
    }
);

module.exports = mongoose.model('AD', ADSchema);