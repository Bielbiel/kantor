(function (angular)
{
    "use strict";
    angular.module('cinkciarz')
            .service('CurrencyService', CurrencyService);

    function CurrencyService($http)
    {
        return {
            getCurrency: function (currency)
            {
                return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json')
                        .then(function (data)
                        {
                           return data.data;
                        }).catch(function (err)
                        {
                            console.log(err);
                        });
            }
        };

    }

})(angular);
