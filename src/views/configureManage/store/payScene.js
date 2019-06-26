import {parseTime, moneyFormat} from '@/filters';

export default function () {
    return {
        columnsTable: [
            {
                key: 'merchantName',
                title: '商户名称',
                align: 'center',
                minWidth: 160,
                render: (h, params) => {
                    return h('div', params.row.merchantName || '');
                }
            },
            {
                key: 'payeeId',
                title: '商户编号',
                align: 'center',
                minWidth: 160,
                render: (h, params) => {
                    return h('div', params.row.payeeId || '');
                }
            },
            {
                key: 'sceneName',
                title: '支付场景',
                align: 'center',
                minWidth: 260,
                render: (h, params) => {
                    return h('div', params.row.sceneName || '');
                }
            },
            {
                key: 'operate',
                title: '操作',
                align: 'center',
                minWidth: 160,
                render: (h, params) => {
                    return h('div',
                        [h('Button', {
                            props: {
                                type: 'dashed',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.rowAction(params.row);
                                }
                            }
                        }, '详情')
                        ]);
                }
            },
        ],
    }
}

