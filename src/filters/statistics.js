export function directionStatistics(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '支出';
    } else if (value === '1' || value === 1) {
        item = '收入';
    } else {
        item = '';
    }
    return item;
}

export function sourceType(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '1') {
        item = '文件上传';
    } else if (value === '2') {
        item = '接口拉取';
    } else if (value === '3'){
        item = '手工补录';
    } else if (value === '4') {
        item = '以His为准';
    }
    return item;
}

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
        item = '对账成功';
    } else if (value === '3') {
        item = '对账失败';
    } else if (value === '4') {
        item = '存在异常';
    } else if (value === '5') {
        item = '待勾对';
    } else if (value === '6') {
        item = '已归档';
    } else {
        item = '';
    }
    return item;
}

export function billStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '业务账单';
    } else if (value === '1') {
        item = '资金账单';
    } else if (value === '2') {
        item = '应用账单';
    } else if (value === '3') {
       item = '应用业务账单';
    } else if (value === '4') {
       item = '应用资金账单';
    }else {
        item = value;
    }
    return item;
}

export function handleProcess(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '1') {
        item = '手工勾对';
    } else if (value === '2') {
        item = '自动勾对';
    } else {
        item = '';
    }
    return item;
}

export function handleStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '1') {
        item = '挂账';
    } else if (value === '2') {
        item = '调账';
    } else if (value === '3') {
        item = '参与对账';
    } else {
        item = '';
    }
    return item;
}

export function autoCheckStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '对账未开始';
    } else if (value === '1') {
        item = '对账通过';
    } else if (value === '2') {
        item = '对账异常';
    } else if (value === '3') {
        item = '挂账';
    } else {
        item = '';
    }
    return item;
}
