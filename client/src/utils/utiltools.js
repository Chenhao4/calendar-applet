import Taro from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export const changeTwoDecimal = (x) => {
    var f_x = parseFloat(x);
    if (Number.isNaN(f_x)) {
        console.error('utiltools.changeTwoDecimal error', x)
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

