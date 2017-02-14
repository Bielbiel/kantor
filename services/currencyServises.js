(function ()
{
    'use strict';

    function CurrencyService($http)
    {
        return {
            getCurrency: function (currency)
            {
                return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json')
                        .then(function (data)
                        {
                            return data.data;
                        });
            },

            allCurrencies: function ()
            {
                return $http.get('https://api.nbp.pl/api/exchangerates/tables/c/?format=json')
                        .then(function (response)
                        {
                            return response.data;
                        });
            }
        };
    }

    angular.module('cinkciarz')
            .service('CurrencyService', CurrencyService);


})();
