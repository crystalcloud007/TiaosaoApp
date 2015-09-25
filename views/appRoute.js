/**
 * Created by Haoran on 2015/8/21.
 */
angular.module('appRoute', ['ngRoute'])
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',
            {
                /*templateUrl:'partials/home.html',
                controller:'MainMenuController',
                controllerAs:'MainMenu'*/
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromServer();
                    }
                }
            })
            .when('/:city',
            {
                templateUrl:'partials/home.html',
                controller:'MainMenuController',
                controllerAs:'MainMenu',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                        //LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/list/:category',
            {
                templateUrl:'partials/entry_list.html',
                controller:'EntryListController',
                controllerAs:'List',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/new_entry',
            {
                templateUrl:'partials/entry_new.html',
                controller:'EntryNewController',
                controllerAs:'New',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/detail/:id',
            {
                templateUrl:'partials/entry_detail.html',
                controller:'EntryDetailController',
                controllerAs:'Detail',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/pic_entry/:id',
            {
                templateUrl:'partials/entry_pic.html',
                controller:'EntryPicController',
                controllerAs:'Pic',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/edit/:id',
            {
                templateUrl:'partials/entry_edit.html',
                controller:'EntryEditController',
                controllerAs:'Edit',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/signup',
            {
                templateUrl:'partials/signup.html',
                controller:'SignUpController',
                controllerAs:'Signup',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/login',
            {
                templateUrl:'partials/login.html',
                controller:'LoginController',
                controllerAs:'Login',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/profile',
            {
                templateUrl:'partials/profile.html',
                controller:'ProfileController',
                controllerAs:'Profile',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/help/:category',
            {
                templateUrl:'partials/help.html',
                controller:'HelpController',
                controllerAs:'Help',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/locations',
            {
                templateUrl:'partials/locations.html',
                controller:'LocationListController',
                controllerAs:'LocationList',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/err',
            {
                templateUrl:'partials/error.html',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/:city/not_found',
            {
                templateUrl:'partials/not_found.html',
                resolve:
                {
                    func: function(LocationChecker)
                    {
                        LocationChecker.getLocationFromRouteParams();
                    }
                }
            })
            .when('/err',
            {
                templateUrl:'partials/error.html'
            })
            .otherwise(
            {
                redirectTo:'/err/not_found'
            });
    }]);