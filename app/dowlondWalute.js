/**
 * Created by student on 15.12.16.
 */
$(function ()
{
    $.ajax({
        type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json', success: function (data)
        {
            plnToUsd = data.rates[0].ask;
            $('#plnToUsd').val(plnToUsd);
            usdToPln = data.rates[0].bid;
            $('#usdToPln').val(usdToPln);
        }
    });

});
