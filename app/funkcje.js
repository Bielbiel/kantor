$(function ()
{
    'use strict';
    var pln = localStorage.getItem('pln');
    $('#pln').html(pln);
    var usd = localStorage.getItem('usd');
    $('#usd').html(usd);

    $('#buttonStartMoney').on('click', function ()
    {
        var moneyInPut = document.getElementById('inputStartMoney');
        localStorage.setItem('pln', moneyInPut.value);
        $('#pln').html(moneyInPut.value);


    });

    var plnToUsd;
    var usdToPln;
    $.ajax({
        type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json', success: function (data)
        {
            plnToUsd = data.rates[0].ask;
            $('#plnToUsd').val(plnToUsd);
            usdToPln = data.rates[0].bid;
            $('#usdToPln').val(usdToPln);
        }
    });


    $('#moneyInInput').on('keyup', function ()
    {
        var plnn = +$(this).val();
        $('#newWaluteForBuy').text((plnn * plnToUsd).toFixed(2));
        $('#pln11-count').text($(this).val());

        var math = document.getElementById('moneyInInput');
       localStorage.setItem('pln11', math.value * plnToUsd);

    });


    $('#save').on('click', function ()
    {
        var startPln = localStorage.getItem('pln');
        var MyMoney = localStorage.getItem('pln11');

        if (Math.round(MyMoney * 100) <= Math.round(startPln * 100)) {
            parseInt(localStorage.setItem('pln', startPln - MyMoney),10);
           var pln = parseInt(localStorage.getItem('pln'),10);
            $('#pln').html(pln);

            var walute = document.getElementById('moneyInInput');
            var sum = save('usd', parseInt(walute.value, 10));
            console.log(sum);
            $('#usd').html(sum);


        } else {
            alert("Za malo pieniedzy");
        }
    });
    function save(currency, value)
    {
        if (localStorage.getItem(currency) == null) {
            localStorage.setItem(currency, 0);

        }
        var walletValue = parseInt(localStorage.getItem(currency), 10);
        var sum = walletValue + value;
        localStorage.setItem(currency, sum);
        return sum;


    }


});









