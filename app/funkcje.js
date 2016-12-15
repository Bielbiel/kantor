$(function ()
{
    'use strict';
    var pln = localStorage.getItem('pln');
    $('#pln').html(pln);


    $(function ()lStorage	4
    {
        $('#buttonStartMoney').on('click', function ()
        {

            var moneyInPut = document.getElementById('inputStartMoney');
            localStorage.setItem('pln', moneyInPut.value);
            $('#pln').html(moneyInPut.value);


        });
    });
});


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

    $('#pln1').on('keyup', function ()
    {
        var plnn = +$(this).val();
        $('#total').text((plnn * plnToUsd).toFixed(2));
        $('#valueEntered').text($(this).val());


        var math = document.getElementById('pln1');
        localStorage.setItem('valueEntered', math.value * plnToUsd);
        localStorage.setItem('valueEntered', math.value);
        var valueEntered = localStorage.getItem('valueEntered');
    });


    $('#save').on('click', function ()
    {
        var startPln = localStorage.getItem('pln');
        var money = localStorage.getItem('valueEntered');
        if (Math.round(money * 100) <= Math.round(startPln * 100)) {

            localStorage.setItem('pln', startPln - money);
            var pln = localStorage.getItem('pln');
            $('#pln').html(pln);
            var usd = localStorage.getItem('valueEntered' + '#usd');
            $('#usd').html(usd);


        } else {
            alert('Za malo pieniedzy');
        }
    });
});









