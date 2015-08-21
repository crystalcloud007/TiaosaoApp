/**
 * Created by Haoran on 2015/8/20.
 */
var app = angular.module('app',['AuthService']);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('AuthInterceptor');
});