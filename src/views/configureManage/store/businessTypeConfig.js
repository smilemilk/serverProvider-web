import {parseTime, moneyFormat} from '@/filters';

export default function () {
    return {
        columnsTable: [
            {
                key: 'merchantName',
                title: '序号',
                align: 'center',
                minWidth: 30,
                render: (h, params) => {
                    return h('div', (params.index*1+1)*(this.queryParams.page));
                }
            },
            {
                key: 'payeeId',
                title: '商户业务类型',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', params.row.payeeId || '');
                }
            },
            {
                key: 'sceneName',
                title: '商户业务类型编码',
                align: 'center',
                minWidth: 100,
                render: (h, params) => {
                    return h('div', params.row.sceneName || '');
                }
            },
            {
                key: 'sceneName',
                title: '系统业务类型',
                align: 'center',
                minWidth: 100,
                render: (h, params) => {
                    return h('div', params.row.sceneName || '');
                }
            },
            {
                key: '状态',
                title: '商户业务类型编码',
                align: 'center',
                minWidth: 100,
                render: (h, params) => {
                    return h('div', params.row.sceneName || '');
                }
            },
            {
                key: 'operate',
                title: '操作',
                align: 'center',
                width: 100,
                render: (h, params) => {
                    return h('div',
                        [h('Button', {
                            props: {
                                type: 'primary',
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

