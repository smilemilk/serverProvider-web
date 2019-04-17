'use strict';

import request from '@/libs/request'
import util from '@/libs/util';

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
        url: util.ajaxFront + '/merchantPayScene/merchant/submitSceneInfo',
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
    paySceneList,
    sceneList,
    submitScene,
    merchantList,
    payScene
}
