'use strict'

import request from '@/libs/request';

export function checkList (params) {
    return request({
        url: 'merchant/pay/jour',
        method: 'get',
        params: params
    });
}

export default {
    checkList
}