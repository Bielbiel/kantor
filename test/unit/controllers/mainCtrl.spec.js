describe('app.config,js', function ()
{
    'use strict';
    var storage;
    var CurrencyServiceMock;
    var mainCtrl;
    var window;
    beforeEach(module('cinkciarz'));

    beforeEach(inject(function ($controller, CurrencyService, $localStorage, _$window_)
    {
        window = _$window_;

        storage = $localStorage;
        CurrencyServiceMock = CurrencyService;

        spyOn(CurrencyServiceMock, 'allCurrencies').and.callFake(function ()
        {
            return successfulPromise([{rates: 'actual table of currency'}]);
        });
        spyOn(storage, '$default').and.callThrough();
        mainCtrl = $controller('MainController', {ContactService: CurrencyServiceMock});
    }));

    describe('inicializacion', function ()
    {
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
        it('should set table of currencies to arrayCurrency variable', function ()
        {
            expect(mainCtrl.arrayCurrency).toBe('actual table of currency');
        });
    });
    describe('inicializacion localstorage', function ()
    {
        afterEach(function ()
        {
            storage.$reset();
        });
        describe('initialization', function ()
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
    });
    describe('buttonStart', function ()
    {

        describe('when ctrl.amount in undefined', function ()
        {
            beforeEach(function ()
            {
               spyOn(window, 'alert');
                mainCtrl.amount = undefined;
                mainCtrl.buttonStart();

            });

            it('should return alert message', function ()
            {
                expect(window.alert).toHaveBeenCalled();
            });

        });

        describe('when ctrl.amount in defined', function ()
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
            it('should return wallet.XDR return 0', function ()
            {
                expect(mainCtrl.wallet.XDR).toEqual(0);
            });
        });
    });
});
