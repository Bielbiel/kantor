/**
 * Created by student on 02.01.17.
 */
(function(){
    angular.module('cienkciarz')
            .config(function ($routeProvider)
            {
          $routeProvider
                  .when('/', {
                      templateUrl: "views/main.html",
                      controller:"MainController",
                      controllerAs: 'mainCtrl'
                  })
            })
})();
