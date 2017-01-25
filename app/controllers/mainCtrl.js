(function ()
{

    'use strict';
    function MainController(CurrencyService, $localStorage, Wallet)
    {
        var ctrl = this;

        ctrl.message = 'Trener Cinkciarza';

        ctrl.data = {
            model: null, availableOptions: [{name: 'USD'}, {name: 'EUR'}, {name: 'CHF'}, {name: 'GBP'}]
        };
        ctrl.buttonStart = function ()
        {
            ctrl.wallet.pln = ctrl.amount;
            ctrl.wallet.EUR = 0;
            ctrl.wallet.USD = 0;
            ctrl.wallet.CHF = 0;
            ctrl.wallet.GBP = 0;
        };

        $localStorage.$default({
            wallet: {
                pln: 0, USD: 0, EUR: 0, CHF: 0, GBP: 0
            }
        });

        ctrl.wallet = Wallet.getWallet();

        ctrl.getCurrency = function (selectedValue)
        {
            CurrencyService.getCurrency(selectedValue)
                    .then(function (result)
                    {
                        ctrl.money = result.rates[0].ask;
                        ctrl.moneyInSell = result.rates[0].bid;

                        ctrl.buyInWindow = parseFloat(ctrl.amountForBay * ctrl.money).toFixed(2);
                        ctrl.sell = parseFloat(ctrl.amountForSell * ctrl.moneyInSell).toFixed(2);

                        ctrl.buy = function ()
                        {
                            if (Math.round(ctrl.wallet.pln * 100) >= Math.round(ctrl.buyInWindow * 100)) {
                                ctrl.wallet[ctrl.data.model] += ctrl.amountForBay;
                                ctrl.wallet.pln -= ctrl.money * ctrl.amountForBay;
                            }else {
                                alert('Za malo pieniedzy :(');

                            }
                        };

                        ctrl.seller = function ()
                        {
                            if (Math.round(ctrl.wallet[ctrl.data.model] * 100) >= Math.round(ctrl.amountForSell * 100)) {
                                ctrl.wallet[ctrl.data.model] -= ctrl.amountForSell;
                                ctrl.wallet.pln += ctrl.moneyInSell * ctrl.amountForSell;
                            } else {
                                alert('Za malo pieniedzy :(');
                            }
                        };
                    });
        };

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

