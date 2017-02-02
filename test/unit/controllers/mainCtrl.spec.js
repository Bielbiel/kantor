describe('app.config,js', function ()
{
    'use strict';
    var storage;
    var CurrencyServiceMock;
    var mainCtrl;
    beforeEach(module('cinkciarz'));

    beforeEach(inject(function ($controller, CurrencyService, $localStorage)
    {
        storage = $localStorage;
        CurrencyServiceMock = CurrencyService;
        mainCtrl = $controller('MainController', {ContactService: CurrencyServiceMock});
    }));

    describe('inicializacion', function ()
    {
        it('should message be set to text', function ()
        {
            expect(mainCtrl.message).toEqual('Trener Cinkciarza');
        });
        it('should amount return null', function ()
        {
            expect(mainCtrl.amount).toEqual(null);
        });
        it('should amountForBay return null', function ()
        {
            expect(mainCtrl.amountForBay).toEqual(null);
        });
        it('should amountForSell return null', function ()
        {
            expect(mainCtrl.amountForSell).toEqual(null);
        });

    });


});
