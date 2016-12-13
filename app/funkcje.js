$(function ()
{
    'use strict';
    $('#zmien').on('click', function ()
    {
        var name = prompt('Wpisz stan poczatkowy:');
        name = parseInt(name, 10);
        localStorage.setItem('pln', name);
        var pln = localStorage.getItem('pln');
        $('#pln').html(pln);

    });
});

$(function ()
{
    'use strict';
    $('#value').on('click', function ()
    {


    });
});

// waluta pobierana

$(document).ready(function ()
{
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
                var variablevalue  = data.rates[0].ask;
            }

        });

        $('#pln1').on('keyup', function ()
        {

            var pln = +$(this).val();
            $('#total').text((pln * plnToUsd).toFixed(2));
            $('#pln11-count').text($(this).val());
        });

    });
});







