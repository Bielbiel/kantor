describe('app.config,js', function ()
{
    'use strict';
    var route;

    beforeEach(function ()
    {
        module('cinkciarz');
        inject(function ($route)
        {
            route = $route;
        });
    });

    describe('routes', function ()
    {
        it('should has \'MainController\' controller ', function ()
        {
            expect(route.routes['/'].controller).toBe('MainController');
        });
        it('should has \'MainController.tpl.html\' template ', function ()
        {
            expect(route.routes['/'].templateUrl).toBe('views/main.html');
        });
        it('should has \'mainCtrl\' as controller shortcut', function ()
        {
            expect(route.routes['/'].controllerAs).toBe('mainCtrl');
        });
    });
});
