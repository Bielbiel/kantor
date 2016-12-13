$(document).ready(function ()
{
    'use strict';
    $(function ()
    {
        $('#but1').on('click', function ()
        {
            var name = document.getElementById('zmien');
            localStorage.setItem('pln', name.value);
            var pln = localStorage.getItem('pln');
            $('#pln').html(pln);
        });
    });
});


$(document).ready(function ()
{
// waluta pobierana
    $(function ()
    {
        $.ajax({
            type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json', success: function (data)
            {
                console.log('success', data);
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
            $('#pln11-count').text($(this).val());

            var math = document.getElementById('pln1');
            localStorage.setItem('pln11', math.value * plnToUsd);
            var pln11 = localStorage.getItem('pln11');

        });
    });
});

$(function ()
{
    'use strict';
    $('#save').on('click', function ()
    {


        var startPln = localStorage.getItem('pln');
        var money = localStorage.getItem('pln11');

        if (money <= startPln) {
            alert('Jest ok');
        }else {
            alert('za malo pieniedzy');
        }
    });
});






