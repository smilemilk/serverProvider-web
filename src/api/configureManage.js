'use strict';

import request from '@/libs/request'
import util from '@/libs/util';

//业务类型管理
export function merchants (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/queryMerchants',
        method: 'get',
        params: params
    });
}
export function merchantListLimit (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/queryMerchantBizTypeWithPage',
        method: 'get',
        params: params
    });
}
export function addMerchant (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/addMerchantBizType',
        method: 'post',
        params: params,
        data: params
    });
}
export function updateMerchant (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/updateMerchantBizType',
        method: 'post',
        params: params,
        data: params
    });
}
export function deleteMerchant (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/deleteMerchantBizType',
        method: 'post',
        params: params,
        data: params
    });
}
export function recoverMerchant (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/recoverMerchantBizType',
        method: 'post',
        params: params,
        data: params
    });
}

//业务类型管理
export function accountList (params) {
    return request({
        url: util.ajaxFront + '/thirdpay/account/list',
        method: 'post',
        params: params,
        data: params
    });
}

//支付场景配置
export function systemBis (params) {
    return request({
        url: util.ajaxFront + '/merchantBizType/querySysBizType',
        method: 'get',
        params: params
    });
}

export function paySceneList (params) {
    return request({
        url: util.ajaxFront + '/payScene/queryMerchants',
        method: 'get',
        params: params
    });
}

export function sceneList(params) {
    return request({
        url: util.ajaxFront + '/payScene/sceneSetupInfo',
        method: 'post',
        params: params,
        data: params
    });

}

export function submitScene (params) {
    return request({
        url: util.ajaxFront + '/payScene/submitSceneInfo',
        method: 'post',
        params: params,
        data: params
    });
}

export function merchantList (params) {
    return request({
        url: util.ajaxFront + '/payScene/queryUnSettingMerchants',
        method: 'get',
        params: params,
    });
}

export function payScene (params) {
    return request({
        url: util.ajaxFront + '/payScene/queryOssAllPayScene',
        method: 'get',
        params: params,
    });
}


export default {
    merchants,
    merchantListLimit,
    systemBis,
    addMerchant,
    updateMerchant,
    deleteMerchant,
    recoverMerchant,

    accountList,

    paySceneList,
    sceneList,
    submitScene,
    merchantList,
    payScene
}
