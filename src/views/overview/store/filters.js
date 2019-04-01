export function reconciliationStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '待对账';
    } else if (value === '1') {
        item = '对账中';
    } else if (value === '2') {
        item = '对账通过';
    } else if (value === '3') {
        item = '对账失败';
    } else if (value === '4') {
        item = '存在异常';
    } else if (value === '5') {
        item = '待人工勾对';
    } else if (value === '6') {
        item = '归档';
    } else {
        item = '';
    }
    return item;
}
