(function ()
{
    'use strict';

    function MainController(CurrencyService, $localStorage)
    {
        var ctrl = this;

        ctrl.message = 'Trener Cinkciarza';

        ctrl.data = {
            model: null, availableOptions: [{name: 'USD'}, {name: 'EUR'}, {name: 'CHF'}, {name: 'GBP'}, {name: 'CAD'}
            ]
        };

        ctrl.getCurrency = function (selectedValue)
        {
            CurrencyService.getCurrency(selectedValue)
                    .then(function (result)
                    {
                        ctrl.money = result.rates[0].ask;
                        ctrl.moneyInSell = result.rates[0].bid;

                        ctrl.buy = parseFloat(ctrl.amountForBay * ctrl.money).toFixed(2);
                        ctrl.sell = parseFloat(ctrl.amountForSell * ctrl.moneyInSell).toFixed(2);
                    });


        };

        ctrl.wallet = $localStorage.$default([{pln: ctrl.amount}, {eur: 0}, {dol: 0}, {chf: 0}, {gbp: 0}]);

        ctrl.amount = 0;
        ctrl.amountForBay = 0;
        ctrl.amountForSell = 0;

        ctrl.Currencies = function (value)
        {
            CurrencyService.getCurrency(value).then(function (data)
            {
                ctrl[value] = data;

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

