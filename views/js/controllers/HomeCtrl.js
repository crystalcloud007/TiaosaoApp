/**
 * Created by Haoran on 2015/8/21.
 */
angular.module('HomeCtrl',[])
    .controller('HomeController', function($http, $rootScope, Auth)
    {
        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on("$routeChangeStart", function()
        {
            vm.loggedIn = Auth.isLoggedIn();
            Auth.getUser()
                .then(function(data)
                {
                    vm.user = data.data.user;
                });
        });
        vm.logOut = function()
        {
            Auth.logout();
            vm.loggedIn = Auth.isLoggedIn();
        };
    })
    .controller('MainMenuController', function($http)
    {
        var vm = this;
        vm.category = {};
        vm.cateSubs = [];
        vm.mouseOverMenuMain = false;
        vm.mouseOverMenuSub = false;

        vm.mouseOverCateMain = function(name)
        {
            console.log('Mouse Over Menu: ' + name);
            for(var index in vm.category)
            {
                if(vm.category[index].eng == name)
                {
                    vm.cateSubs = vm.category[index].subs;
                    //console.log(vm.cateSubs);
                    vm.mouseOverMenuMain = true;
                    break;
                }
            }
        };

        vm.mouseOverCateSub = function()
        {
            console.log('Mouse in sub');
            vm.mouseOverMenuSub = true;
        };
        vm.mouseLeaveMenuMain = function()
        {
            console.log('Mouse leaves main');
            vm.mouseOverMenuMain = false;
        };
        vm.mouseLeaveMenuSub = function()
        {
            console.log('Mouse leaves sub');
            vm.mouseoverMenuSub = false;
        };

        vm.testAlert = function()
        {
            $window.alert('这是一个测试弹出窗口');
        };

        var getCategoryInfo = function()
        {
            $http.get('/api/gen/category')
                .success(function(data)
                {
                    if(data.status=='success')
                    {
                        vm.category = data.category;
                    }
                });
        };

        getCategoryInfo();
    })
    .controller('SignUpController', function($http, $window, $location, Config)
    {
        var vm = this;

        vm.current_block_phone = false;
        vm.current_block_email = true;
        vm.signup_type = 'email';
        vm.signup_err = false;
        vm.signup_err_msg = Config.help_words.server_err;

        vm.reset = function()
        {
            vm.username_email = '';
            vm.username_phone = '';
            vm.password = '';
            vm.password_check = '';
            //vm.captcha = '';

            vm.help_username_email = Config.help_words.signup_username_email_blank;
            vm.help_username_phone = Config.help_words.signup_username_phone_blank;
            vm.help_password = Config.help_words.signup_password_blank;
            vm.help_password_check = Config.help_words.signup_password_check_blank;
            //vm.help_captcha = Config.help_words.captcha_blank;
            vm.help_post = '';

            vm.touched_u_email = false;
            vm.touched_u_phone = false;
            vm.touched_p = false;
            vm.touched_p_check = false;
            //vm.touched_captcha = false;

            vm.valid_u_email = false;
            vm.valid_u_phone = false;
            vm.valid_p = false;
            vm.valid_p_check = false;
            //vm.valid_captcha = false;
        };

        vm.switchToEmail = function()
        {
            vm.current_block_email = true;
            vm.current_block_phone = false;
            vm.reset();
            vm.signup_type = 'email';

        };
        vm.switchToPhone = function()
        {
            vm.current_block_email = false;
            vm.current_block_phone = true;
            vm.reset();
            vm.signup_type = 'phone';
        };

        vm.touchUEmail = function()
        {vm.touched_u_email = true;};

        vm.touchUPhone = function()
        {vm.touched_u_phone = true;};

        vm.touchP = function()
        {vm.touched_p = true;};

        vm.touchPCheck = function()
        {vm.touched_p_check = true;};

        /*vm.touchedCaptcha = function()
        { vm.valid_captcha = true; };*/

        // Check all input elements with regular expression
        vm.checkUEmail = function()
        {
            if(vm.username_email == '')
            {
                vm.valid_u_email = false;
                vm.help_username_email = Config.help_words.signup_username_email_blank;
            }
            else
            {
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                var valid = reg.test(vm.username_email);
                if(valid)
                {
                    vm.valid_u_email = false;
                    vm.help_username_email = Config.help_words.signup_check_username;
                    $http.get('/api/user/exist/' + vm.username_email)
                        .success(function(data)
                        {
                            //console.log(data);
                            if(data.status=='success')
                            {
                                if(data.count == 0)
                                {
                                    vm.valid_u_email = true;
                                    vm.help_username_email = Config.help_words.signup_username_ok;
                                }
                                else
                                {
                                    vm.help_username_email = Config.help_words.signup_username_already_exist;
                                }
                            }
                            else
                            {
                                vm.help_username_email = Config.help_words.server_err;
                            }
                        });
                }
                else
                {
                    vm.valid_u_email = false;
                    vm.help_username_email = Config.help_words.signup_username_email_invalid;
                }
            }
        };
        vm.checkUPhone = function()
        {
            if(vm.username_phone == '')
            {
                vm.valid_u_phone = false;
                vm.help_username_phone = Config.help_words.signup_username_phone_blank;
            }
            else
            {
                var reg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
                var valid = reg.test(vm.username_phone);
                if(valid)
                {
                    //vm.help_username_phone = Config.help_words.signup_username_ok;
                    vm.valid_u_phone = false;
                    vm.help_username_phone = Config.help_words.signup_check_username;
                    $http.get('/api/user/exist/' + vm.username_phone)
                        .success(function(data)
                        {
                            //console.log(data);
                            if(data.status=='success')
                            {
                                if(data.count == 0)
                                {
                                    vm.valid_u_phone = true;
                                    vm.help_username_phone = Config.help_words.signup_username_ok;
                                }
                                else
                                {
                                    vm.help_username_phone = Config.help_words.signup_username_already_exist;
                                }
                            }
                            else
                            {
                                vm.help_username_phone = Config.help_words.server_err;
                            }
                        });
                }
                else
                {
                    vm.valid_u_phone = false;
                    vm.help_username_phone = Config.help_words.signup_username_phone_invalid;
                }
                //console.log(vm.help_username_phone);
            }
        };
        vm.checkPassword = function()
        {
            if(vm.password == '')
            {
                vm.valid_p = false;
                vm.help_password = Config.help_words.signup_password_blank;
            }
            else
            {
                var reg = /^[a-z0-9A-Z]{6,16}$/;
                vm.valid_p = reg.test(vm.password);
                if(!vm.valid_p)
                {
                    vm.help_password = Config.help_words.signup_password_blank;
                }
            }
        };
        vm.checkPasswordCheck = function()
        {
            if(vm.password_check == '')
            {
                vm.valid_p_check = false;
                vm.help_password_check = Config.help_words.signup_password_check_blank;
            }
            else
            {
                if(vm.password_check == vm.password)
                {
                    vm.valid_p_check = true;
                    vm.help_password_check = Config.help_words.signup_password_check_ok;
                }
                else
                {
                    vm.valid_p_check = false;
                    vm.help_password_check = Config.help_words.signup_password_check_invalid;
                }
            }
        };
        // 检查验证码-- 需要服务器
        vm.checkCaptcha = function()
        {};

        vm.signup = function()
        {
            var valid = false;
            var username = null;

            switch(vm.signup_type)
            {
                case 'email':
                {
                    vm.touched_u_email = vm.touched_p = vm.touched_p_check = true;
                    valid = vm.valid_u_email && vm.valid_p && vm.valid_p_check;
                    username = vm.username_email;
                    break;
                }
                case 'phone':
                {
                    vm.touched_u_phone = vm.touched_p = vm.touched_p_check = true;
                    valid = vm.valid_u_phone && vm.valid_p && vm.valid_p_check;
                    username = vm.username_phone;
                    break;
                }
            }
            if(valid)
            {
                vm.help_post = '';
                $http.post('/api/user/signup', {username:username, password:vm.password, s_type:vm.signup_type})
                    .success(function(data)
                    {
                        if(data.status == 'success')
                        {
                            vm.signup_err = false;
                            $window.localStorage.setItem('token', data.token);
                            $location.path('/');
                        }
                        else
                        {
                            vm.signup_err = true;
                        }
                    })
                    .error(function()
                    {
                        vm.signup_err = true;
                    });
            }
            else
            {
                vm.help_post = Config.help_words.signup_post_invalid;
            }
        };


        var resetInfo = function()
        {
            vm.reset();
        };
        resetInfo();
    })
    .controller('LoginController', function($http, $window, $location, Config)
    {
        var vm = this;
        vm.err = false;
        vm.err_msg = '';
        vm.username = '';
        vm.password = '';
        vm.valid_u = false;
        vm.valid_p = false;
        vm.touched_u = false;
        vm.touched_p = false;
        vm.msg_u = Config.help_words.login_blank_u;
        vm.msg_p = Config.help_words.login_blank_p;
        vm.msg_post = '';

        vm.touchU = function()
        {
            vm.touched_u = true;
        };
        vm.touchP = function()
        {
            vm.touched_p = true;
        };
        vm.checkU = function()
        {
            if(vm.username == '')
            {
                vm.valid_u = false;
                vm.msg_u = Config.help_words.login_blank_u;
            }
            else
            {
                var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                var reg_phone = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
                var valid_email = reg_email.test(vm.username);
                var valid_phone = reg_phone.test(vm.username);
                if(valid_email || valid_phone)
                {
                    vm.valid_u = true;
                    vm.msg_u = '';
                }
                else
                {
                    vm.valid_u = false;
                    vm.msg_u = Config.help_words.login_invalid_u;
                }
            }
        };
        vm.checkP = function()
        {
            if(vm.password == '')
            {
                vm.valid_p = false;
                vm.msg_p = Config.help_words.login_blank_p;
            }
            else
            {
                var reg = /^[A-Za-z0-9]{6,16}$/;
                var valid = reg.test(vm.password);
                if(valid)
                {
                    vm.valid_p = true;
                    vm.msg_p = '';
                }
                else
                {
                    vm.valid_p = false;
                    vm.msg_p = Config.help_words.login_invalid_p;
                }
            }
        };

        vm.login = function()
        {
            vm.touched_p = vm.touched_u = true;
            if(!vm.valid_u || !vm.valid_p)
            {
                vm.msg_post = Config.help_words.signup_post_invalid;
            }
            else
            {
                vm.msg_post = '';
                $http.post('/api/user/login', {username: vm.username, password: vm.password})
                    .success(function(data)
                    {
                        switch(data.status)
                        {
                            case 'success':
                            {
                                vm.err = false;
                                $window.localStorage.setItem('token', data.token);
                                $location.path('/');
                                break;
                            }
                            case 'invalid_password':
                            {
                                vm.err = true;
                                vm.err_msg = Config.help_words.login_err_p;
                                break;
                            }
                            case 'user_not_found':
                            {
                                vm.err = true;
                                vm.err_msg = Config.help_words.login_err_u;
                                break;
                            }
                            default :
                            {
                                vm.err = true;
                                vm.err_msg = Config.help_words.server_err;
                                break;
                            }
                        }
                    })
                    .error(function(data)
                    {
                        vm.err = true;
                        vm.err_msg = Config.help_words.server_err;
                    });
            }
        };
    })
    .controller('ProfileController', function($http)
    {
        var vm = this;
    });
    /*.controller('UserActionController', function($http, $rootScope, $location, $window, Auth)
    {
        var vm = this;
        vm.password = '';
        vm.signupData =
        {
            username:'',
            password:'',
            password_check:''
        };
        vm.loginData =
        {
            username:'',
            password:''
        };
        vm.error = '';

        vm.editPassword = function()
        {
            vm.error = '';
            $http.post('/api/user/password',{oldPassword: vm.oldPassword, password: vm.password})
                .success(function(data)
                {
                    vm.password='';
                    if(data.status == 'success')
                    {
                        $window.localStorage.setItem('token', data.token);
                        $location.path('/');
                    }
                    else
                    {
                        vm.error = '哎呀，出错了，请重新再试一遍。';
                    }
                });
        };



        vm.signup = function(valid)
        {
            if(valid)
            {
                vm.processing = true;
                if(vm.signupData.password == vm.signupData.password_check)
                {
                    $http.post('/api/user/signup',
                        {
                            username: vm.signupData.username,
                            password: vm.signupData.password,
                            realname: vm.signupData.realname,
                            phone: vm.signupData.phone,
                            email: vm.signupData.email,
                        })
                        .success(function(data)
                        {
                            if(data.status == 'success')
                            {
                                $window.localStorage.setItem('token', data.token);
                                $location.path('/');
                            }
                            else
                            {
                                vm.error = '哎呀，出错了，请重新再试一遍。';
                            }
                        });
                }
                else
                {
                    vm.error = '两次输入密码不同';
                }
            }
            else
            {
                vm.error = "内容输入有误";
            }
        };

        vm.doLogin = function()
        {
            vm.processing = true;
            vm.error = "";
            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function(data)
                {
                    vm.processing = false;
                    Auth.getUser()
                        .then(function(data)
                        {
                            vm.user = data.data;
                        });

                    if(data.status == 'success')
                    {
                        $location.path("/");
                    }
                    else
                    {
                        vm.error = '哎呀，出错了，请重新再试一遍。';
                    }
                });
        };

        vm.doLogout = function()
        {
            Auth.logout();
            //$location.path("/logout");
        };
    });*/