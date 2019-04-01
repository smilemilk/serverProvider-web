/**
 * Created by gexuhui on 18/6/29.
 */
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
