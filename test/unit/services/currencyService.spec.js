describe('CurrenciesService', function ()
{
    'use strict';
    var currenciesService;
    var http;
    var currency;

    beforeEach(module('cinkciarz'));
    beforeEach(inject(function (CurrencyService, $http)
    {
        currenciesService = CurrencyService;
        http = $http;
        currency = 'USD';
        spyOn(http, 'get').and.callFake(function ()
        {
            return successfulPromise({data: 'blabla'});
        });
    }));
    describe('getCurrency', function ()
    {
        beforeEach(function ()
        {
            currenciesService.getCurrency(currency);
        });
        it('function getCurrency should return $http get request with url of selected currency', function ()
        {
            expect(http.get).toHaveBeenCalledWith('https://api.nbp.pl/api/exchangerates/rates/c/USD/today/?format=json');
        });
    });
    describe('allCurrencies', function ()
    {
        beforeEach(function ()
        {
            currenciesService.allCurrencies();
        });
        it('function allCurrencies should return $http get request with url of selected currency', function ()
        {
            expect(http.get).toHaveBeenCalledWith('https://api.nbp.pl/api/exchangerates/tables/c/?format=json');
        });
    });
});
