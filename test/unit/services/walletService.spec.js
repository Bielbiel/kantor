describe('LocalStorageService', function ()
{
    'use strict';
    var localService;
    var local;
    var type;

    beforeEach(module('cinkciarz'));
    beforeEach(inject(function (_Wallet_, $localStorage)
    {
        local = $localStorage;
        type = 'GBP';

        local.wallet = {PLN: 200, USD: 50, GBP: 30, EUR: 10, CHF: 0};

        localService = _Wallet_;

    }));
    describe('getWalletCurrency function', function ()
    {

        it('should return localstorage wallet ', function ()
        {
            expect(localService.getWallet()).toBe(local.wallet);
        });
    });
});
