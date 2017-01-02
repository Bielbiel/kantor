/**
 * Created by student on 02.01.17.
 */
(function(){
    'use strict';
    angular.module('cienkciarz')
        .controller('MainController', MainController);
    function MainController($scope){
        var ctrl = this;
        ctrl.message = "hello";
    }

})();
