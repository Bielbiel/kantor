(function (angular)
{
    'use strict';
    var app = angular.module('form-example1', []);

    var INTEGER_REGEXP = /^-?\d+$/;
    app.directive('integer', function ()
    {
        return {
            require: 'ngModel-options', link: function (ctrl)
            {
                ctrl.$validators.integer = function (modelValue, viewValue)
                {
                    if (ctrl.$isEmpty(modelValue)) {

                        return true;
                    }
                    return false;
                };
            }
        };
    });
})(window.angular);

