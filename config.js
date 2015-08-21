/**
 * Created by Haoran on 2015/8/17.
 */
module.exports =
{
    db: 'mongodb://root:root123456@ds040948.mongolab.com:40948/ts_test',
    secret_key: 'tiaosaoappsecretkey',
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
    level_user: {'fake': 0,'common': 1, 'vip':2, 'admin': 1000},
    level_entry: {'common': 0, 'vip': 1, 'long': 2},
    pic_count_max:{'common': 4, 'vip': 10},
    entry_lifespan: {'common': 7, 'vip': 15, long:'30'},

    // 用户行为
    user_action:
    {
        'reg':'register',
        'login':'login',
        'create':'created new entry',
        'modify':'modified an entry',
        'delete':'deleted an entry'
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