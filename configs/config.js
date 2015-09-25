/**
 * Created by Haoran on 2015/8/17.
 */

module.exports =
{
    db: 'mongodb://root:root123456@ds040948.mongolab.com:40948/ts_test',
    secret_key: 'TiaosaoAppSecretKey',
    user_active_key:'TiaosaoAppUserActiveKey',
    captcha_key:'TiaosaoAppCaptchaKey',
    port: process.env.PORT || 3000,

    // 正则验证模块
    checkEmail: function(s_email)
    {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var valid = reg.test(s_email);
        //console.log('email: ' + valid);
        return valid;
    },

    checkPhone : function(s_phone)
    {
        var reg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        var valid = reg.test(s_phone);
        //console.log('Phone: ' + valid);
        return valid;
    },

    checkPassword : function(s_pass)
    {
        var reg = /^[a-zA-Z0-9]{6,16}$/;
        var valid = reg.test(s_pass);
        //console.log('Password: ' + valid);
        return valid;
    },

    checkUserDesc: function(s_desc)
    {
        var reg = /[\s\S]{0,2000}/;
        var valid = reg.test(s_desc);
        //console.log('User Desc: ' + valid);
        return valid;
    },

    checkRealName : function(s_name)
    {
        var reg = /^(([a-zA-Z\u2000]{5,20})|([\u4E00-\u9FA5]{2,30}))$/;
        var valid = reg.test(s_name);
        //console.log('Real Name: ' + valid);
        return valid;
    },

    checkEntryTitle: function(s_title)
    {
        var reg = /^[\s\S]{5,30}$/;
        var valid = reg.test(s_title);
        //console.log('Entry Title: ' + valid);
        return valid;
    },

    checkEntryContent: function(s_content)
    {
        var reg = /[\s\S]{0,2000}/;
        var valid = reg.test(s_content);
        //console.log('Entry Content: ' + valid);
        return valid;
    },

    checkEntryRegion : function(s_region)
    {
        var reg = /^[\u4E00-\u9FA5]{2,10}$/;
        var valid = reg.test(s_region);
        //console.log('Entry Region: ' + valid);
        return valid;
    },

    checkEntryIndexCity: function(s_index)
    {
        var reg = /^[a-z0-9_]{2,10}$/;
        var valid = reg.test(s_index);
        //console.log('Index City: ' + valid);
        return valid;
    },

    checkEntryAddr: function(s_addr)
    {
        var reg = /^[\s\S]{5,50}$/;
        var valid = reg.test(s_addr);
        //console.log('Entry Address: ' + valid);
        return valid;
    },

    checkEntryCategory: function(s_category)
    {
        var reg = /^[a-zA-Z_]{2,60}$/;
        var valid = reg.test(s_category);
        //console.log('Entry Category: ' + valid);
        return valid;
    },

    checkEntryCategory_chn: function(s_cate_chn)
    {
        var reg = /^[\s\S]{2,15}$/;
        var valid = reg.test(s_cate_chn);
        //console.log('Entry Category_chn: ' + valid);
        return valid;
    },




    // 返回数据条目数
    entries_per_page : 50,

    // 文件
    pic_per_entry_max:5,
    pic_entry_size: 2 * 1024 * 1024,
    pic_ad_size: 5 * 1024 * 1024,

    //file_upload_path: './public/tmp/',
    file_entry_path: './public/entry/',        // 帖子图片及相关文件上传
    file_entry_rename_path:'public/entry/',
    file_ad_path: './public/ad/',              // 广告图片及相关文件上传
    file_ad_rename_path:'public/ad/',
    //file_trash_path: './public/trash/',      // 帖子、广告图及相关文件垃圾桶
    file_admin_path: './admin/',               // 后台管理相关文件上传
    //file_admin_trash_path: './admin/trash/',
    pic_format:['jpg','jpeg','png','gif'],      // 支持的图片文件格式
    //pic_status:{'uploaded':'uploaded','archived':'archived','deleted':'deleted'},

    // 有关等级
    // 用户每天可以发的帖子是有限的，每人每天最多100个帖子。
    // 后台管理员和发帖员除外。
    // 是递增的关系，即验证了手机号之后，会增加10次发帖机会。
    user_entry_per_day:
    {
        'just_register': 5,
        'verified_phone': 10,
        'verified_email': 10,
        'verified_real_name': 25,           // 非VIP但认证了的用户，最高每天30个帖子。
        'VIP': 50,
        'entry_creator': 10000,
        'admin': 1000000
    },
    level_entry: {'common': 0, 'vip': 1, 'long': 2},
    //entry_lifespan: {'common': 7, 'vip': 15, long:'30'},

    // 验证相关
    // 认证码字符
    verify_code_container : ['0','1','2','3','4','5','6','7','8','9'],

    // 邮件验证事件间隔 -- 10分钟
    verify_email_interval : 10,

    // 认证动作
    verify_action:
    {
        verify:'to_be_verified',
        cancel:'to_be_cancelled'
    },
    // 认证类型
    verify_type:
    {
        email: 'email',
        phone: 'phone'
    },

    // 用户行为
    user_action:
    {
        'sign_up':'registered',
        'login':'login',
        'e_create':'created new entry',
        'e_edit':'edited an entry',
        'e_delete':'deleted an entry',
        'profile_modify':'modified profile',
        'req_verify_phone':'request to verify phone',
        'req_verify_email':'request to verify email',
        'verify_phone':'verified phone number',
        'verify_email':'verified email',
        'login_err_pass':'tried to login with an invalid password',
        'unfreeze':'unfreeze the account',
        'frozen':'account has been frozen',
        'pass_modify':'modified the password',
        'photo_modify':'changed the photo'
    },

    // 广告相关
    ad_display:
    {
        'banner':'banner',          // 横向窄条纹，覆盖整个宽度。
        'screen':'screen',          // 横向，以超大屏幕播放的大幅广告，覆盖整个宽度。
        'block':'block',            // 横向，高度略高，不占整个宽度。
        'sidebar':'sidebar'         // 在侧边栏的广告，篇幅很窄，且高度与之差不多相等。
    },

    ad_region:
    {
        'country':'country',
        'prov':'prov',
        'city':'city'
    },

    ad_priority:
    {
        'country': 500,
        'province':300,
        'city':0
    },

    // 地点索引和数据库地点项目转换
    // 目前只有北上广深天五个城市
    location_index:
    {
        'bj':
        {
            eng: 'Beijing',
            chn: '北京',
            prov:'北京',
            index_city:'bj',
            index_prov:'bj',
            districts:['东城区','西城区','朝阳区','海淀区','通州区','石景山区','丰台区','门头沟区','房山区','大兴区','平谷区','昌平区','顺义区','怀柔区','延庆县','密云县']
        },
        'tj':
        {
            eng: 'Tianjin',chn: '天津',prov:'天津',index_city:'tj',index_prov:'tj',
            districts:
                [
                    '和平区','南开区','河西区','河东区','河北区','红桥区','东丽区','西青区','津南区','北辰区','武清区','宝坻区','滨海新区',
                    '静海县','宁河县','蓟县'
                ]
        },
        'sh':
        {
            eng: 'Shanghai', chn: '上海',prov:'上海',index_city:'sh',index_prov:'sh',
            districts:
                [
                    '黄埔','徐汇','静安','闸北','普陀','长宁','虹口','杨浦','闵行','宝山','嘉定',
                    '浦东','金山','松江','青浦','奉贤','崇明'
                ]
        },
        //'cq': {eng: 'Chongqing', chn: '重庆',prov:'重庆',index_city:'cq',index_prov:'cq'},
        'gz':
        {
            eng: 'Guangzhou', chn: '广州',prov:'广东',index_city:'gz',index_prov:'gd',
            districts:
                [
                    '越秀','荔湾','海珠','天河','白云','黄埔','罗岗','花都','番禹','南沙',
                    '从化','增城'
                ]
        },
        'sz':
        {
            eng: 'Shenzhen', chn: '深圳',prov:'广东',index_city:'sz',index_prov:'gd',
            districts:
                [
                    '福田','罗湖','南山','盐田','宝安','龙岗'
                ]
        }
    },

    province_index:
    {
        'bj':
        {
            eng:'Beijing',
            index:'bj',
            chn:'北京',
            cities:
            {
                'bj':{index:'bj',chn:'北京'}
            }
        },
        'tj':
        {
            index:'tj',
            eng:'Tianjin',
            chn:'天津',
            cities:
            {
                'tj':{index:'tj',chn:'天津'}
            }
        },
        'sh':
        {
            index:'sh',
            eng:'Shanghai',
            chn:'上海',
            cities:
            {
                'sh':{index:'sh',chn:'上海'}
            }
        },
        /*'cq':
        {
            index:'cq',
            eng:'Chongqing',
            chn:'重庆',
            cities:
            {
                'cq':{index:'cq',chn:'重庆'}
            }
        },*/
        'gd':
        {
            index:'gd',
            eng:'Guangdong',
            chn:'广东',
            cities:
            {
                'gz':{index:'gz',chn:'广州'},
                'sz':{index:'sz',chn:'深圳'}
            }
        }
    }
};