/**
 * Created by Haoran on 2015/9/10.
 */
angular.module('UserCtrl',[])
    .controller('LoginAndSignUpController', ['$rootScope','$http','Config','$window',
    function($rootScope,$http,Config,$window)
    {

        var vm = this;
        vm.username_phone = '';
        vm.username_email = '';
        vm.username_login = '';
        vm.password = '';
        vm.password_check = '';
        vm.username_type = 'email';

        vm.nav_signup_email = false;
        vm.nav_signup_phone = false;
        vm.nav_login = true;
        vm.b_username_exist = true;
        vm.b_err = false;
        vm.valid_suername = false;
        vm.valid_password_check = false;

        vm.msg_err = '';
        vm.msg_username_exist = '';

        vm.closeErrBanner = function()
        {
            vm.b_err = false;
            vm.msg_err = '';
        };


        vm.navSignUpPhone = function()
        {
            vm.nav_signup_email = false;
            vm.nav_signup_phone = true;
            vm.nav_login = false;
            vm.username_type = 'phone';
            vm.username_phone = '';
            vm.password = '';
            vm.password_check = '';
            vm.b_username_exist = true;
            vm.b_err = false;
            vm.valid_suername = false;
        };

        vm.navSignUpEmail = function()
        {
            vm.nav_signup_email = true;
            vm.nav_signup_phone = false;
            vm.nav_login = false;
            vm.username_email = '';
            vm.password = '';
            vm.password_check = '';
            vm.username_type = 'email';
            vm.b_username_exist = true;
            vm.b_err = false;
            vm.valid_suername = false;
        };

        vm.navLogin = function()
        {
            vm.nav_signup_email = false;
            vm.nav_signup_phone = false;
            vm.nav_login = true;
            vm.username_login = '';
            vm.password = '';
            vm.b_err = false;
        };

        vm.uncheckPasswordCheck = function()
        {
            vm.valid_password_check = false;
        };

        vm.uncheckUsername = function()
        {
            vm.b_username_exist = true;
            vm.msg_username_exist = '';
        };

        vm.checkPasswordCheck = function()
        {
            //console.log('P: ' + vm.password + ', PC: ' + vm.password_check);
            if(vm.password_check != '' && vm.password == vm.password_check)
            {
                vm.valid_password_check = true;
            }
            else
            {
                vm.valid_password_check = false;
            }
        };

        vm.checkUsername = function()
        {
            vm.b_username_exist = true;
            vm.msg_username_exist = '检查用户名....';
            var u_name_to_check = '';
            if(vm.nav_signup_email)
            {
                u_name_to_check = vm.username_email;
            }
            else if(vm.nav_signup_phone)
            {
                u_name_to_check = vm.username_phone;
            }

            if(u_name_to_check == '')
            {
                //console.log('username is blank');
                return;
            }

            //console.log('username_check: ' + u_name_to_check);
            $http.get('/api/user/exist/' + u_name_to_check)
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status=='success')
                    {
                        vm.b_server_err = false;
                        if(data.count == 0)
                        {
                            vm.b_username_exist = false;
                            vm.valid_username = true;
                            vm.msg_username_exist = '';
                        }
                        else
                        {
                            vm.b_username_exist = true;
                            vm.valid_username = false;
                            vm.msg_username_exist = Config.help_words.signup_username_already_exist;
                        }
                    }
                    else
                    {
                        vm.b_err = false;
                        vm.b_username_exist = false;
                        vm.valid_username = false;
                        vm.msg_username_exist = Config.help_words.server_err;
                    }
                });
        };

        vm.signup = function()
        {
            if(!vm.valid_username || !vm.valid_password_check)
            {
                vm.b_err = true;
                vm.msg_err = '用户名或者再次输入的密码有问题。';
                return;
            }

            var username_upload = '';
            if(vm.username_type == 'email')
            {
                username_upload = vm.username_email;
            }
            else if(vm.username_type == 'phone')
            {
                username_upload = vm.username_phone;
            }
            else
            {
                vm.b_err = true;
                vm.msg_err = '请选择正确的用户名类型';
                return;
            }
            $http.post('/api/user/signup',{username:username_upload, password: vm.password,s_type:vm.username_type})
                .success(function(data)
                {
                    console.log(data);
                    if(data.status == 'success')
                    {
                        vm.b_err = false;
                        $window.localStorage.setItem('token', data.token);
                        // 广博用户登录的消息。
                        $rootScope.$broadcast('user_logged_in');
                    }
                    else
                    {
                        vm.b_err = true;
                        vm.msg_err = Config.help_words.server_err;
                    }
                })
                .error(function()
                {
                    vm.b_err = true;
                    vm.msg_err = Config.help_words.server_err;
                });


        };

        vm.login = function()
        {
            //console.log('username: ' + vm.username_login + ', password: ' + vm.password);
            if(vm.username_login == '' || vm.password == '')
            {
                vm.b_err = true;
                vm.msg_err = '用户名或密码不能为空';
                return;
            }
            $http.post('/api/user/login', {username: vm.username_login, password: vm.password})
                .success(function(data)
                {
                    //console.log(data);
                    switch(data.status)
                    {
                        case 'success':
                        {
                            vm.b_err = false;
                            $window.localStorage.setItem('token', data.token);
                            // 广博用户登录的消息。
                            $rootScope.$broadcast('user_logged_in');
                            break;
                        }
                        case 'invalid_password':
                        {
                            vm.b_err = true;
                            vm.msg_err = Config.help_words.login_err_p;
                            break;
                        }
                        case 'user_not_found':
                        {
                            vm.b_err = true;
                            vm.msg_err = Config.help_words.login_err_u;
                            break;
                        }
                        default :
                        {
                            vm.b_err = true;
                            vm.msg_err = Config.help_words.server_err;
                            break;
                        }
                    }
                })
                .error(function(data)
                {
                    vm.b_err = true;
                    vm.msg_err = Config.help_words.server_err;
                });
        };
    }]);