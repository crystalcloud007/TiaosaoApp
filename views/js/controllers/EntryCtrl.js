/**
 * Created by Haoran on 2015/9/8.
 */
angular.module('EntryCtrl',[])
    .controller('EntryListController',['$http','$routeParams','$location', '$scope',
        function($http,$routeParams,$location,$scope)
    {
        $scope.current_city = $routeParams.city;
        $scope.entries = [];
        $scope.page_current = parseInt($routeParams.page);
        $scope.page_total = 1;
        $scope.list_html = '';
        $scope.category = $routeParams.category;


        $scope.nextPage = function()
        {
            $scope.page_current += 1;
            if($scope.page_current >= $scope.page_total)
            {
                $scope.page_current = $scope.page_total;
            }
            $location.path('/' + $routeParams.city + '/list/' + $routeParams.category + '/' + $scope.page_current.toString());
        };

        $scope.prevPage = function()
        {
            $scope.page_current -= 1;
            if($scope.page_current <= 1)
            {

                $scope.page_current = 1;
            }
            $location.path('/' + $routeParams.city + '/list/' + $routeParams.category + '/' + $scope.page_current.toString());
        };

        $scope.getIncludeUrl = function()
        {
            var s_url = 'includes/' +  $routeParams.category + '_list.html';
            return s_url;
        };
        $scope.getPageCount = function()
        {
            $http.get('/api/entry/count/' + $routeParams.category + '/' + $routeParams.city)
                .success(function(data)
                {
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
            $scope.page_current = parseInt($routeParams.page);
            $http.get('/api/entry/list/' + $routeParams.category + '/' + $routeParams.city + '/' + $scope.page_current.toString())
                .success(function(data)
                {
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

        var start = function()
        {
            $scope.getPageCount();
            $scope.getEntryList();
            //console.log($scope.include_url);
        };

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
                    console.log(data);
                    switch(data.status)
                    {
                        case 'success':
                        {
                            $scope.phase = 3;
                            $scope.err_upload = false;
                            $scope.msg_upload = '';
                            $scope.entry_id = data.id;
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
        $scope.err_upload = false;

        $scope.msg_upload = '';

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
                    $scope.err_upload = true;
                    $scope.msg_upload = Config.help_words.server_err;
                });
        };

        var start = function()
        {
            $scope.getEntry();
        };
        start();
    }]);
