(function ()
{
    'use strict';
    angular.module('cienkciarz')
            .controller('MainController', MainController);
    function MainController($scope)
    {
        var ctrl = this;
        ctrl.message = "Trener Cienkciarza";
    }


})();

