var selectedOptio = $('#selectForSell option:selected');
$('#oldValueForSell').html(getCurrency(selectedOptio.val()));
$('#selectForSell').change(function ()
{
    var selectedOption = $('#selectForSell option:selected');
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





    $('#labelInSell').keyup(function ()
    {
        var valueInInput = parseFloat($(this).val());
        var currentRate = parseFloat(returnvalue);
        $('#sprzedaz').text((valueInInput * currentRate ).toFixed(2));
        $('#plnViewInSell').text($(this).val());
    });
    return returnvalue;

}
