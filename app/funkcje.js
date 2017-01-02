$(function ()
{
    'use strict';

    $('#buttonStartMoney').on('click', function ()
    {
        localStorage.clear();
        var moneyInPut = document.getElementById('inputStartMoney');
        localStorage.setItem('pln', moneyInPut.value);
        $('#pln').html(moneyInPut.value);

        var USD = localStorage.getItem(0);
        $('#usd').html(USD);

        var EUR = localStorage.getItem(0);
        $('#eur').html(EUR);

        var CHF = localStorage.getItem(0);
        $('#chf').html(CHF);

        var GBP = localStorage.getItem(0);
        $('#gbp').html(GBP);
    });

    var pln = localStorage.getItem('pln');
    $('#pln').html(pln);

    var USD = localStorage.getItem('USD');
    $('#usd').html(USD);

    var EUR = localStorage.getItem('EUR');
    $('#eur').html(EUR);

    var CHF = localStorage.getItem('CHF');
    $('#chf').html(CHF);

    var GBP = localStorage.getItem('GBP');
    $('#gbp').html(GBP);

    var selectedOptio = $('#selectForBay option:selected');
    $('#newValueForBuy').html(getCurrency(selectedOptio.val()));
    $('#selectForBay').change(function ()
    {
        var selectedOptio = $('#selectForBay option:selected');
        $('#newValueForBuy').html(getCurrency(selectedOptio.val()));
    });

    // var selectedForSell = $('#selectForSell option:selected');
    // $('#oldValueForSell').html(getCurrency(selectedForSell.val()));
    // $('#selectForSell').change(function ()
    // {
    //
    //     var selectedForSell = $('#selectForSell option:selected');
    //     $('#oldValueForSell').html(getCurrency(selectedForSell.val()));
    // });


    function getCurrency(currency)
    {
        var returnvalue;
        var returnValueForBuy;
        currency = currency.toLowerCase();

        $.ajax({
            type: 'GET',
            async: false,
            url: 'https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json',
            success: function (data)
            {
                returnvalue = data.rates[0].bid;
                returnValueForBuy = data.rates[0].ask;
            }
        });


        $('#moneyInInput').on('keyup', function ()
        {
            var currentRate = parseFloat(returnValueForBuy);
            var plnn = $(this).val();
            $('#newWaluteForBuy').text((plnn * currentRate).toFixed(2));
            $('#pln11-count').text($(this).val());
            var math = document.getElementById('moneyInInput');
            localStorage.setItem('pln11', math.value * currentRate);
        });

        $('#labelInSell').on('keyup', function ()
        {
            var currentRateForSell = parseFloat(returnvalue);
            var plnn = $(this).val();
            $('#oldWaluteForBay').text((plnn * currentRateForSell).toFixed(2));
            $('#plnViewInSell').text($(this).val());

            var math = document.getElementById('labelInSell');
            localStorage.setItem('actuallyMoneyForSell', math.value * currentRateForSell);

        });

        $('#saveInSell').on('click', function ()
        {
            var startPln = localStorage.getItem('pln');
            var MyMoney = parseInt(localStorage.getItem('actuallyMoneyForSell'), 10);
            var nameWalute = localStorage.getItem(currency);

            if (Math.round(MyMoney * 100) <= Math.round(nameWalute * 100)) {

                parseInt(localStorage.setItem('pln', startPln + MyMoney), 10);
                var pln = localStorage.getItem('pln');
                $('#pln').html(pln);

            } else {
                alert("Za malo pieniedzy");
            }
        });


        $('#save').on('click', function ()
        {
            var startPln = localStorage.getItem('pln');
            var MyMoney = localStorage.getItem('pln11');

            if (Math.round(MyMoney * 100) <= Math.round(startPln * 100)) {
                localStorage.setItem('pln', startPln - MyMoney);
                var pln = localStorage.getItem('pln');
                $('#pln').html(pln);

                var nameWalute = $('#selectForBay option:selected').val();

                var walute = document.getElementById('moneyInInput');

                save(nameWalute, parseInt(walute.value, 10));

                var USD = localStorage.getItem('USD');
                $('#usd').html(USD);

                var EUR = localStorage.getItem('EUR');
                $('#eur').html(EUR);

                var CHF = localStorage.getItem('CHF');
                $('#chf').html(CHF);

                var GBP = localStorage.getItem('GBP');
                $('#gbp').html(GBP);

            } else {
                alert("Za malo pieniedzy");
            }
        });

        function save(currency, nameWalute)
        {
            if (localStorage.getItem(currency) == null) {
                localStorage.setItem(currency, 0);
            }
            var walletValue = parseInt(localStorage.getItem(currency), 0);
            var sum = walletValue + nameWalute;
            localStorage.setItem(currency, sum);
            return sum;
        }
    }
});








