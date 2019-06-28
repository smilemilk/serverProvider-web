import {parseTime, moneyFormat} from '@/filters';
import {businessDeleteStatus} from '@/filters/status';

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
                key: 'merchantBizTypeName',
                title: '商户业务类型',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', params.row.merchantBizTypeName || '');
                }
            },
            {
                key: 'merchantBizTypeCode',
                title: '商户业务类型编码',
                align: 'center',
                minWidth: 100,
                render: (h, params) => {
                    return h('div', params.row.merchantBizTypeCode || '');
                }
            },
            {
                key: 'sysBizTypeName',
                title: '系统业务类型',
                align: 'center',
                minWidth: 200,
                render: (h, params) => {
                    return h('div',[h('span', {
                        domProps: {
                           innerHTML: params.row.sysBizTypeName || ''
                        }
                    }),
                        h('span', {
                            domProps: {
                                innerHTML: params.row.sysBizPropertyOne || '——'
                            },
                            style: 'display: inline-block; margin-left: 7px; border: 1px solid #999; border-radius: 15px; padding: 0px 5px;'
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: params.row.sysBizPropertyTwo || '——'
                            },
                            style: 'display: inline-block; margin-left: 7px; border: 1px solid #999; border-radius: 15px; padding: 0px 5px;'
                        }),
                    ]);
                }
            },
            {
                key: 'isDelete',
                title: '状态',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', businessDeleteStatus(params.row.isDelete) || '');
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

