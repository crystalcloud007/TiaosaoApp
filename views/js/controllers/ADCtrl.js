/**
 * Created by Haoran on 2015/9/24.
 */
angular.module('ADCtrl',[])
    .controller('ADBannerController',['$rootScope', '$scope', '$http','LocationChecker','$interval',
    function($rootScope,$scope,$http,LocationChecker,$interval)
    {
        // 测试过程中....每次从数据库调取最多5个banner
        var vm = this;
        vm.ad_links = [];
        vm.index_ad = 0;
        vm.count_ad = 0;
        vm.current_img = '';
        vm.current_city = LocationChecker.getLocation();
        vm.current_prov = '';

        $rootScope.$on("$routeChangeStart",function()
        {
            $interval.cancel(vm.interval_show_next_ad);
        });

        vm.getNextAD = function()
        {
            if(vm.ad_links.length <= 0)
            {
                $interval.cancel(vm.interval_show_next_ad);
            }
            vm.index_ad += 1;
            if(vm.index_ad >= vm.count_ad)
            {
                vm.index_ad = 0;
            }
            vm.current_img = vm.ad_links[vm.index_ad];
            //console.log('Show Next AD: ' + vm.current_img);
        };

        vm.getAD = function()
        {
            $http.get('/api/ad/country/banner/2')
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        for(var index in data.ads)
                        {
                            vm.count_ad += 1;
                            vm.ad_links.push(data.ads[index].pic_url);
                        }
                        if(vm.ad_links.length > 0 && vm.current_img == '')
                        {
                            vm.current_img = vm.ad_links[0];
                        }
                    }
                });
            $http.get('/api/ad/prov/' + vm.current_prov +'/banner/1')
                .success(function(data)
                {
                    if(data.status == 'success')
                    {
                        for(var index in data.ads)
                        {
                            vm.count_ad += 1;
                            vm.ad_links.push(data.ads[index].pic_url);
                        }
                        if(vm.ad_links.length > 0 && vm.current_img == '')
                        {
                            vm.current_img = vm.ad_links[0];
                        }
                    }
                });
            $http.get('/api/ad/city/' + vm.current_city +'/banner/1')
                .success(function(data)
                {
                    if(data.status == 'success')
                    {
                        for(var index in data.ads)
                        {
                            vm.count_ad += 1;
                            vm.ad_links.push(data.ads[index].pic_url);
                        }
                        if(vm.ad_links.length > 0 && vm.current_img == '')
                        {
                            vm.current_img = vm.ad_links[0];
                        }
                    }
                });

            vm.interval_show_next_ad = $interval(function()
            {
                vm.getNextAD();
            },5000);
        };

        var start = function()
        {
            $http.get('/api/gen/get_geo_info/' + vm.current_city)
                .success(function(data)
                {
                    //console.log(data);
                    if(data.status == 'success')
                    {
                        vm.current_prov = data.index_prov;
                        vm.getAD();
                    }
                });
        };

        start();
    }])
    .controller('ADScreenController',['$rootScope', '$scope', '$http','LocationChecker','$interval',
        function($rootScope,$scope,$http,LocationChecker,$interval)
        {
            // 测试过程中....每次从数据库调取最多5个screen
            var vm = this;
            vm.ad_links = [];
            vm.index_ad = 0;
            vm.count_ad = 0;
            vm.current_img = '';
            vm.current_city = LocationChecker.getLocation();
            vm.current_prov = '';

            $rootScope.$on("$routeChangeStart",function()
            {
                $interval.cancel(vm.interval_show_next_ad);
            });

            vm.getNextAD = function()
            {
                if(vm.ad_links.length <= 0)
                {
                    $interval.cancel(vm.interval_show_next_ad);
                }

                vm.index_ad += 1;
                if(vm.index_ad >= vm.count_ad)
                {
                    vm.index_ad = 0;
                }
                vm.current_img = vm.ad_links[vm.index_ad];
                //console.log('Show Next AD: ' + vm.current_img);
            };

            vm.getAD = function()
            {
                $http.get('/api/ad/country/screen/2')
                    .success(function(data)
                    {
                        //console.log(data);
                        if(data.status == 'success')
                        {
                            for(var index in data.ads)
                            {
                                vm.count_ad += 1;
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            if(vm.ad_links.length > 0 && vm.current_img == '')
                            {
                                vm.current_img = vm.ad_links[0];
                            }
                        }
                    });
                $http.get('/api/ad/prov/' + vm.current_prov +'/screen/1')
                    .success(function(data)
                    {
                        if(data.status == 'success')
                        {
                            for(var index in data.ads)
                            {
                                vm.count_ad += 1;
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            if(vm.ad_links.length > 0 && vm.current_img == '')
                            {
                                vm.current_img = vm.ad_links[0];
                            }
                        }
                    });
                $http.get('/api/ad/city/' + vm.current_city +'/screen/1')
                    .success(function(data)
                    {
                        if(data.status == 'success')
                        {
                            for(var index in data.ads)
                            {
                                vm.count_ad += 1;
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            if(vm.ad_links.length > 0 && vm.current_img == '')
                            {
                                vm.current_img = vm.ad_links[0];
                            }
                        }
                    });

                vm.interval_show_next_ad = $interval(function()
                {
                    vm.getNextAD();
                },5000);
            };

            var start = function()
            {
                $http.get('/api/gen/get_geo_info/' + vm.current_city)
                    .success(function(data)
                    {
                        //console.log(data);
                        if(data.status == 'success')
                        {
                            vm.current_prov = data.index_prov;
                            vm.getAD();
                        }
                    });
            };

            start();
        }])
    .controller('ADSidebarController',['$rootScope', '$scope', '$http','LocationChecker','$interval',
        function($rootScope,$scope,$http,LocationChecker,$interval)
        {
            // 测试过程中....每次从数据库调取最多5个screen
            var vm = this;
            vm.ad_links = [];
            vm.current_city = LocationChecker.getLocation();
            vm.current_prov = '';
            vm.status = 0;

            vm.getAD = function()
            {
                vm.status = 0;
                $http.get('/api/ad/country/sidebar/2')
                    .success(function(data)
                    {
                        //console.log(data);
                        if(data.status == 'success')
                        {
                            for(var index in data.ads)
                            {
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            vm.status += 1;
                        }
                    });

                $http.get('/api/ad/prov/' + vm.current_prov +'/sidebar/1')
                    .success(function(data)
                    {
                        if(data.status == 'success')
                        {
                            //console.log(data);
                            for(var index in data.ads)
                            {
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            vm.status += 1;
                        }
                    });

                $http.get('/api/ad/city/' + vm.current_city +'/sidebar/1')
                    .success(function(data)
                    {
                        if(data.status == 'success')
                        {
                            //console.log(data);
                            for(var index in data.ads)
                            {
                                vm.ad_links.push(data.ads[index].pic_url);
                            }
                            vm.status += 1;
                        }
                    });
            };

            var start = function()
            {
                $http.get('/api/gen/get_geo_info/' + vm.current_city)
                    .success(function(data)
                    {
                        //console.log(data);
                        if(data.status == 'success')
                        {
                            vm.current_prov = data.index_prov;
                            vm.getAD();
                        }
                    });
            };

            start();
        }]);