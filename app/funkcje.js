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
    $('#oldValueForSell').html(getCurrency(selectedOptio.val()));
    $('#selectForBay').change(function ()
    {

        var selectedOption = $('#selectForBay option:selected');
        $('#oldValueForSell').html(getCurrency(selectedOption.val()));
    });

    function getCurrency(currency)
    {
        currency = currency.toLowerCase();
        var returnvalue;
        $.ajax({
            type: 'GET', async: false, url: 'https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json', success: function (data)
            {

                returnvalue = data.rates[0].bid;
            }
        });


        $('#moneyInInput').on('keyup', function ()
        {
            var currentRate = parseFloat(returnvalue);
            var plnn = $(this).val();
            $('#newWaluteForBuy').text((plnn * currentRate).toFixed(2));
            $('#pln11-count').text($(this).val());
            var math = document.getElementById('moneyInInput');
            localStorage.setItem('pln11', math.value * currentRate);

        });

        $('#save').on('click', function ()
        {
            var startPln = localStorage.getItem('pln');
            var MyMoney = localStorage.getItem('pln11');

            if (Math.round(MyMoney * 100) <= Math.round(startPln * 100)) {
                parseInt(localStorage.setItem('pln', startPln - MyMoney), 10);
                var pln = parseInt(localStorage.getItem('pln'), 10);
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

        function save(nameValue, value)
        {
            if (localStorage.getItem(nameValue) == null) {
                localStorage.setItem(nameValue, 0);

            }
            var walletValue = parseInt(localStorage.getItem(nameValue), 10);
            var sum = walletValue + value;
            localStorage.setItem(nameValue, sum);
            return sum;
        }
    }


});









