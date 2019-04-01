'use strict'

import request from '@/libs/request';
import util from '@/libs/util';

export function checkListInfo (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/checkListInfo',
        method: 'get',
        params: params
    });
}

export function checkList (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/checkList',
        method: 'get',
        params: params
    });
}

export function handList (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/summaryCheck',
        method: 'get',
        params: params
    })
}

// export function exportCheck (params) {
//     return request({
//         url: 'unioncheck/merchantCheck/downloadCheck',
//         method: 'get',
//         params: params,
//         // data: params
//     });
// }

export function fundList(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/getUnioncheckAPPAndFundList',
        method: 'post',
        params: params,
        data: params
    });
}

export function getCheckSummary(params) {
    return request({
        url: util.ajaxFront + 'portal/doCheck/getCheckBillDataSummary',
        method: 'post',
        params: params,
        data: params
    });
}

export function getHistoryCheck(params) {
    return request({
        url: util.ajaxFront + 'portal/doCheck/getHistoryRecord',
        method: 'get',
        params: params
    });
}

export function deleteCheck(params) {
    return request({
        url: util.ajaxFront + 'portal/doCheck/deleteCheckBillData',
        method: 'post',
        params: params,
        data: params
    })
}

export function pullCheck (params) {
    return request({
        url: util.ajaxFront + 'portal/doCheck/getManCheckBillDataByInterface',
        timeout: 1000*60*5,
        method: 'post',
        data: params,
        params: params
    });
}

export function submitCheck (params) {
    return request({
        url: util.ajaxFront + 'portal/doCheck/startManCheckOrderJob',
        method: 'post',
        data: params,
        params: params
    });
}

export function cancelCheck (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/cancelArchive',
        method: 'get',
        params: params
    });
}
export function summaryCheck(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/summaryCheck',
        method: 'get',
        params: params
    })
}
export function getAppList(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/getAPPList',
        method: 'post',
        data: params,
        params: params
    })
}
export function batchResult(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/batchIndex',
        method: 'post',
        data: params,
        params: params
    })
}
export function archiveOpera(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/archive',
        method: 'get',
        params: params
    })
}
export function checkSummary(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/unionCheckSummary',
        method: 'post',
        data: params,
        params: params
    })
}
export function doBlend(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/doBlend',
        method: 'post',
        data: params,
        params: params
    })
}
export function doHang(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/doHang',
        method: 'post',
        data: params,
        params: params
    })
}
export function checkForm(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/index',
        method: 'post',
        data: params,
        params: params
    })
}
export function checkFormDetail(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/summaryCheck',
        method: 'get',
        params: params
    })
}
export function orderNo(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/getCheckOrderByNo',
        method: 'get',
        params: params
    })
}

export default {
    checkListInfo,
    checkList,
    handList, // 挂账列表
    // exportCheck,
    fundList,
    getCheckSummary, // 对账 查看配置信息
    getHistoryCheck, // 对账 历史对账
    deleteCheck, // 对账 删除
    pullCheck, // 对账 上传
    submitCheck, // 开始对账
    cancelCheck, // 撤销归档
    summaryCheck, // 手工对账 表单
    getAppList, // 手工对账 商户配置的资金渠道名称 及 通道搜索
    batchResult, // 通道对账结果
    archiveOpera, // 归档操作
    checkSummary, // 手工 手工勾对
    doBlend, // 手工 对账通过
    doHang, // 手工 挂账
    checkForm, // 对账报表
    checkFormDetail, // 对账报表详情
    orderNo
};
