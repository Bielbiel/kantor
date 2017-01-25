(function(){
    "use strict";
    angular.module('cinkciarz')
        .service('Wallet', Wallet);

    function Wallet($localStorage){
        this.getWallet = function ()
        {
            return $localStorage.wallet;
        };
    }

})();
