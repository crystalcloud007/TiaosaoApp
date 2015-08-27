/**
 * Created by Haoran on 2015/8/26.
 */
angular.module('ConfigService',[])
    .factory('Config', function()
    {
        var config = {};
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
            'captcha_blank':'请输入在图片中看到的验证码。',
            'captcha_invalid':'验证码错误。',
            'captcha_ok':'验证码正确'
        };
        return config;
    });