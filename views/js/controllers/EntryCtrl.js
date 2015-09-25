/**
 * Created by Haoran on 2015/9/8.
 */
angular.module('EntryCtrl',[])
    .controller('EntryListController',['$http','$routeParams','$location', '$scope',
        function($http,$routeParams,$location,$scope)
    {
        var vm = this;
        $scope.current_city = $routeParams.city;
        $scope.entries = [];
        $scope.districts = [];
        $scope.page_current = 1;
        $scope.page_total = 1;
        //$scope.list_html = '';
        $scope.category = $routeParams.category;

        $scope.b_search = false;
        $scope.query_entity = {};
        $scope.query_digit = {};            // 储存所有的数字数值，该值不在JSP中出现，只在HTML中起作用。
        $scope.query_display = {};          // 显示用字符，提示用户当前的搜索条件
        $scope.count_query_display = 0;
        vm.s_search = '';

        vm.startSearch = function()
        {
            //console.log('Query Digit: ' + $scope.query_digit);
            console.log($scope.query_entity);
            vm.countQueryDisplay();
            $scope.b_search = true;
            $scope.page_current = 1;
            start();
        };

        vm.countQueryDisplay = function()
        {
            $scope.count_query_display = 0;
            for(var index in $scope.query_display)
            {
                $scope.count_query_display += 1;
            }
        };

        $scope.addQueryRange = function(q_name,q_low,q_high,display_index,display_chn,display_unit)
        {
            $scope.query_entity[q_name] = {'$gte':q_low,'$lte':q_high};
            $scope.query_display[display_index] = display_chn + "："
                + q_low.toString() + "-" + q_high.toString() + display_unit;
            //console.log($scope.query_digit);
            vm.startSearch();
        };

        $scope.removeQueryRange = function(q_name, v_low, v_high, display_index)
        {
            delete $scope.query_entity[q_name];
            $scope.query_digit[v_low] = $scope.query_digit[v_high] = 0;
            delete $scope.query_display[display_index];
            //console.log($scope.query_digit);
            vm.startSearch();
        };


        $scope.addQuery_searchBar = function(q_names)
        {
            var reg_blank = /^[\t\n\x0B\f\r]*$/;
            if(reg_blank.test(vm.s_search))
            {
                //console.log('search string is all blank\nremoving search params');
                for(var index in q_names)
                {
                    delete $scope.query_entity[q_names[index]];
                    delete $scope.query_display['search_key'];
                }
                vm.startSearch();
                return;
            }
            $scope.query_display['search_key'] = '关键字：' + vm.s_search;
            var search_keys = vm.s_search.split(' ');

            // 将关键词转化为正则表达式，在字符串最开始加上#，标识该字符串是正则表达式
            var search_string = '#';
            for(var index in search_keys)
            {
                search_string += search_keys[index] + '|';
            }
            search_string = search_string.substr(0,search_string.length-1);
            //console.log(search_string);
            //var reg = new RegExp(search_string);

            for(var index in q_names)
            {
                $scope.query_entity[q_names[index]] = search_string;
            }
            //console.log($scope.query_entity);
            vm.startSearch();
        };

        $scope.addQuery = function(q_name, q_param,display_index,display_chn)
        {
            $scope.query_entity[q_name] = q_param;
            $scope.query_display[display_index] = display_chn + "：" + q_param.toString();
            //console.log($scope.query_entity);
            vm.startSearch();
        };

        $scope.removeQuery = function(q_name,display_index)
        {
            delete $scope.query_entity[q_name];
            delete $scope.query_display[display_index];
            //console.log($scope.query_entity);
            vm.startSearch();
        };

        $scope.nextPage = function()
        {
            $scope.page_current += 1;
            if($scope.page_current >= $scope.page_total)
            {
                $scope.page_current = $scope.page_total;
            }
            start();
        };

        $scope.prevPage = function()
        {
            $scope.page_current -= 1;
            if($scope.page_current <= 1)
            {

                $scope.page_current = 1;
            }
            start();
        };

        $scope.getIncludeUrl = function()
        {
            //var s_url = 'includes/' +  $routeParams.category + '_list.html';
            return 'includes/' +  $routeParams.category + '_list.html';
        };
        $scope.getSearchUrl = function()
        {
            return 'includes/' +  $routeParams.category + '_search.html';
        };
        $scope.getPageCount = function()
        {
            $http.get('/api/entry/count/' + $routeParams.category + '/' + $routeParams.city)
                .success(function(data)
                {
                    //console.log("count: "+data);
                    if(data.status=='success')
                    {
                        $scope.page_total = parseInt(data.page_count);
                        //console.log($scope.page_current.toString() + ' / ' + $scope.page_total.toString())
                    }
                    else
                    {
                        $location.path('/' + $routeParams.city + '/err');
                    }
                })
                .error(function()
                {
                    $location.path('/' + $routeParams.city + '/err');
                });
        };
        $scope.getEntryList = function()
        {
            $scope.entries = [];
            $http.get('/api/entry/list/' + $routeParams.category + '/' + $routeParams.city + '/' + $scope.page_current.toString())
                .success(function(data)
                {
                    //console.log("list: "+data);
                    if(data.status == 'success')
                    {
                        $scope.entries = data.entries;
                    }
                    else
                    {
                        $location.path('/' + $routeParams.city + '/err');
                    }
                })
                .error(function()
                {
                    $location.path('/' + $routeParams.city + '/err');
                });
        };

        $scope.getSearchPageCount = function()
        {
            $http.post('/api/entry/count/' + $routeParams.category + '/' + $routeParams.city,
                {query:$scope.query_entity})
                .success(function(data)
                {
                    //console.log("count: "+data);
                    if(data.status=='success')
                    {
                        $scope.page_total = parseInt(data.page_count);
                        //console.log($scope.page_current.toString() + ' / ' + $scope.page_total.toString())
                    }
                    else
                    {
                        $location.path('/' + $routeParams.city + '/err');
                    }
                })
                .error(function()
                {
                    $location.path('/' + $routeParams.city + '/err');
                });
        };

        $scope.getSearchEntryList = function()
        {
            $scope.entries = [];
            $http.post('/api/entry/list/' + $routeParams.category + '/' + $routeParams.city + '/' + $scope.page_current.toString(),
                {query:$scope.query_entity})
                .success(function(data)
                {
                    //console.log("list: "+data);
                    if(data.status == 'success')
                    {
                        $scope.entries = data.entries;
                    }
                    else
                    {
                        $location.path('/' + $routeParams.city + '/err');
                    }
                })
                .error(function()
                {
                    $location.path('/' + $routeParams.city + '/err');
                });
        };

        $scope.getDistricts = function()
        {
            $http.get('/api/gen/get_districts/' + $scope.current_city)
                .success(function(data)
                {
                    //console.log(data);
                    $scope.districts = data.districts;
                    $scope.districts.unshift('全部');
                })
                .error(function()
                {
                    $location.path('/' + $routeParams.city + '/err');
                });
        };

        var start = function()
        {
            if($scope.b_search)
            {
                $scope.getSearchPageCount();
                $scope.getSearchEntryList();
            }
            else
            {
                $scope.getPageCount();
                $scope.getEntryList();
            }
            //console.log($scope.page_current.toString());
        };

        $scope.getDistricts();
        start();
    }])
    .controller('EntryNewController',['$http','$rootScope','$routeParams','$location','$scope','Config',
    function($http,$rootScope,$routeParams,$location,$scope,Config)
    {
        $scope.entry = {};
        $scope.phase = 1;
        $scope.category = '';
        $scope.category_chn = '';
        $scope.menu={};
        $scope.districts = [];
        $scope.err_upload = false;
        $scope.msg_upload = '';
        $scope.entry_id = '';
        $scope.current_city = $routeParams.city;
        $scope.loggedIn = $rootScope.loggedIn;
        $scope.uploading = false;

        $scope.closeErrBanner = function()
        {
            $scope.err_upload = false;
            $scope.msg_upload = '';
        };

        $scope.$on('user_logged_in',function()
        {
            $scope.loggedIn = true;
        });

        $scope.getIncludeUrl = function()
        {
            return 'includes/' +  $scope.category + '_new.html';
        };

        $scope.getCategory = function(s_cate)
        {
            $scope.entry.category = s_cate.eng;
            $scope.entry.category_chn = s_cate.chn;
            $scope.category = s_cate.eng;
            $scope.category_chn = s_cate.chn;
            //console.log(s_cate);
            $scope.toPhase_2();
        };

        $scope.toPhase_1 = function()
        {
            $scope.phase = 1;
            $scope.menu = {};
            $scope.entry = {};
            $scope.category = '';
            $scope.category_chn = '';
            $http.get('/api/gen/category/' + $routeParams.city)
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        $scope.menu = data.category;
                    }
                });
        };
        $scope.toPhase_2 = function()
        {
            $scope.phase = 2;
            $scope.districts = [];
            $scope.err_upload = false;
            $scope.msg_upload = '';
            $http.get('/api/gen/get_districts/' + $routeParams.city)
                .success(function(data)
                {
                    $scope.districts = data.districts;
                    $scope.entry.index_city = data.index_city;
                    $scope.entry.region_city = data.city_name;
                    $scope.entry.region_prov = data.prov_name;
                });
        };

        $scope.postEntry = function()
        {
            $scope.uploading = true;
            //console.log($scope.entry);
            $http.post('/api/entry/new',
                {
                    category: $scope.entry.category,
                    category_chn: $scope.entry.category_chn,
                    title: $scope.entry.title,
                    index_city:$scope.entry.index_city,
                    contact_n: $scope.entry.contact_n,
                    contact_p: $scope.entry.contact_p,
                    region_prov: $scope.entry.region_prov,
                    region_city: $scope.entry.region_city,
                    region_district:$scope.entry.region_district,
                    region_addr:$scope.entry.region_addr,
                    desc:$scope.entry.desc,
                    content:$scope.entry.content
                })
                .success(function(data)
                {
                    //console.log(data);
                    $scope.uploading = false;
                    switch(data.status)
                    {
                        case 'success':
                        {
                            //$scope.phase = 3;
                            $scope.err_upload = false;
                            $scope.msg_upload = '';
                            $scope.entry_id = data.id;
                            $location.path('/' + $scope.current_city + '/pic_entry/' + $scope.entry_id);
                            //console.log($scope.entry_id + ', ' + $scope.current_city);
                            break;
                        }
                        case 'invalid_input':
                        {
                            $scope.err_upload = true;
                            $scope.msg_upload = Config.help_words.entry_upload_invalid;
                            break;
                        }
                        case 'too_many':
                        {
                            $scope.err_upload = true;
                            $scope.msg_upload = Config.help_words.entry_upload_too_many;
                            break;
                        }
                        default :
                        {
                            $scope.err_upload = true;
                            $scope.msg_upload = Config.help_words.server_err;
                            break;
                        }
                    }
                })
                .error(function()
                {
                    $scope.uploading = false;
                    $scope.err_upload = true;
                    $scope.msg_upload = Config.help_words.server_err;
                });
        };
        var start = function()
        {
            $scope.toPhase_1();
        };
        start();
    }])
    .controller('EntryDetailController',['$scope', '$http','$routeParams','$location',
        function($scope,$http,$routeParams,$location)
    {
        $scope.entry = {};
        $scope.current_city = $routeParams.city;
        $scope.category = '';
        $scope.current_img = '';

        $scope.switchPic = function(url)
        {
            $scope.current_img = url;
        };

        $scope.getEntry = function()
        {
            $http.get('/api/entry/detail/' + $routeParams.id)
                .success(function(data)
                {
                    //console.log(data);
                    switch(data.status)
                    {
                        case 'success':
                        {
                            $scope.entry = data.entry;
                            $scope.category = 'includes/' + $scope.entry.category + '_detail.html';
                            if($scope.entry.pic_count > 0)
                            {
                                $scope.current_img = $scope.entry.pic_links[0];
                            }
                            break;
                        }
                        case 'not_found':
                        {
                            $location.path('/' + $scope.current_city + '/not_found');
                            break;
                        }
                        default:
                        {
                            $location.path('/' + $scope.current_city + '/err');
                            break;
                        }
                    }
                })
                .error(function()
                {
                    $location.path('/' + $scope.current_city + '/err');
                });
        };

        var start = function()
        {
            $scope.getEntry();
        };
        start();
    }])
    .controller('EntryEditController',['$rootScope','$scope','$http','$location','$routeParams','Config',
    function($rootScope,$scope,$http,$location,$routeParams,Config)
    {
        var vm = this;
        $scope.err_upload = false;
        $scope.msg_upload = '';

        vm.uploading = false;

        $scope.category = '';
        $scope.current_city = $routeParams.city;
        $scope.districts = [];

        //$scope.entry_origin = {};
        $scope.entry_upload = {};

        $scope.closeErrBanner = function()
        {
            $scope.err_upload = false;
            $scope.msg_upload = '';
        };

        $scope.getDistricts = function(index_city)
        {
            $http.get('/api/gen/get_districts/' + index_city)
                .success(function(data)
                {
                    $scope.districts = data.districts;
                    //console.log($scope.districts);
                });
        };

        $scope.getEntry = function()
        {
            //$scope.entry_origin = {};
            $scope.entry_upload = {};
            $http.get('/api/entry/detail/' + $routeParams.id)
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        $scope.err_upload = false;
                        $scope.entry_upload = data.entry;
                        $scope.msg_upload = '';
                        $scope.category = 'includes/' + $scope.entry_upload.category + '_edit.html';
                        //console.log($scope.category);
                        $scope.getDistricts($scope.entry_upload.index_city);
                    }
                    else if(data.status == 'not_found')
                    {
                        $location.path('/' + $scope.current_city + '/not_found');
                    }
                    else
                    {
                        $scope.err_upload = true;
                        $scope.msg_upload = Config.help_words.server_err;
                    }
                })
                .error(function()
                {
                    $scope.err_upload = true;
                    $scope.msg_upload = Config.help_words.server_err;
                });
        };
        $scope.postEntry = function()
        {
            vm.uploading = true;
            $http.post('/api/entry/edit/' + $routeParams.id,
                {
                    title:$scope.entry_upload.title,
                    region_district:$scope.entry_upload.region_district,
                    region_addr:$scope.entry_upload.region_addr,
                    contact_n:$scope.entry_upload.contact_n,
                    contact_p:$scope.entry_upload.contact_p,
                    desc:$scope.entry_upload.desc,
                    content:$scope.entry_upload.content
                })
                .success(function(data)
                {
                    vm.uploading = false;
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        $location.path('/' + $routeParams.city + '/detail/' + $routeParams.id);
                    }
                    else if(data.status == 'invalid_input')
                    {
                        $scope.err_upload = true;
                        $scope.msg_upload = Config.help_words.entry_edit_invalid_input;
                    }
                    else if(data.status == 'not_owner')
                    {
                        $scope.err_upload = true;
                        $scope.msg_upload = Config.help_words.entry_edit_not_owner;
                    }
                    else if(data.status == 'not_found')
                    {
                        $location.path('/' + $scope.current_city + '/not_found');
                    }
                    else
                    {
                        $scope.err_upload = true;
                        $scope.msg_upload = Config.help_words.server_err;
                    }
                })
                .error(function()
                {
                    vm.uploading = false;
                    $scope.err_upload = true;
                    $scope.msg_upload = Config.help_words.server_err;
                });
        };

        var start = function()
        {
            $scope.getEntry();
        };
        start();
    }])
    .controller('EntryPicController',['$rootScope','$scope','$http','$location','$routeParams','Config',
        function($rootScope,$scope,$http,$location,$routeParams,Config)
        {
            var vm = this;
            vm.upload_info =
            {
                extension:'',
                size:0,
                data:undefined
            };
            $scope.current_city = $routeParams.city;
            $scope.entry_id = $routeParams.id;
            $scope.pic_count = 0;
            $scope.pic_links = [];
            $scope.current_img = '';

            $scope.uploading = false;
            $scope.deleting = false;
            $scope.has_file = false;

            $scope.pic_max = 5;

            $scope.has_err = false;
            $scope.msg_err = '';

            vm.freshUploadInfo = function()
            {
                vm.upload_info.extension = '';
                vm.upload_info.size = 0;
                vm.upload_info.data = undefined;
            };

            $scope.closeErrBanner = function()
            {
                $scope.has_err = false;
                $scope.msg_err = '';
            };

            $scope.switchPic = function(url)
            {
                $scope.current_img = url;
            };

            $scope.getUploadPic = function(files)
            {
                //console.log(files[0]);
                vm.upload_info.extension = files[0].name.split('.').pop();
                vm.upload_info.size = files[0].size;
                vm.upload_info.data = new FormData();
                vm.upload_info.data.append("file",files[0]);
                $scope.has_file = true;
                //console.log('format: ' + vm.upload_info.extension + ', size: ' + vm.upload_info.size + ', has file: ' + $scope.has_file);
            };

            $scope.uploadPic = function()
            {
                $scope.uploading = true;

                // 判断是否有文件
                if(!$scope.has_file)
                {
                    $scope.uploading = false;
                    $scope.has_err = true;
                    $scope.msg_err = Config.help_words.entry_pic_upload_blank;
                    return;
                }

                // 判断文件名是否合理
                var valid_extension = false;
                for(var i in Config.pic_file_format)
                {
                    //console.log('compare: ' + f_extension + ' | ' + Config.pic_file_format[i]);
                    if(vm.upload_info.extension == Config.pic_file_format[i])
                    {
                        valid_extension = true;
                        break;
                    }
                }
                if(!valid_extension)
                {
                    //console.log('format invalid');
                    $scope.uploading = false;
                    $scope.has_file = false;
                    $scope.has_err = true;
                    $scope.msg_err = Config.help_words.entry_pic_format_invalid;
                    vm.freshUploadInfo();
                    return;
                }

                // 判断文件大小是否合理
                if(vm.upload_info.size > Config.pic_size_max)
                {
                    //console.log('size invalid');
                    $scope.uploading = false;
                    $scope.has_file = false;
                    $scope.has_err = true;
                    $scope.msg_err = Config.help_words.entry_pic_size_invalid;
                    vm.freshUploadInfo();
                    return;
                }

                //var fd = new FormData();
                //fd.append("file",files[0]);
                //console.log(files[0]);
                $http.post('/api/entry/pic_add/' + $scope.entry_id, vm.upload_info.data,
                    {
                        withCredentials:true,
                        headers:{'Content-Type':undefined},
                        transformRequest: angular.identity
                    })
                    .success(function(data)
                    {
                        //console.log(data);
                        $scope.uploading = false;
                        $scope.has_file = false;
                        vm.freshUploadInfo();

                        switch(data.status)
                        {
                            case 'success':
                            {
                                $scope.has_err = false;
                                $scope.msg_err = '';
                                $scope.pic_count = parseInt(data.pic_count);
                                $scope.pic_links = data.pic_links;
                                if($scope.pic_count > 0)
                                    $scope.current_img = $scope.pic_links[0];

                                break;
                            }
                            case 'not_owner':
                            {
                                $scope.has_err = true;
                                $scope.msg_err = Config.help_words.entry_pic_not_owner;
                                break;
                            }
                            case 'too_many':
                            {
                                $scope.has_err = true;
                                $scope.msg_err = Config.help_words.entry_pic_too_many;
                                break;
                            }
                            default :
                            {
                                $scope.has_err = true;
                                $scope.msg_err = Config.help_words.server_err;
                                break;
                            }
                        }
                    })
                    .error(function()
                    {
                        $scope.uploading = false;
                        $scope.has_file = false;
                        vm.freshUploadInfo();
                        $scope.has_err = true;
                        $scope.msg_err = Config.help_words.server_err;
                    });
            };

            $scope.deletePic = function(url)
            {
                $scope.deleting = true;
                $http.post('/api/entry/pic_delete/' + $scope.entry_id,{img_url:url})
                    .success(function(data)
                    {
                        //console.log(data);
                        $scope.deleting = false;
                        if(data.status == 'success')
                        {
                            $scope.has_err = false;
                            $scope.msg_err = '';
                            $scope.pic_count = parseInt(data.pic_count);
                            $scope.pic_links = data.pic_links;
                            if($scope.pic_count > 0)
                                $scope.current_img = $scope.pic_links[0];
                        }
                        else if(data.status == 'not_owner')
                        {
                            $scope.has_err = true;
                            $scope.msg_err = Config.help_words.entry_pic_not_owner;
                        }
                        else
                        {
                            $scope.has_err = true;
                            $scope.msg_err = Config.help_words.server_err;
                        }
                    })
                    .error(function()
                    {
                        $scope.deleting = false;
                        $scope.has_err = true;
                        $scope.msg_err = Config.help_words.server_err;
                    });
            };

            $scope.getPicInfo = function()
            {
                $http.get('/api/entry/pic/' + $routeParams.id)
                    .success(function(data)
                    {
                        //console.log(data);
                        if(data.status == 'success')
                        {
                            $scope.has_err = false;
                            $scope.msg_err = '';
                            $scope.pic_count = parseInt(data.pic_count);
                            $scope.pic_links = data.pic_links;
                            if($scope.pic_count > 0)
                                $scope.current_img = $scope.pic_links[0];
                        }
                        else if(data.status == 'not_owner')
                        {
                            $scope.has_err = true;
                            $scope.msg_err = Config.help_words.entry_pic_not_owner;
                        }
                        else
                        {
                            $scope.has_err = true;
                            $scope.msg_err = Config.help_words.server_err;
                        }
                    })
                    .error(function()
                    {
                        $scope.has_err = true;
                        $scope.msg_err = Config.help_words.server_err;
                    });
            };

            var start = function()
            {
                $scope.getPicInfo();
            };

            start();
        }]);
