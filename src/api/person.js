'use strict'

import request from '@/libs/request';
import util from '@/libs/util';

export function modPassword (params) {
    return request({
        url: util.ajaxFront + 'user/loginpwd/reset',
        method: 'post',
        params: params,
        data: params
    });
}

export function ipHistory (params) {
    return request({
        url: util.ajaxFront + 'check/loginrecord',
        method: 'get',
        params: params
    })
}

export default {
    modPassword,
    ipHistory
};
