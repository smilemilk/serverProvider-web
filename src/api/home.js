'use strict'

import request from '@/libs/request'
import util from '@/libs/util';

export function statisticsList (params) {
    return request({
        url: util.ajaxFront + 'check/merchant/statistics',
        method: 'get',
        params: params
    })
}

export default {
    statisticsList
}
