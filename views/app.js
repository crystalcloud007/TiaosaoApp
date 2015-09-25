/**
 * Created by Haoran on 2015/8/20.
 */
var app = angular.module('app',['appRoute', 'ConfigService', 'AuthService','UserCtrl','HomeCtrl', 'EntryCtrl','ADCtrl']);

app.directive('ckeditor', function()
{
    return {
        require : '?ngModel',
        link : function(scope, element, attrs, ngModel)
        {
            var ckeditor = CKEDITOR.replace(element[0], {

            });
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function() {
                ckeditor.setData(ngModel.$viewValue);
            });
            ckeditor.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ckeditor.getData());
                });
            });
            ngModel.$render = function(value) {
                ckeditor.setData(ngModel.$viewValue);
            };
        }
    };
});

app.directive('tsshowhtml', ['$compile', function($compile)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {content: '=content'},
        link: function(scope,element,attrs)
        {
            //console.log('replacing dynamic HTML.');
            scope.$watch('content', function(html)
            {
                element.html(html);
                $compile(element.contents())(scope);
            });
        }
    };
}]);


app.config(['$httpProvider', function($httpProvider)
{
    $httpProvider.interceptors.push('AuthInterceptor');
}]);