(function ()
{

    'use strict';
    function MainController(CurrencyService, $localStorage, Wallet)
    {
        var ctrl = this;

        ctrl.message = 'Trener Cinkciarza';

        ctrl.data = {
            model: null, availableOptions: [{name: 'USD'}, {name: 'EUR'}, {name: 'CHF'}, {name: 'GBP'}, {name: 'CAD'}]
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

        $localStorage.$default({
            wallet: {
                pln: 0, eur: 0
            }
        });

        ctrl.confirmBuy = function ()
        {

            ctrl.buttonInBuy = ctrl.amountForBay - ctrl.wallet.pln;
            console.log(ctrl.buttonInBuy);

            ctrl.$storage = $localStorage.$default(ctrl.data.model = ctrl.buy);

        };
        ctrl.setWalletPln = function ()
        {
            ctrl.wallet.pln = ctrl.amount;
        };

        ctrl.buy = function (code, rate, value)
        {
            ctrl.wallet[code] += value;
            ctrl.wallet.pln -= rate * value;
        };


        ctrl.wallet = Wallet.getWallet();
        console.log(ctrl.wallet);

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

