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

    // 返回数据条目数
    entries_per_page : 50,

    // 文件
    file_upload_path: './public/tmp/',
    file_store_path: './public/upload/',
    file_trash_path: './public/trash/',
    file_admin_path: './admin/',
    file_admin_trash_path: './admin/trash/',
    pic_upload_size: 2 * 1024 * 1024,

    pic_status:{'uploaded':'uploaded','archived':'archived','deleted':'deleted'},

    // 有关等级
    //level_user: {'fake': 0,'common': 1, 'vip':2, 'admin': 1000},
    level_user:
    {
        'just_register': 5,
        'verified_phone': 5,
        'verified_email': 5,
        'verified_real_name': 15,           // 非VIP但认证了的用户，最高每天30个帖子。
        'VIP': 30                           // 加VIP，每天再次增加30个帖子。
    },
    level_entry: {'common': 0, 'vip': 1, 'long': 2},
    pic_count_max:
    {
        'just_register': 1,
        'verify_phone': 2,
        'verify_email': 2,
        'verify_real_name': 5               // 每个帖子最多10张图片。
    },
    entry_lifespan: {'common': 7, 'vip': 15, long:'30'},

    // 验证相关
    // 认证码字符
    verify_code_container : ['0','1','2','3','4','5','6','7','8','9'],
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
        'e_modify':'modified an entry',
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

    // 地点索引和数据库地点项目转换
    // 目前只有北上广深天五个城市
    location_index:
    {
        'bj': {eng: 'Beijing',chn: '北京'},
        'tj': {eng: 'Tianjin',chn: '天津'},
        'sh': {eng: 'Shanghai', chn: '上海'},
        'gz': {eng: 'Guangzhou', chn: '广州'},
        'sz': {eng: 'Shenzhen', chn: '深圳'},
    }
};