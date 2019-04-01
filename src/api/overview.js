'use strict'

import request from '@/libs/request';
import util from '@/libs/util';

export function monthSummary (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getMonthBillSummary',
        method: 'get',
        params: params
    });
}
export function monthDetail (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getMonthBillDetailSummary',
        method: 'get',
        params: params
    });
}
export function monthBillData (params) {
    return request({
        url: util.ajaxFront + '/merchantCheck/Index/getMonthBillDetailSummary',
        method: 'get',
        params: params
    });
}
export function monthAppFundData (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getMonthAppFundSummaryData',
        method: 'get',
        params: params
    });
}

export default {
    monthSummary,
    monthDetail, // 日历
    monthBillData,
    monthAppFundData
};
