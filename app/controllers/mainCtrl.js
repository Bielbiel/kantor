(function ()
{
    'use strict';

    function MainController(CurrencyService, $localStorage)
    {
        var ctrl = this;

        ctrl.message = 'Trener Cinkciarza';

        ctrl.data = {
            model: null, availableOptions: [{name: 'USD'}, {name: 'EUR'}, {name: 'CHF'}, {name: 'GBP'}

            ]
        };


        ctrl.getCurrency = function (selectedValue)
        {
            CurrencyService.getCurrency(selectedValue)
                    .then(function (result)
                    {
                        ctrl.money = result;
                        ctrl.moneyInSell = result;
                    });
        };

        ctrl.wallet = $localStorage.$default([{pln: ctrl.amount}, {eur: 0}, {dol: 0}, {chf: 0}, {gbp: 0}]);

        ctrl.amount = 0;

        ctrl.allCurrencies = function (value)
        {
            CurrencyService.getCurrency(value).then(function (data)
            {
                ctrl[value] = data;
                console.log(data);
            });

        };
        CurrencyService.allCurrencies().then(function (data)
        {
            ctrl.arrayCurrency = data[0].rates;
        });
    }

    angular.module('cinkciarz')
            .controller('MainController', MainController);


})();

