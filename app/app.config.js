(function ()
{
    'use strict';
    angular.module('cinkciarz')
            .config(function ($routeProvider)
            {
                $routeProvider
                        .when('/', {
                            templateUrl: 'views/main.html', controller: 'MainController', controllerAs: 'mainCtrl'
                        });
            });
})();



