
function formatCurrency(n, currency){
    var s = String(n);
    if (s.length <= 4) return s + currency;
    var k = s.indexOf(".");
    if (k < 0) {
        k = s.length;
    } else {
        s += "00"
    }

    s = s.substr(0, k + 3);
    for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + " " + s.substr(i);

    return s + currency;

}

function formatTerm(n) {
    //console.log(n);
    if (n <= 31) {
        const lastSymbol = parseInt(n.toString().slice(-1));
        if (lastSymbol === 1 && n !== 11) return n + ' день';
        if (n < 5 || (lastSymbol < 5 && n > 20)) return n + ' дня';
        return n + ' дней';
    }

    if (n <= 365) {
        const month = Math.ceil(n / 31);
        if (month === 1) return month + ' месяц';
        if (month < 5) return month + ' месяца';
        return month + ' месяцев';
    }

    const year = parseInt(n / 365);
    const yearRound = Math.round(n / 365 * 10) / 10;
    const yearRes = yearRound - year < 0.5 ? year : year + 0.5;

    if (yearRes === 1) return yearRes + ' год';
    return yearRes + ' года';
}