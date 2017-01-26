(function (angular)
{
    'use strict';
    var app = angular.module('form-example1', []);

    var INTEGER_REGEXP = /^-?\d+$/;
    app.directive('integer', function ()
    {
        return {
            require: 'ngModel-options', link: function (scope, elm, attrs, ctrl)
            {
                ctrl.$validators.integer = function (modelValue, viewValue)
                {
                    if (ctrl.$isEmpty(modelValue)) {

                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {

                        return true;
                    }


                    return false;
                };
            }
        };
    });

})(window.angular);

