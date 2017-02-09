describe('app.config,js', function ()
{
    'use strict';
    var storage;
    var CurrencyServiceMock;
    var mainCtrl;
    var window;
    var result;
    var walletService;
    beforeEach(module('cinkciarz'));

    beforeEach(inject(function ($controller, CurrencyService, $localStorage, _$window_, Wallet)
    {
        window = _$window_;
        walletService = Wallet;
        storage = $localStorage;
        CurrencyServiceMock = CurrencyService;

        spyOn(CurrencyServiceMock, 'allCurrencies').and.callFake(function ()
        {
            return successfulPromise([{rates: 'actual table of currency'}]);
        });
        spyOn(storage, '$default').and.callThrough();

        result = {code: 'GBP', rates: [{bid: 5.0305, ask: 5.1321}]};
        spyOn(CurrencyServiceMock, 'getCurrency').and.callFake(function ()
        {
            return successfulPromise(result);
        });
        spyOn(walletService, 'getWallet').and.callThrough();
        mainCtrl = $controller('MainController', {ContactService: CurrencyServiceMock});
    }));

    describe('inicializacion', function ()
    {
        beforeEach(function ()
        {
            localStorage.clear();
        });
        it('should message be set to text', function ()
        {
            expect(mainCtrl.message).toEqual('Trener Cinkciarza');
        });
        it('should amount be set to null', function ()
        {
            expect(mainCtrl.amount).toEqual(null);
        });
        it('should amountForBay be set to null', function ()
        {
            expect(mainCtrl.amountForBay).toEqual(null);
        });
        it('should amountForSell be set to null', function ()
        {
            expect(mainCtrl.amountForSell).toEqual(null);
        });
        it('should call allCurrencies function one time', function ()
        {
            expect(CurrencyServiceMock.allCurrencies.calls.count()).toBe(1);
        });
        it('should set arrayCurrency from data allCurrency', function ()
        {
            expect(mainCtrl.arrayCurrency).toBe('actual table of currency');
        });
        it('should set wallet to value from $localStorage.wallet', function ()
        {
            expect(mainCtrl.wallet).toEqual(storage.wallet);
        });
        it('should call getWallet', function ()
        {
            expect(walletService.getWallet).toHaveBeenCalled();
        });
    });

    describe('$localStorage inicializacion', function ()
    {
        it('should call $localStorage.$default', function ()
        {
            expect(storage.$default).toHaveBeenCalled();
        });
        it('should set USD to 0', function ()
        {
            expect(storage.wallet.USD).toEqual(0);
        });
        it('should set GBP to 0', function ()
        {
            expect(storage.wallet.GBP).toEqual(0);
        });
        it('should set EUR to 0', function ()
        {
            expect(storage.wallet.EUR).toEqual(0);
        });
        it('should set CHF to 0', function ()
        {
            expect(storage.wallet.CHF).toEqual(0);
        });
    });

    describe('buttonStart', function ()
    {
        describe('when amount is undefined', function ()
        {
            beforeEach(function ()
            {
                spyOn(window, 'alert');
                mainCtrl.amount = undefined;
                mainCtrl.buttonStart();

            });

            it('should call alert ', function ()
            {
                expect(window.alert).toHaveBeenCalled();
            });
            it('should return alert message "Zbyt duza lub zbyt mala kwota startowa" ', function ()
            {
                expect(window.alert).toHaveBeenCalledWith('Zbyt duza lub zbyt mala kwota startowa');
            });

        });

        describe('when amount is defined', function ()
        {
            beforeEach(function ()
            {

                mainCtrl.amount = 1;
                mainCtrl.wallet.pln = mainCtrl.amount;
                mainCtrl.buttonStart();
            });
            it('should return wallet.pln equal 1 ', function ()
            {
                expect(mainCtrl.wallet.pln).toEqual(1);
            });
            it('should return wallet.EUR return 0', function ()
            {
                expect(mainCtrl.wallet.EUR).toEqual(0);
            });
            it('should return wallet.USD return 0', function ()
            {
                expect(mainCtrl.wallet.USD).toEqual(0);
            });
            it('should return wallet.CHF return 0', function ()
            {
                expect(mainCtrl.wallet.CHF).toEqual(0);
            });
            it('should return wallet.GBP return 0', function ()
            {
                expect(mainCtrl.wallet.GBP).toEqual(0);
            });
            it('should return wallet.AUD return 0', function ()
            {
                expect(mainCtrl.wallet.AUD).toEqual(0);
            });
            it('should return wallet.CAD return 0', function ()
            {
                expect(mainCtrl.wallet.CAD).toEqual(0);
            });
            it('should return wallet.HUF return 0', function ()
            {
                expect(mainCtrl.wallet.HUF).toEqual(0);
            });
            it('should return wallet.XDR return 0', function ()
            {
                expect(mainCtrl.wallet.XDR).toEqual(0);
            });
        });

        describe('getCurrency', function ()
        {
            beforeEach(function ()
            {
                mainCtrl.getCurrency();
            });
            it('should be call ExchangeRateService.getCurrency', function ()
            {
                expect(CurrencyServiceMock.getCurrency).toHaveBeenCalled();
            });
            describe('always', function ()
            {
                beforeEach(function ()
                {
                    mainCtrl.amountForBay = 10;
                    mainCtrl.amountForSell = 10;
                    mainCtrl.getCurrency('GBP');
                });
                it('should return actually rates in buy', function ()
                {
                    expect(mainCtrl.money).toBe(5.1321);
                });
                it('should return actually rates in sell', function ()
                {
                    expect(mainCtrl.moneyInSell).toBe(5.0305);
                });


                it('should return a value of currencies on the view for buy approximately 2', function ()
                {
                    expect(mainCtrl.valueInViewBuy).toEqual('51.32');
                });
                it('should return a value of currencies on the view for sale approximately 2', function ()
                {
                    expect(mainCtrl.valueInViewSell).toEqual('50.30');
                });
            });


            describe('buy', function ()
            {
                describe('when you dont have a sufficient amount', function ()
                {
                    beforeEach(function ()
                    {
                        spyOn(window, 'alert');
                        mainCtrl.wallet.pln = 10;
                        mainCtrl.valueInViewBuy = 40;
                        mainCtrl.buy();
                    });

                    it('should call alert', function ()
                    {
                        expect(window.alert).toHaveBeenCalled();
                    });
                    it('should return alert message "Za malo pieniedzy :("', function ()
                    {
                        expect(window.alert).toHaveBeenCalledWith('Za malo pieniedzy :(');
                    });

                    describe('when you have a sufficient amount', function ()
                    {
                        beforeEach(function ()
                        {
                            mainCtrl.wallet.pln = 100;
                            mainCtrl.amountForBay = 10;
                            mainCtrl.buy();
                        });
                        it('should return value pln after buy', function ()
                        {
                            expect(mainCtrl.wallet.pln).toEqual(48.678999999999995);
                        });
                        it('should return new currency after buy', function ()
                        {
                            expect(mainCtrl.wallet[mainCtrl.data.model]).toBe(10);
                        });
                    });
                });
            });
            describe('sell', function ()
            {
                describe('when you dont have a sufficient amount', function ()
                {
                    beforeEach(function ()
                    {
                        spyOn(window, 'alert');
                        mainCtrl.wallet[mainCtrl.data.model] = 10;
                        mainCtrl.amountForSell = 100;
                        mainCtrl.sell();
                    });
                    it('should call alert', function ()
                    {
                        expect(window.alert).toHaveBeenCalled();
                    });
                    it('should return alert message "Za malo pieniedzy :("', function ()
                    {
                        expect(window.alert).toHaveBeenCalledWith('Za malo pieniedzy  :(');
                    });
                    describe('when you have a sufficient amount', function ()
                    {
                        beforeEach(function ()
                        {
                            mainCtrl.wallet[mainCtrl.data.model] = 100;
                            mainCtrl.amountForSell = 10;
                            mainCtrl.sell();
                        });
                        it('should return value pln after sell', function ()
                        {
                            expect(mainCtrl.wallet.pln).toEqual(50.305);
                        });
                        it('should return currency after sell', function ()
                        {
                            expect(mainCtrl.wallet[mainCtrl.data.model]).toBe(90);
                        });
                    });
                });
            });

        });
    });
});
