export function trueStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '否';
    } else if (value === '1') {
        item = '是';
    } else {
        item = '';
    }
    return item;
}

export function successStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '失败';
    } else if (value === '1') {
        item = '成功';
    } else {
        item = '';
    }
    return item;
}

export function businessDeleteStatus(value){
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0') {
        item = '可用';
    } else if (value === '1') {
        item = '已废除';
    } else {
        item = '';
    }
    return item;
}
