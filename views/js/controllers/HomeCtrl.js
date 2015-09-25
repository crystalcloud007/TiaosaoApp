/**
 * Created by Haoran on 2015/8/21.
 */
angular.module('HomeCtrl',[])
    .controller('HomeController', ['$rootScope', '$scope', '$location', 'LocationChecker', 'Auth',
        function($rootScope, $scope, $location, LocationChecker, Auth)
    {
        var vm = this;
        $rootScope.loggedIn = Auth.isLoggedIn();
        vm.loggedIn = $rootScope.loggedIn;
        vm.c_local = '';
        $rootScope.$on("$routeChangeStart", function()
        {
            //getLocation();
            $rootScope.loggedIn = Auth.isLoggedIn();
            vm.loggedIn = $rootScope.loggedIn;
            /*Auth.getUser()
                .then(function(data)
                {
                    vm.user = data.data.user;
                });*/
        });
        $rootScope.$on('$routeChangeSuccess', function()
        {
            getLocation();
        });

        $scope.$on('user_logged_in',function()
        {
            $rootScope.loggedIn = Auth.isLoggedIn();
            vm.loggedIn = $rootScope.loggedIn;
        });


        vm.logOut = function()
        {
            getLocation();
            Auth.logout();
            vm.loggedIn = Auth.isLoggedIn();
            $location.path('/' + vm.c_local);
        };
        var getLocation = function()
        {
            vm.c_local = LocationChecker.getLocation();
            //console.log('HOME里面的现在地点：' + vm.c_local);
        };
    }])
    .controller('MainMenuController', ['$http', '$routeParams',function($http,$routeParams)
    {
        var vm = this;
        vm.category = {};
        vm.cateSubs = [];
        vm.mouseOverMenuMain = false;
        vm.mouseOverMenuSub = false;
        vm.location = $routeParams.city;

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
            $http.get('/api/gen/category/' + $routeParams.city)
                .success(function(data)
                {
                    if(data.status=='success')
                    {
                        vm.category = data.category;
                    }
                });
        };

        getCategoryInfo();
    }])
    .controller('SignUpController', ['$http','$window','$location','Config', 'TextCheck', function($http, $window, $location, Config, TextCheck)
    {
        var vm = this;

        vm.current_block_phone = false;
        vm.current_block_email = true;
        vm.signup_type = 'email';
        vm.signup_err = false;
        vm.signup_err_msg = Config.help_words.server_err;

        vm.closeErrBanner = function()
        {
            vm.signup_err = false;
        };

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
            var result = TextCheck.matchEmail(vm.username_email);

            switch(result)
            {
                case 'valid':
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
                    break;
                }
                case 'invalid':
                {
                    vm.valid_u_email = false;
                    vm.help_username_email = Config.help_words.signup_username_email_invalid;
                    break;
                }
                default :
                {
                    vm.valid_u_email = false;
                    vm.help_username_email = Config.help_words.signup_username_email_blank;
                }
            }
        };
        vm.checkUPhone = function()
        {
            var result = TextCheck.matchPhone(vm.username_phone);
            switch(result)
            {
                case 'valid':
                {
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
                    break;
                }
                case 'invalid':
                {
                    vm.valid_u_phone = false;
                    vm.help_username_phone = Config.help_words.signup_username_phone_invalid;
                    break;
                }
                default :
                {
                    vm.valid_u_phone = false;
                    vm.help_username_phone = Config.help_words.signup_username_phone_blank;
                }
            }
        };
        vm.checkPassword = function()
        {
            var result = TextCheck.matchPassword(vm.password);
            switch (result)
            {
                case 'valid':
                {
                    vm.valid_p = true;
                    break;
                }
                case 'invalid':
                {
                    vm.valid_p = false;
                    vm.help_password = Config.help_words.signup_password_blank;
                    break;
                }
                default :
                {
                    vm.valid_p = false;
                    vm.help_password = Config.help_words.signup_password_blank;
                    break;
                }
            }
        };
        vm.checkPasswordCheck = function()
        {
            var result = TextCheck.doubleCheckPassword(vm.password, vm.password_check);
            switch (result)
            {
                case 'valid':
                {
                    vm.valid_p_check = true;
                    vm.help_password_check = Config.help_words.signup_password_check_ok;
                    break;
                }
                case 'invalid':
                {
                    vm.valid_p_check = false;
                    vm.help_password_check = Config.help_words.signup_password_check_blank;
                    break;
                }
                default :
                {
                    vm.valid_p_check = false;
                    vm.help_password_check = Config.help_words.signup_password_check_blank;
                    break;
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
    }])
    .controller('LoginController', ['$http','$window','$location','Config', function($http, $window, $location, Config)
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

        vm.closeErrBanner = function()
        {
            vm.err = false;
            vm.err_msg = '';
        };

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
    }])
    .controller('ProfileController', ['$rootScope','$http', 'Config', '$timeout','$interval','$window', 'TextCheck', '$routeParams',
        function($rootScope,$http, Config, $timeout, $interval, $window, TextCheck,$routeParams)
    {
        var vm = this;

        vm.counting_down = false;
        vm.location = $routeParams.city;

        vm.profile = {};
        vm.profile_upload = {};
        vm.entry_list = [];
        vm.upload_profile_valid_all = false;

        vm.page_list_current = 1;
        vm.page_list_total = 1;

        vm.password_o = '';
        vm.password = '';
        vm.password_check = '';
        vm.code_verify_phone = '';

        vm.placeholder_realname='';
        vm.placeholder_phone='';
        vm.placeholder_email='';
        vm.placeholder_desc='';


        vm.touched_realname = false;
        vm.touched_email = false;
        vm.touched_phone = false;
        vm.touched_desc = false;
        vm.touched_p_o = false;
        vm.touched_p = false;
        vm.touched_p_check = false;
        vm.touched_code_verify_phone = false;

        vm.err_get_info = false;
        vm.err_upload_profile = false;
        vm.err_change_p = false;
        vm.err_entry_list = false;

        vm.success_upload_profile = false;
        vm.success_change_p = false;
        vm.success_entry_list = false;

        vm.msg_get_info = '';
        vm.msg_valid_upload='';
        vm.msg_upload_profile='';
        vm.msg_realname = '';
        vm.msg_change_p = '';
        vm.msg_valid_change_p = '';
        vm.msg_email = '';
        vm.msg_phone = '';
        vm.msg_desc = '';
        vm.msg_p_o = '';
        vm.msg_p = '';
        vm.msg_p_check = '';
        vm.msg_code_verify_phone = '';
        vm.msg_disable_send_code = '请等待180秒';
        vm.msg_entry_list = '';

        vm.num_disable_send_code = 60;

        vm.valid_realname = false;
        vm.valid_email = false;
        vm.valid_phone = false;
        vm.valid_desc = false;
        vm.valid_p_o = false;
        vm.valid_p = false;
        vm.valid_p_check = false;
        vm.valid_code_verify_phone = false;

        vm.can_modify_realname=false;
        vm.can_modify_phone = false;
        vm.can_modify_email = false;
        vm.can_send_phone_code = true;

        vm.nav_modify_info = false;
        vm.nav_modify_password = false;
        vm.nav_check_info = false;
        vm.nav_check_posts = false;

        /*vm.panel_modify_realname = false;
        vm.panel_modify_gender = false;
        vm.panel_modify_password = false;
        vm.panel_modify_phone = false;
        vm.panel_modify_email = false;
        vm.panel_modify_desc = false;*/

        vm.panel_verify_phone = false;

        $rootScope.$on("$routeChangeStart",function()
        {
            //console.log('Cancelling timer and interval.');
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
        });

        vm.closeErrBanner = function()
        {
            vm.err_upload_profile = false;
            vm.err_change_p = false;
            vm.err_entry_list = false;
        };

        vm.closeSccBanner = function()
        {
            vm.success_change_p = false;
            vm.success_upload_profile = false;
            vm.success_entry_list = false;
        };

        vm.touchRealName = function()
        {
            vm.touched_realname = true;
            vm.msg_realname = Config.help_words.profile_blank_realname;
        };

        vm.touchEmail = function()
        {
            vm.touched_email = true;
            vm.msg_email = Config.help_words.signup_username_email_blank;
        };

        vm.touchPhone = function()
        {
            vm.touched_phone = true;
            vm.msg_phone = Config.help_words.signup_username_phone_blank;
        };

        vm.touchDesc = function()
        {
            vm.touched_desc = true;
            vm.msg_desc = Config.help_words.profile_invalid_user_desc;
            //console.log('desc touched');
        };

        vm.touchP = function()
        {
            vm.touched_p = true;
            vm.msg_p = Config.help_words.signup_password_blank;
        };

        vm.touchPO = function()
        {
            vm.touched_p_o = true;
            vm.msg_p_o = Config.help_words.signup_password_blank;
        };

        vm.touchPCheck = function()
        {
            vm.touched_p_check = true;
            vm.msg_p_check = Config.help_words.signup_password_check_blank;
        };


        vm.touchCodeVerifyPhone = function()
        {
            vm.touched_code_verify_phone = true;
        };

        vm.touchPanelPhone = function()
        {
            vm.panel_verify_phone = !vm.panel_verify_phone;
            vm.valid_code_verify_phone = false;
            vm.touched_code_verify_phone = false;
            vm.code_verify_phone = '';
        };

        vm.checkRealName = function()
        {
            var result = TextCheck.matchRealName(vm.profile_upload.realname);
            switch (result)
            {
                case 'valid':
                {
                    vm.valid_realname = true;
                    vm.msg_realname = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_realname = false;
                    vm.msg_realname = Config.help_words.profile_invalid_realname;
                    break;
                }
                default :
                {
                    vm.valid_realname = false;
                    vm.msg_realname = Config.help_words.profile_blank_realname;
                    break;
                }
            }
        };

        vm.checkEmail = function()
        {
            var result = TextCheck.matchEmail(vm.profile_upload.email);
            switch(result)
            {
                case 'valid':
                {
                    vm.valid_email = true;
                    vm.msg_email = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_email = false;
                    vm.msg_email = Config.help_words.signup_username_email_invalid;
                    break;
                }
                default :
                {
                    vm.valid_email = false;
                    vm.msg_email = Config.help_words.signup_username_email_blank;
                    break;
                }
            }
        };

        vm.checkPhone = function()
        {
            var result = TextCheck.matchPhone(vm.profile_upload.phone);
            switch(result)
            {
                case 'valid':
                {
                    vm.valid_phone = true;
                    vm.msg_phone = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_phone = false;
                    vm.msg_phone = Config.help_words.signup_username_phone_invalid;
                    break;
                }
                default :
                {
                    vm.valid_phone = false;
                    vm.msg_phone = Config.help_words.signup_username_phone_blank;
                    break;
                }
            }
        };

        vm.checkDesc = function()
        {
            //console.log('Desc checked');
            var valid = TextCheck.matchUserDesc(vm.profile_upload.desc);
            if(valid)
            {
                vm.valid_desc = true;
                vm.msg_desc = '';
            }
            else
            {
                vm.valid_desc = false;
                vm.msg_desc = Config.help_words.profile_invalid_user_desc;
            }
        };

        vm.checkP = function()
        {
            var result = TextCheck.matchPassword(vm.password)
            switch(result)
            {
                case 'valid':
                {
                    vm.valid_p = true;
                    vm.msg_p = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_p = false;
                    vm.msg_p = Config.help_words.signup_password_blank;
                    break;
                }
                default :
                {
                    vm.valid_p = false;
                    vm.msg_p = Config.help_words.signup_password_blank;
                    break;
                }
            }
        };

        vm.checkPO = function()
        {
            var result = TextCheck.matchPassword(vm.password_o);
            switch(result)
            {
                case 'valid':
                {
                    vm.valid_p_o = true;
                    vm.msg_p_o = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_p_o = false;
                    vm.msg_p_o = Config.help_words.signup_password_blank;
                    break;
                }
                default :
                {
                    vm.valid_p_o = false;
                    vm.msg_p_o = Config.help_words.signup_password_blank;
                    break;
                }
            }
        };

        vm.checkPCheck = function()
        {
            var result = TextCheck.doubleCheckPassword(vm.password, vm.password_check);
            switch(result)
            {
                case 'valid':
                {
                    vm.valid_p_check = true;
                    vm.msg_p_check = '';
                    break;
                }
                case 'invalid':
                {
                    vm.valid_p_check = false;
                    vm.msg_p_check = Config.help_words.signup_password_check_invalid;
                    break;
                }
                default :
                {
                    vm.valid_p_check = false;
                    vm.msg_p_check = Config.help_words.signup_password_check_blank;
                    break;
                }
            }
        };

        vm.checkCodeVerifyPhone = function()
        {
            if(vm.code_verify_phone == '')
            {
                //console.log('验证码为空');
                vm.valid_code_verify_phone = false;
                vm.msg_code_verify_phone = Config.help_words.profile_code_verify_phone_blank;
                return;
            }
            var reg = /^\d{6}$/;
            vm.valid_code_verify_phone = reg.test(vm.code_verify_phone);
            if(vm.valid_code_verify_phone)
            {
                //console.log('验证码正确');
                vm.msg_code_verify_phone = '';
            }
            else
            {
                //console.log('验证码格式错误');
                vm.msg_code_verify_phone = Config.help_words.profile_code_verify_phone_invalid;
            }
        };

        vm.resetNav = function()
        {
            vm.nav_modify_info = false;
            vm.nav_modify_password = false;
            vm.nav_check_info = false;
            vm.nav_check_posts = false;
        };


        vm.navCheckInfo = function()
        {
            vm.resetNav();
            vm.nav_check_info = true;
            vm.panel_verify_phone = false;
            vm.can_send_phone_code = true;
            vm.entry_list = [];
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
            vm.getInfo();
        };

        vm.navModifyInfo = function()
        {
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
            vm.entry_list = [];
            vm.resetNav();
            vm.nav_modify_info = true;

            vm.profile_upload = {};

            vm.err_upload_profile = false;
            vm.success_upload_profile = false;
            vm.msg_realname = '';
            vm.msg_email = '';
            vm.msg_phone = '';
            vm.msg_desc = '';
            vm.msg_valid_upload = '';
            vm.msg_upload_profile = '';
            vm.touched_realname = false;
            vm.touched_email = false;
            vm.touched_phone = false;
            vm.touched_desc = false;
            vm.valid_realname = false;
            vm.valid_email = false;
            vm.valid_phone = false;
            vm.valid_desc = false;


            if(vm.profile.verify_real_name)
            {
                vm.can_modify_realname = false;
            }
            else
            {
                vm.can_modify_realname = true;
            }

            if(vm.profile.verify_email || vm.profile.username_link == 'email')
            {
                vm.can_modify_email = false;
            }
            else
            {
                vm.can_modify_email = true;
            }

            if(vm.profile.verify_phone || vm.profile.username_link == 'phone')
            {
                vm.can_modify_phone = false;
            }
            else
            {
                vm.can_modify_phone = true;
            }

            if(vm.profile.realname != '')
            {
                vm.placeholder_realname = vm.profile.realname;
            }
            else
            {
                vm.placeholder_realname = Config.help_words.profile_placeholder_realname;
            }
            if(vm.profile.gender == '女')
            {
                vm.profile_upload.gender = 0;
            }
            else
            {
                vm.profile_upload.gender = 1;
            }
            if(vm.profile.phone !='')
            {
                vm.placeholder_phone = vm.profile.phone;
            }
            else
            {
                vm.placeholder_phone = Config.help_words.profile_placeholder_phone;
            }
            if(vm.profile.email != '')
            {
                vm.placeholder_email = vm.profile.email;
            }
            else
            {
                vm.placeholder_email = Config.help_words.profile_placeholder_email;
            }
            if(vm.profile.desc!='')
            {
                vm.placeholder_desc = vm.profile.desc;
            }
            else
            {
                vm.placeholder_desc = Config.help_words.profile_placeholder_desc;
            }

            //console.log(vm.can_modify_realname);
            //console.log(vm.can_modify_email);
            //console.log(vm.can_modify_phone);
        };

        vm.navModifyPassword = function()
        {
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
            vm.entry_list = [];
            vm.resetNav();
            vm.nav_modify_password = true;

            vm.password_o = '';
            vm.password = '';
            vm.password_check = '';
            vm.touched_p_o = false;
            vm.touched_p = false;
            vm.touched_p_check = false;
            vm.msg_change_p='';
            vm.msg_valid_change_p = '';
            vm.msg_p_o = '';
            vm.msg_p = '';
            vm.msg_p_check = '';
            vm.valid_p_o = false;
            vm.valid_p = false;
            vm.valid_p_check = false;
            vm.success_change_p = false;
            vm.err_change_p = false;
        };

        vm.navCheckPosts = function()
        {
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
            vm.resetNav();
            vm.success_upload_profile = false;
            vm.err_entry_list = false;
            vm.msg_entry_list = '';
            vm.nav_check_posts = true;
            vm.page_list_current = 1;
            vm.page_list_total = 1;

            $http.get('/api/entry/count_self')
                .success(function(data)
                {
                    if(data.status=='success')
                    {
                        vm.page_list_total = parseInt(data.page_count);
                    }
                });

            vm.getSelfEntryList();
        };

        vm.listNextPage = function()
        {
            vm.page_list_current += 1;
            if(vm.page_list_current >= vm.page_list_total)
            {
                vm.page_list_current = vm.page_list_total;
            }
            vm.getSelfEntryList();
        };

        vm.listPrevPage = function()
        {
            vm.page_list_current -= 1;
            if(vm.page_list_current <= 1)
            {
                vm.page_list_current = 1;
            }
            vm.getSelfEntryList();
        };

        vm.listTurnToPage = function(page)
        {
            if(page >= 1 || page <= vm.page_list_total)
            {
                vm.page_list_current = page;
                vm.getSelfEntryList();
            }
        };

        vm.getSelfEntryList = function()
        {
            $http.get('/api/entry/list_self/' + vm.page_list_current.toString())
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        vm.entry_list = data.entries;
                    }
                });
        };

        vm.deleteEntry = function(id,entry)
        {
            //console.log('id: ' + id);
            //console.log(entry);

            $http.get('/api/entry/delete/' + id)
                .success(function(data)
                {
                    if(data.status == 'success')
                    {
                        vm.success_entry_list = true;
                        vm.err_entry_list = false;
                        vm.msg_entry_list = Config.help_words.profile_entry_list_delete_success;
                        vm.entry_list.pop(entry);
                    }
                    else
                    {
                        vm.success_entry_list = false;
                        vm.err_entry_list = true;
                        vm.msg_entry_list = Config.help_words.server_err;
                    }
                })
                .error(function()
                {
                    vm.success_entry_list = false;
                    vm.err_entry_list = true;
                    vm.msg_entry_list = Config.help_words.server_err;
                });
        };

        vm.setSendCodeToTrue = function()
        {
            vm.can_send_phone_code = true;
            $timeout.cancel(vm.timer_disable_send_code);
            $interval.cancel(vm.interval_show_disable_msg);
        };

        vm.getCodeVerifyPhone = function()
        {
            vm.can_send_phone_code = false;
            vm.num_disable_send_code = 180;
            vm.timer_disable_send_code = $timeout(function(){
                if(!vm.can_send_phone_code)
                {
                    vm.setSendCodeToTrue();
                }
            },180000);
            vm.interval_show_disable_msg = $interval(function()
            {
                vm.num_disable_send_code -= 1;
                vm.msg_disable_send_code = '请等待' + vm.num_disable_send_code.toString() + '秒';
            },1000);
            $http.get('/api/user/req_verify/phone')
                .success(function(data)
                {
                    switch(data.status)
                    {
                        case 'success':
                        {
                            msg = Config.help_words.profile_req_active_phone_success + '验证码是：' + data.code;
                            $window.alert(msg);
                            break;
                        }
                        case 'already_verified':
                        {
                            $window.alert(Config.help_words.profile_req_active_phone_already);
                            break;
                        }
                        case 'invalid_info':
                        {
                            $window.alert(Config.help_words.profile_req_active_phone_invalid);
                            break;
                        }
                        case 'too_frequently':
                        {
                            $window.alert(Config.help_words.profile_req_active_phone_too_freq);
                            break;
                        }
                        case 'too_many_request':
                        {
                            $window.alert(Config.help_words.profile_req_active_phone_too_many);
                            break;
                        }
                        default :
                        {
                            $window.alert(Config.help_words.server_err);
                            break;
                        }
                    }
                });
        };

        vm.verifyPhone = function()
        {
            vm.touched_code_verify_phone = true;
            if(vm.valid_code_verify_phone)
            {
                $http.post('/api/user/verify/phone', {code:vm.code_verify_phone})
                    .success(function(data)
                    {
                        switch(data.status)
                        {
                            case 'success':
                            {
                                vm.touchPanelPhone();
                                vm.getInfo();
                                $window.alert(Config.help_words.profile_active_phone_success);
                                break;
                            }
                            case 'expired':
                            {
                                $window.alert(Config.help_words.profile_active_phone_expired);
                                break;
                            }
                            case 'invalid_code':
                            {
                                $window.alert(Config.help_words.profile_active_phone_invalid);
                                break;
                            }
                            case 'already_verified':
                            {
                                $window.alert(Config.help_words.profile_active_phone_already);
                                break;
                            }
                            case 'info_not_found':
                            {
                                $window.alert('请先申请验证码！');
                                break;
                            }
                            default:
                            {
                                $window.alert(Config.help_words.server_err);
                                console.log(data.message);
                                break;
                            }
                        }
                    })
                    .error(function()
                    {
                        $window.alert(Config.help_words.server_err);
                        console.log(data.message);
                    });
            }
        };

        vm.activateEmail = function()
        {
            // 直接发邮件，并弹出窗口
            $http.get('/api/user/req_verify/email')
                .success(function(data)
                {
                    switch(data.status)
                    {
                        case 'success':
                        {
                            $window.alert(Config.help_words.profile_req_active_email_success);
                            console.log(data.token);
                            break;
                        }
                        case 'already_verified':
                        {
                            $window.alert(Config.help_words.profile_req_active_email_already);
                            break;
                        }
                        case 'invalid_info':
                        {
                            $window.alert(Config.help_words.profile_req_active_email_invalid);
                            break;
                        }
                        case 'too_many_request':
                        {
                            $window.alert(Config.help_words.profile_req_active_email_too_many);
                            break;
                        }
                        case 'too_frequently':
                        {
                            $window.alert(Config.help_words.profile_req_active_email_too_freq);
                            break;
                        }
                        default :
                        {
                            $window.alert(Config.help_words.server_err);
                            break;
                        }
                    }
                })
                .error(function()
                {
                    $window.alert(Config.help_words.server_err);
                });

        };

        vm.changePassword = function()
        {
            vm.touchP();
            vm.touchPO();
            vm.touchPCheck();
            if(vm.valid_p && vm.valid_p_o && vm.valid_p_check)
            {
                vm.msg_valid_change_p = '';
                $http.post('/api/user/change_password',{oldPassword: vm.password_o, password:vm.password})
                    .success(function(data)
                    {
                        vm.success_change_p = false;
                        vm.err_change_p = false;
                        if(data.status == 'success')
                        {
                            vm.success_change_p = true;
                            vm.msg_change_p = Config.help_words.profile_success_change_p;
                        }
                        else if(data.status=='invalid_password')
                        {
                            vm.err_change_p = true;
                            vm.msg_change_p = Config.help_words.profile_invalid_password;
                        }
                        else
                        {
                            vm.err_change_p = true;
                            vm.msg_change_p = Config.help_words.server_err;
                        }
                        vm.password = vm.password_o = vm.password_check = '';
                    })
                    .error(function()
                    {
                        vm.success_change_p = false;
                        vm.err_change_p = true;
                        vm.msg_change_p = Config.help_words.server_err;
                        vm.password = vm.password_o = vm.password_check = '';
                    });
            }
            else
            {
                vm.msg_valid_change_p = Config.help_words.signup_post_invalid;
            }
        };

        vm.uploadInfo = function()
        {
            vm.touchEmail();
            vm.touchPhone();
            vm.touchRealName();
            vm.touchDesc();
            vm.checkDesc();
            if(!vm.can_modify_realname)
            {
                vm.valid_realname = true;
            }
            if(!vm.can_modify_email)
            {
                vm.valid_email = true;
            }
            if(!vm.can_modify_phone)
            {
                vm.valid_phone = true;
            }
            vm.upload_profile_valid_all = vm.valid_email && vm.valid_phone && vm.valid_realname && vm.valid_desc;

            if(vm.upload_profile_valid_all)
            {
                vm.msg_upload = '';
                $http.post('/api/user/me',
                    {
                        realname: vm.profile_upload.realname,
                        gender: vm.profile_upload.gender,
                        phone: vm.profile_upload.phone,
                        email: vm.profile_upload.email,
                        desc: vm.profile_upload.desc
                    })
                    .success(function(data)
                    {
                        vm.err_upload_profile = vm.success_upload_profile = false;
                        if(data.status == 'success')
                        {
                            vm.success_upload_profile = true;
                            vm.msg_upload_profile = Config.help_words.profile_success_upload_profile;
                        }
                        else if(data.status == 'user_frozen')
                        {
                            vm.err_upload_profile = true;
                            vm.msg_upload_profile = Config.help_words.profile_frozen_user;
                        }
                        else
                        {
                            vm.err_upload_profile = true;
                            vm.msg_upload_profile = Config.help_words.server_err;
                        }
                        vm.profile_upload.realname = vm.profile_upload.gender = vm.profile_upload.phone = '';
                        vm.profile_upload.email = vm.profile_upload.desc = '';
                    })
                    .error(function()
                    {
                        vm.err_upload_profile = true;
                        vm.success_upload_profile = false;
                        vm.msg_upload_profile = Config.help_words.server_err;
                        vm.profile_upload.realname = vm.profile_upload.gender = vm.profile_upload.phone = '';
                        vm.profile_upload.email = vm.profile_upload.desc = '';
                    });
            }
            else
            {
                vm.msg_valid_upload = Config.help_words.signup_post_invalid;
            }
        };

        vm.getInfo = function()
        {
            vm.profile = {};
            $http.get('/api/user/me')
                .success(function(data)
                {
                    if(data.status == 'success')
                    {
                        vm.msg_get_info = '';
                        vm.err_get_info = false;
                        vm.profile = data.user;
                        //console.log(vm.profile);
                    }
                    else
                    {
                        vm.err_get_info = true;
                        vm.msg_get_info = Config.help_words.profile_get_err;
                    }
                })
                .error(function()
                {
                    err_get_info = true;
                    msg_get_info = Config.help_words.profile_get_err;
                });
        };

        var start = function()
        {
            vm.navCheckInfo();
            vm.getInfo();
        };

        // 执行抓取信息
        start();
    }])
    .controller('HelpController', ['$http', '$scope', '$routeParams', '$compile', '$location', function($http, $scope, $routeParams, $compile, $location)
    {
        $scope.content = '';

        $scope.test = '<h1>这是测试</h1><P>测试内容在这里</p>';

        $scope.getContent = function()
        {
            $http.get('/api/help/' + $routeParams.category)
                .success(function(data)
                {
                    $scope.content = data.message;
                })
                .error(function()
                {
                    $location.path('/err');
                });
        };

        var start = function()
        {
            $scope.getContent();
        };
        start();
    }]);