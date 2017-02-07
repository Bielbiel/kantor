(function ()
{

    'use strict';
    function MainController(CurrencyService, $localStorage, Wallet, $window)
    {
        var ctrl = this;

        ctrl.message = 'Trener Cinkciarza';

        ctrl.amount = null;
        ctrl.amountForBay = null;
        ctrl.amountForSell = null;

        CurrencyService.allCurrencies().then(function (data)
        {
            ctrl.arrayCurrency = data[0].rates;
        });

        $localStorage.$default({
            wallet: {
                pln: 0, USD: 0, EUR: 0, CHF: 0, GBP: 0, AUD: 0, CAD: 0, HUF: 0, XDR: 0
            }
        });

        ctrl.data = {
            model: 'USD',
            availableOptions: [{name: 'USD'}, {name: 'AUD'}, {name: 'CAD'}, {name: 'EUR'}, {name: 'HUF'}, {name: 'CHF'}, {name: 'GBP'}, {name: 'XDR'}]
        };

        ctrl.wallet = Wallet.getWallet();

        ctrl.buttonStart = function ()
        {
            if (ctrl.amount === undefined) {
                $window.alert('Zbyt duza lub zbyt mala kwota startowa');
            } else {
                ctrl.wallet.pln = ctrl.amount;
                ctrl.wallet.EUR = 0;
                ctrl.wallet.USD = 0;
                ctrl.wallet.CHF = 0;
                ctrl.wallet.GBP = 0;
                ctrl.wallet.AUD = 0;
                ctrl.wallet.CAD = 0;
                ctrl.wallet.HUF = 0;
                ctrl.wallet.XDR = 0;
            }
        };

        ctrl.getCurrency = function (selectedValue)
        {
            CurrencyService.getCurrency(selectedValue)
                    .then(function (result)
                    {
                        ctrl.money = result.rates[0].ask;
                        ctrl.moneyInSell = result.rates[0].bid;

                        ctrl.valueInViewBuy = parseFloat(ctrl.amountForBay * ctrl.money).toFixed(2);
                        ctrl.valueInViewSell = parseFloat(ctrl.amountForSell * ctrl.moneyInSell).toFixed(2);

                        ctrl.buy = function ()
                        {
                            var checksValueForSell = Math.round(ctrl.wallet.pln * 100) < Math.round(ctrl.valueInViewBuy * 100);

                            if (checksValueForSell) {
                                window.alert('Za malo pieniedzy :(');
                            } else {
                                ctrl.wallet[ctrl.data.model] += ctrl.amountForBay;
                                ctrl.wallet.pln -= ctrl.money * ctrl.amountForBay;
                            }
                        };

                        ctrl.sell = function ()
                        {
                            var checksValueForSell = Math.round(ctrl.wallet[ctrl.data.model] * 100) < Math.round(ctrl.amountForSell * 100);

                            if (checksValueForSell) {
                                window.alert('Za malo pieniedzy :(');
                            } else {
                                ctrl.wallet[ctrl.data.model] -= ctrl.amountForSell;
                                ctrl.wallet.pln += ctrl.moneyInSell * ctrl.amountForSell;
                            }
                        };
                    });
        };


    }

    angular.module('cinkciarz')
            .controller('MainController', MainController);


})();

