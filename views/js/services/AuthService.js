/**
 * Created by Haoran on 2015/8/20.
 */
angular.module('AuthService',[])
    .factory('AuthToken',['$window', function($window)
    {
        var ATFac = {};

        ATFac.getToken = function()
        {
            return $window.localStorage.getItem('token');
        };

        ATFac.setToken = function(token)
        {
            if(token)
            {
                $window.localStorage.setItem('token', token);
            }
            else
            {
                $window.localStorage.removeItem('token');
            }
        };

        return ATFac;
    }])
    .factory('Auth', ["$http",'$q','AuthToken', function($http, $q, AuthToken)
    {
        var AF = {};

        AF.signup = function(username, password, signup_type)
        {
            $http.post('/api/user/signup', {username:username, password:password, s_type:signup_type})
                .success(function(data)
                {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        AF.login = function(username, password)
        {
            $http.post('/api/user/login', {username:username, password:password})
                .success(function(data)
                {
                    AuthToken.setToken(data.token);
                    return data;
                })
                .error(function(data)
                {
                    AuthToken.setToken();
                    return data;
                });
        };

        AF.logout = function()
        {
            AuthToken.setToken();
        };

        AF.isLoggedIn = function()
        {
            if(AuthToken.getToken())
                return true;
            else
                return false;
        };
        AF.getUser = function()
        {
            if(AuthToken.getToken())
            {
                return $http.get("/api/user/me");
            }
            else
            {
                return $q.reject({message:"No Token Provided"});
            }
        };
        AF.editUser = function(realname, phone, email, desc)
        {
            if(AuthToken.getToken())
            {
                return $http.post('/api/user/me', {realname: realname, phone: phone, email: email, desc:desc})
                    .success(function(data)
                    {
                        return data;
                    });
            }
            else
            {
                return $q.reject({message:'No token provided'});
            }
        };

        return AF;
    }])
    .factory('AuthInterceptor', ['$q','$location', '$rootScope', 'AuthToken',
        function($q, $location,$rootScope, AuthToken)
    {
        var interceptor = {};

        interceptor.request = function(config)
        {
            var token = AuthToken.getToken();
            if(token)
            {
                config.headers["x-access-token"] = token;
            }
            return config;
        };

        interceptor.responseError = function(response)
        {
            if(response.status == 403)
            {
                AuthToken.setToken();

                $location.path("/" + $rootScope.current_geo_city + "/login");
            }
            return $q.reject(response);
        };

        return interceptor;
    }]);