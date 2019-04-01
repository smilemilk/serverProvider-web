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

export default {
    paySceneList,
    sceneList,
    submitScene
}
