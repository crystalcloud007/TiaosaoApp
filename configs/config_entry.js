/**
 * Created by Haoran on 2015/8/21.
 */

module.exports =
{
    // 业务类型与分类
    entry_category:
    {
        'bj':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    //'s_hand_mobile_phone_new':{eng:'s_hand_mobile_new',chn:'全新手机'},
                    //'s_hand_laptop':{eng:'s_hand_laptop',chn:'笔记本电脑'},
                    //'s_hand_pad':{eng:'s_hand_pad',chn:'平板电脑'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    //'s_hand_pc':{eng:'s_hand_pc',chn:'台式机或配件'},
                    //'s_hand_phone_num':{eng:'s_hand_phone_num',chn:'手机号码'},
                    //'s_hand_comm_service':{eng:'s_hand_comm_service',chn:'通讯服务'},
                    //'s_hand_e_appliance':{eng:'s_hand_e_appliance',chn:'二手家电'},
                    //'s_hand_furniture':{eng:'s_hand_furniture',chn:'二手家具'},
                    //'s_hand_furniture_sub':{eng:'s_hand_furniture_sub',chn:'家居及日用品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    //'s_hand_office_supply':{eng:'s_hand_office_supply',chn:'办公用品及设备'},
                    //'s_hand_mother_child':{eng:'s_hand_mother_child', chn:'母婴及儿童用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    //'s_hand_makeup_health':{eng:'s_hand_makeup_health', chn:'美容保健'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    //'s_hand_art_collection':{eng:'s_hand_art_collection',chn:'文玩、艺术收藏'},
                    //'s_hand_publication':{eng:'s_hand_publication',chn:'图书、音像、软件'},
                    //'s_hand_online_game':{eng:'s_hand_online_game', chn:'网游及虚拟物品'},
                    //'s_hand_device':{eng:'s_hand_device', chn:'二手设备'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    //'s_hand_adult':{eng:'s_hand_adult',chn:'成人用品'},
                    //'s_hand_exchange':{eng:'s_hand_exchange', chn:'物品交换'},
                    //'s_hand_idea_service': {eng:'s_hand_idea_service', chn:'创意、服务交易'},
                    //'s_hand_cheap_goods':{eng:'s_hand_cheap_goods',chn:'5元以下物品'},
                    //'s_hand_free_gift':{eng:'s_hand_free_gift', chn:'免费赠送'},
                    //'s_hand_campus': {eng:'s_hand_campus', chn:'校园二手'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    //'realestate_rent_r_whole':{eng:'realestate_rent_r_whole', chn:'整租房'},
                    //'realestate_rent_r_room':{eng:'realestate_rent_r_room', chn:'合租房'},
                    //'realestate_rent_r_bed':{eng:'realestate_rent_r_bed', chn:'出租床位'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    //'vehicle_share_l_provide': {eng:'vehicle_share_l_provide', chn:'提供长途拼车'},
                    //'vehicle_share_l_want': {eng:'vehicle_share_l_want', chn:'需要长途拼车'},
                    //'vehicle_share_s_provide': {eng:'vehicle_share_s_provide', chn:'提供上下班拼车'},
                    //'vehicle_share_s_want': {eng:'vehicle_share_s_want', chn:'需要上下班拼车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    //'vehicle_rent': {eng:'vehicle_rent', chn:'租车'},
                    //'vehicle_t_school': {eng:'vehicle_t_school', chn:'驾校'},
                    //'vehicle_tutor_coach': {eng:'vehicle_tutor_coach', chn:'驾车教练'},
                    //'vehicle_driver': {eng:'vehicle_driver', chn:'代驾'},
                    //'vehicle_tutor_p_coach': {eng:'vehicle_tutor_p_coach', chn:'陪练'},
                    //'vehicle_leading': {eng:'vehicle_leading', chn:'带车司机'},
                    //'vehicle_transfer_service': {eng:'vehicle_transfer_service', chn:'过户、验车'},
                    //'vehicle_4s': {eng:'vehicle_4s', chn:'4S店'},
                    //'vehicle_decoration': {eng:'vehicle_decoration', chn:'汽车美容装饰'},
                    //'vehicle_mainte': {eng:'vehicle_mainte', chn:'维修保养'},
                    //'vehicle_modif': {eng:'vehicle_modif', chn:'改装防护'}
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                    //'service_other':{eng:'service_other',chn:'其他服务'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
        'sh':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
        'cq':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
        'tj':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
        'gz':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
        'sz':
        {
            'secondhand':
            {
                eng:'secondhand',
                chn:'二手市场',
                subs:
                {
                    's_hand_mobile':{eng:'s_hand_mobile', chn:'二手手机'},
                    's_hand_digital':{eng:'s_hand_digital',chn:'数码产品'},
                    's_hand_home_supply':{eng:'s_hand_home_supply',chn:'家电、家具、家居及母婴用品'},
                    's_hand_clothing':{eng:'s_hand_clothing',chn:'服装、穿戴、箱包、配饰'},
                    's_hand_instrument':{eng:'s_hand_instrument',chn:'书籍、文教、运动、乐器'},
                    's_hand_other':{eng:'s_hand_other',chn:'其他类型物品'},
                    's_hand_want':{eng:'s_hand_want', chn:'求购'}
                }
            },
            'real_estate':
            {
                eng:'real_estate',
                chn:'房产',
                subs:
                {
                    'realestate_rent_r':{eng:'realestate_rent_r',chn:'出租住房'},
                    'realestate_want_r':{eng:'realestate_want_r', chn:'求租住房'},
                    'realestate_rent_d':{eng:'realestate_rent_d', chn:'出租日租房'},
                    'realestate_want_d':{eng:'realestate_want_d', chn:'求租日租房'},
                    'realestate_buy_r':{eng:'realestate_buy_r', chn:'求购二手房'},
                    'realestate_sell_r':{eng:'realestate_sell_r',chn:'出售二手房'},
                    'realestate_rent_o':{eng:'realestate_rent_o', chn:'出租写字楼'},
                    'realestate_want_o':{eng:'realestate_want_o', chn:'求租写字楼'},
                    'realestate_sell_o':{eng:'realestate_sell_o', chn:'出售写字楼'},
                    'realestate_buy_o':{eng:'realestate_buy_o',chn:'求购写字楼'},
                    'realestate_rent_s':{eng:'realestate_rent_s', chn:'出租商铺'},
                    'realestate_sell_s':{eng:'realestate_sell_s', chn:'出售商铺'},
                    'realestate_want_s':{eng:'realestate_want_s',chn:'求租商铺'},
                    'realestate_buy_s':{eng:'realestate_buy_s', chn:'求购商铺'},
                    'realestate_transfer_s':{eng:'realestate_transfer_s', chn:'转让商铺'},
                    'realestate_rent_other':{eng:'realestate_rent_other', chn:'出租厂房、仓库、其他'},
                    'realestate_want_other':{eng:'realestate_want_other', chn:'求租厂房、仓库、其他'},
                    'realestate_transfer_other':{eng:'realestate_transfer_other', chn:'转让厂房、仓库、其他'},
                    'realestate_buy_other':{eng:'realestate_buy_other', chn:'求购厂房、仓库、其他'},
                    'realestate_sell_other':{eng:'realestate_sell_other', chn:'出售厂房、仓库、其他'}
                }
            },
            'vehicle':
            {
                eng:'vehicle',
                chn:'车辆交易及服务',
                subs:
                {
                    'vehicle_sell_secondhand': {eng:'vehicle_sell_secondhand', chn:'出售二手车'},
                    'vehicle_buy_secondhand': {eng:'vehicle_buy_secondhand', chn:'求购二手车'},
                    'vehicle_sell_motor': {eng:'vehicle_sell_motor', chn:'摩托车'},
                    'vehicle_sell_bike': {eng:'vehicle_sell_bike', chn:'自行车、电动车'},
                    'vehicle_component': {eng:'vehicle_component', chn:'汽车配件'},
                    'vehicle_deco_mainte_modif': {eng:'vehicle_deco_mainte_modif', chn:'装饰、保养、改装'}
                }
            },
            'service':
            {
                eng:'service',
                chn:'本地服务',
                subs:
                {
                    'service_home':{eng:'service_home',chn:'家政服务'},
                    'service_construct':{eng:'service_construct',chn:'装修建材'},
                    'service_tutor':{eng:'service_tutor',chn:'教育培训'},
                    'service_business':{eng:'service_business',chn:'商务法务'},
                    'service_leisure':{eng:'service_leisure',chn:'休闲娱乐'}
                }
            },
            'hr':
            {
                eng:'hr',
                chn:'招聘求职',
                subs:
                {
                    'hr_offer': {eng:'hr_offer', chn:'招聘'},
                    'hr_want': {eng:'hr_want', chn:'求职'}
                }
            }
        },
    },

    // 发帖时的描述语句
    entry_help:
    {

    }
};