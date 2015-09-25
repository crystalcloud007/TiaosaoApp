/**
 * Created by Haoran on 2015/8/26.
 */
angular.module('ConfigService',[])
    .factory('Config', function()
    {
        var config = {};

        config.pic_size_max = 1024 * 1024 * 2;
        config.pic_file_format = ['jpg','jpeg','png','gif'];

        config.help_words=
        {
            'server_err':'服务器出错啦，请稍后再试。T_T',
            'login_err_u':'用户名不存在。',
            'login_err_p':'密码错误。',
            'login_blank_u':'请填写用户名。',
            'login_blank_p':'请填写密码。',
            'login_invalid_u':'请按照正确的邮箱地址或手机号码格式填写。',
            'login_invalid_p':'6-16位数字和英文字母，字母区分大小写。',
            'signup_check_username':'检查用户名....',
            'signup_username_already_exist':'该名称已被注册。',
            'signup_username_email_blank' : '请输入有效电子邮箱帐号。',
            'signup_username_email_invalid' : '格式有误。正确格式如accountname@site.com。',
            'signup_username_ok':'OK',
            'signup_username_phone_blank':'请输入手机号码',
            'signup_username_phone_invalid':'号码格式有误。',
            'signup_password_blank':'6-16位数字和英文字母，字母区分大小写。',
            'signup_password_too_short':'密码太短。',
            'signup_password_ok':'OK',
            'signup_password_check_blank':'请再次输入密码。',
            'signup_password_check_invalid':'两次输入不一致。',
            'signup_password_check_ok':'OK',
            'signup_post_invalid':'请将所有信息填写正确。',
            'profile_invalid_user_desc':'请填写简介描述，2000个字符以内。',
            'profile_blank_realname':'请填写真实姓名。',
            'profile_invalid_realname':'请按照正确的格式填写,如张无忌。支持3-9个汉字。',
            'profile_get_err':'出错了，请重新登录再试。',
            'profile_placeholder_realname':'请填写真实姓名。',
            'profile_placeholder_phone':'请填写手机号码。',
            'profile_placeholder_email':'请填写电子邮箱地址。',
            'profile_placeholder_desc':'请填写个人描述。',
            'profile_success_upload_profile':'信息更新成功。',
            'profile_success_change_p':'密码修改成功。',
            'profile_frozen_user':'操作失败，当前用户被冻结，请尽快咨询管理员。',
            'profile_invalid_password':'原始密码错误，修改失败。',
            'profile_active_phone_success':'手机号码验证成功！',
            'profile_active_phone_invalid':'验证码错误，请重新输入。',
            'profile_active_phone_already':'已经验证成功啦。',
            'profile_active_phone_expired':'验证码过期，请重新申请。',
            'profile_req_active_phone_success':'验证码成功发送至指定手机，请查收。',
            'profile_req_active_phone_invalid':'请先填写手机号码，再申请验证。',
            'profile_req_active_phone_already':'您已经验证过手机了。',
            'profile_req_active_phone_too_freq':'申请过于频繁，请稍后再试。',
            'profile_req_active_phone_too_many':'今日已经申请太多次啦，请明天再试。',
            'profile_req_active_email_success':'验证邮件已发送，请登录邮箱，并按提示操作。',
            'profile_req_active_email_invalid':'请先填写邮箱地址，再申请验证。',
            'profile_req_active_email_already':'邮箱已经验证成功。',
            'profile_req_active_email_too_many':'今日已经申请太多次啦，请明天再试。',
            'profile_req_active_email_too_freq':'申请过于频繁，请稍后再试。',
            'profile_code_verify_phone_invalid':'格式错误，应填写6位数字。',
            'profile_code_verify_phone_blank':'请填写发送至手机的6为验证码。',
            'profile_entry_list_delete_success':'删除成功。',
            'captcha_blank':'请输入在图片中看到的验证码。',
            'captcha_invalid':'验证码错误。',
            'captcha_ok':'验证码正确',
            'entry_upload_invalid':'信息输入有误，请重试！',
            'entry_upload_too_many':'已达到今日发帖上限，发帖失败。',
            'entry_edit_invalid_input':'输入格式有误，请改正后重试。',
            'entry_edit_not_owner':'没有修改权限。',
            'entry_pic_not_owner':'您没有对此帖子的修改权限。',
            'entry_pic_too_many':'图片数量已达到上线。',
            'entry_pic_upload_blank':'请选择正确的文件之后再上传。',
            'entry_pic_format_invalid':'仅支持jpg、jpeg、gif和png格式的图片。',
            'entry_pic_size_invalid':'图片大小不能超过2M。'
        };
        return config;
    })
    .factory('TextCheck', [function()
    {
        var check = {};

        check.matchRealName = function(text)
        {
            var returnParam = '';
            if(text == '' || text == undefined || text == null)
            {
                returnParam = 'blank';
                return returnParam;
            }
            var reg = /^(([a-zA-Z\u2000]{5,20})|([\u4E00-\u9FA5]{2,30}))$/;
            var valid = reg.test(text);
            if(valid)
            {
                returnParam = 'valid';
            }
            else
            {
                returnParam = 'invalid';
            }
            return returnParam;
        };

        check.matchUserDesc = function(text)
        {
            var reg = /[*]{0,2000}/;
            return reg.test(text);
        };

        check.matchEmail = function(text)
        {
            var returnParam = '';
            if(text == '' || text == undefined || text == null)
            {
                returnParam = 'blank';
                return returnParam;
            }
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            var valid = reg.test(text);
            if(valid)
            {
                returnParam = 'valid';
            }
            else
            {
                returnParam = 'invalid';
            }
            return returnParam;
        };

        check.matchPhone = function(text)
        {
            var returnParam = '';
            if(text == '' || text == undefined || text == null)
            {
                returnParam = 'blank';
                return returnParam;
            }
            var reg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var valid = reg.test(text);
            if(valid)
            {
                returnParam = 'valid';
            }
            else
            {
                returnParam = 'invalid';
            }
            return returnParam;
        };

        check.matchPassword = function(pass)
        {
            var returnParam = '';
            if(pass == '' || pass == undefined || pass == null)
            {
                returnParam = 'blank';
                return returnParam;
            }
            var reg = /^[a-z0-9A-Z]{6,16}$/;
            var valid = reg.test(pass);
            if(valid)
            {
                returnParam = 'valid';
            }
            else
            {
                returnParam = 'invalid';
            }
            return returnParam;
        };

        check.doubleCheckPassword = function(pass_origin, pass_check)
        {
            var returnParam = '';
            if(pass_check == '' || pass_check == undefined || pass_check == null)
            {
                returnParam = 'blank';
                return returnParam;
            }

            if(pass_origin == pass_check)
            {
                returnParam = 'valid';
            }
            else
            {
                returnParam = 'invalid';
            }
            return returnParam;
        };

        return check;
    }])
    // 负责检查和记录用户当前地理位置
    .factory('LocationChecker',['$location', '$route','$rootScope','$http', function($location, $route, $rootScope,$http)
    {
        var checker = {};

        checker.current_location = 'bj';

        checker.getLocationFromServer = function()
        {
            console.log('getting city index....');
            $http.get('/api/gen/ip_to_addr')
                .success(function(data)
                {
                    //console.log(data);
                    checker.current_location = data.index_city;

                    $rootScope.current_geo_city = checker.current_location;
                    console.log($rootScope.current_geo_city);
                    $location.path('/' + checker.current_location);
                })
                .error(function()
                {
                    checker.current_location = 'bj';

                    $rootScope.current_geo_city = checker.current_location;
                    $location.path('/' + checker.current_location);
                });
        };
        checker.getLocationFromRouteParams = function()
        {
            if($route.current.params.city == 'err')
            {
                console.log('encountering err');
                $http.get('/api/gen/ip_to_addr')
                    .success(function(data)
                    {
                        checker.current_location = data.index_city;
                        $rootScope.current_geo_city = checker.current_location;
                        $location.path('/' + checker.current_location + '/not_found');
                    })
                    .error(function()
                    {
                        checker.current_location = 'bj';
                        $rootScope.current_geo_city = checker.current_location;
                        $location.path('/' + checker.current_location + '/not_found');
                    });
            }
            else
            {
                checker.current_location = $route.current.params.city;
                $rootScope.current_geo_city = checker.current_location;
            }
            /*checker.current_location = $route.current.params.city;

            // 如果city是err，则将err换成当前city -- 只有在not_found中才会遇到
            if(checker.current_location == 'err')
            {
                // 上云之后才能发挥作用，现在只用来做测试
                checker.current_location = 'bj';

                $rootScope.current_geo_city = checker.current_location;
                $location.path('/' + checker.current_location + '/not_found');
            }
            else
            {
                $rootScope.current_geo_city = checker.current_location;
            }*/
            //console.log('RESOLVE时获取的地点是：' + $rootScope.current_geo_city);
        };
        checker.getLocation = function()
        {
            //console.log('从服务中拉取的地址是：' + checker.current_location);
            return checker.current_location;
        };

        return checker;
    }]);
