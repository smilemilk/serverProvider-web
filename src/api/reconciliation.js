'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function summaryData (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getSummaryIndexData',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: "json",
        data: JSON.stringify(params)
    });
}

export function summaryDetailData (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getSummaryDetailIndexData',
        method: 'get',
        params: params
    });
}

export function summaryDailyData (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getSummaryDailyIndexData',
        method: 'get',
        params: params
    });
}

export function dailySourceInfo (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getDataSourceInfo',
        method: 'get',
        params: params
    });
}

export function dailySummaryInfo (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getDailyCheckSummaryInfo',
        method: 'get',
        params: params
    });
}

export function dailyCheckAppFund (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getDailyCheckAppFundSummaryInfo',
        method: 'get',
        params: params
    });
}

export function dailyHoursInfo (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getDailyCheckHoursSummaryInfo',
        method: 'get',
        params: params
    });
}

export function dailyAmountRange (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getDailyCheckAmountRangSummaryInfo',
        method: 'get',
        params: params
    });
}

export function getDealList (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getRecordCheckInfo',
        method: 'get',
        params: params
    });
}

export function getAppList (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/getAPPList',
        method: 'post',
        params: params,
        data: params
    });
}

export function getSummaryList (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getIndexSummary',
        method: 'get',
        params: params
    });
}

export function summaryDailyIndexData (params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/Index/getUnioncheckIndexs',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: "json",
        data: JSON.stringify(params)
    });
}

export function getCheckOrder(params) {
    return request({
        url: util.ajaxFront + 'merchantCheck/checkOrder',
        method: 'get',
        params: params
    });
}

export default {
    summaryData, // 总账
    summaryDetailData, // 明细
    summaryDailyData, // 日报表
    dailySourceInfo, // 日报表 新增
    dailySummaryInfo, // 日报表分析 三类应用
    dailyCheckAppFund, // 日报表分析 应用 资金
    dailyHoursInfo, // 日报表分析 24小时
    dailyAmountRange, // 日报表分析 金额区间
    getDealList, // 挂账查询
    getAppList, // *公用 应用或收款通道
    getSummaryList, // *公用 列表
    summaryDailyIndexData,//获取对账日报表新
    getCheckOrder,//获取对账单信息
};
