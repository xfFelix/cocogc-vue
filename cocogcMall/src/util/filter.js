/*
    金额保留小数点后两位
*/
let formatMoney = money => {
    if (/[^0-9\.]/.test(money))
        return "0";
    if (money == null || money == "")
        return "0";
    money = money.toString().replace(/^(\d*)$/, "$1.");
    money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    money = money.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(money))
        money = money.replace(re, "$1,$2");
    money = money.replace(/,(\d\d)$/, ".$1");
    return money;
}

let toDecimal2 = x => {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return '****';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
// 取小数点前的位数
let toDecimal2Fp = x => {
    let toDecimal = toDecimal2(x);
    let toDecimalSplit = toDecimal.split('.');
    let fp = toDecimalSplit[0];
    return fp
}
// 取小数点后的位数
let toDecimal2Ap = x => {
    let toDecimal = toDecimal2(x);
    let toDecimalSplit = toDecimal.split('.');
    let ap = toDecimalSplit[1];
    return ap
}

//超出20个字省略号
let wordSize = x => {
    let removeSpace = x.replace(' ', '');

    if (x != null && x.length > 20) {
        let xs = removeSpace.substring(0, 20) + "..."
        return xs
    } else {
        return x
    }



}

export { formatMoney, toDecimal2, toDecimal2Fp, toDecimal2Ap, wordSize }