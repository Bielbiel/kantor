(function ()
{
    'use strict';
    angular.module('cinkciarz')
            .controller('MainController', MainController);
    function MainController(CurrencyService)
    {
        var ctrl = this;

        ctrl.message = "Trener Cienkciarza";

        ctrl.data = {
            model: 0,
            availableOptions: [
                {id: '1', name: 'USD'},
                {id: '2', name: 'EUR'},
                {id: '3', name: 'CHF'},
                {id: '4', name: 'GBP'}

            ]
        };

        ctrl.amount = 0;

         CurrencyService.getCurrency('usd')
                .then(function (result)
                {
                    console.log(result);
                    ctrl.dolar = result;
                });

    }


})();

