/**
 * Created by Haoran on 2015/8/21.
 */
angular.module('appRoute', ['ngRoute'])
    .config(function($routeProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',
            {
                templateUrl:'partials/home.html',
                controller:'MainMenuController',
                controllerAs:'MainMenu'
            })
            .when('/signup',
            {
                templateUrl:'partials/signup.html',
                controller:'SignUpController',
                controllerAs:'Signup'
            })
            .when('/login',
            {
                templateUrl:'partials/login.html',
                controller:'LoginController',
                controllerAs:'Login'
            })
            .otherwise(
            {
                redirectTo:'/'
            });
    });