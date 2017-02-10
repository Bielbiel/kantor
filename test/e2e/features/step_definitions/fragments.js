/*global element,by*/
var byString = function (object, fragmentName)
{
    'use strict';
    if (!fragmentName || !fragmentName.replace) {
        return null;
    }
    fragmentName = fragmentName.replace(/\[(\w+)\]/g, '($1)');
    fragmentName = fragmentName.replace(/^\./, '');
    var a = fragmentName.split('.');
    while (a.length) {
        var n = a.shift();
        var arrayExpr = n.match(/(\w+)\(([^)]*)\)/);
        if (arrayExpr) {
            object = object[arrayExpr[1]](arrayExpr[2]);
        } else if (n in object) {
            object = object[n];
        } else {
            throw new Error('Undefined fragment "' + n + '" in "' + fragmentName + '"');
        }
    }
    return object;
};

var fragments = function (text)
{
    'use strict';

    var mapping = {
        cantor: {

            valuePln: element.bind(null, by.css('#valuePln')),
            valueUsd: element.bind(null, by.css('#valueUsd')),
            valueChf: element.bind(null, by.css('#valueChf')),
            valueGbp: element.bind(null, by.css('#valueGbp')),

            errorMessageFor0: element.bind(null, by.css('#errorMessageFor0')),
            errorMessageForMax: element.bind(null, by.css('#errorMessageForMax')),

            errorMessageForBay0: element.bind(null, by.css('#errorMessageForBay0')),
            errorMessageForBay: element.bind(null, by.css('#errorMessageForBay')),

            errorMessageForSell0: element.bind(null, by.css('#errorMessageForSell0')),
            errorMessageForSell: element.bind(null, by.css('#errorMessageForSell')),

            windowForStartValue: element.bind(null, by.css('#windowForStartValue')),
            windowForBay: element.bind(null, by.css('#windowForBay')),
            windowForSell: element.bind(null, by.css('#windowForSell')),

            acceptStartValue: element.bind(null, by.css('.acceptStartValue')),
            buttonForBay: element.bind(null, by.css('#buttonForBay')),
            buttonForSell: element.bind(null, by.css('#buttonForSell')),

            select: element.bind(null, by.css('#select'))

        }
    };

    return byString(mapping, text);
};

module.exports = fragments;
