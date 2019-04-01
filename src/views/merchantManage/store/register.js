import {parseTime, moneyFormat} from '@/filters';
// import {reconciliationStatus} from 'filters';

export default function () {
    return {
        searchActive: false,
        loading: true,
        tableHeight: 320,
        total: 0,
        multipleSelection: [], // 计算选中项
        searchDay: {
            item1: null,
            item2: null
        },
        checkedWeekStatus: false,
        checkedMonthStatus: false,
        queryParams: {
            billStartTime: '',
            billEndTime: '',
            page: 1, // 页数
            limit: 10 // 一页几条
        },
        dataList: [],
        showDialog: false,
        downloadShowDialog: false,
        rowOperate: false, // 对账表头时间的替换
        rowData: '', // row对账的日期
        fundList: [], //对账结果之前的收款选择
        hoverVisible: false, // hover操作状态
        keyItem: null,       // hover key
        idItem: '',          // hover id
        deleteStatus: false, // hover 删除状态
        checkBillCount: null, // 对账前判断是否已对账
        keepSuccess: true, // 对账 默认保留
        canNextStatus: true, // 默认可以进行其他操作
        fundListChecked: [],
        billDateRange: {
            billStartTime: '',
            billEndTime: ''
        },
        mchConfigArr: [], // HIS 交易方数据
        fundConfigArr:[], // 资金通道
        appConfigArr: [], // 应用数据
        loadingStatus: false,
        uploadUrl: '',
        headerParam: {},
        file: null,
        fileList: [],
        uploadFile: [], // 需要上传的
        columnsTable: [
            {
                key: 'billStartTime',
                title: '申请编号',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.billStartTime ? parseTime(params.row.billStartTime, '{y}-{m}-{d}') : '--');
                }
            },
            {
                key: 'fundTransactionTotalCount',
                title: '商户编号',
                align: 'center',
                render: (h, params) => {
                    if (params.row.unioncheckorderStatus === '5' || params.row.unioncheckorderStatus === 5) {
                        return h('div', '--');
                    } else {
                        return h('div', params.row.fundTransactionTotalCount ? params.row.fundTransactionTotalCount : '--');
                    }
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '外部编号',
                align: 'center',
                render: (h, params) => {
                    if (params.row.unioncheckorderStatus === '5' || params.row.unioncheckorderStatus === 5) {
                        return h('div', '--');
                    } else {
                        return h('div', params.row.fundTransactionTotalAmount ? moneyFormat(params.row.fundTransactionTotalAmount / 100) : '--');
                    }
                }
            },
            {
                key: 'unioncheckorderStatus',
                title: '商户简称',
                align: 'center',
                width: 120,
                render: (h, params) => {
                    return h('div', params.row.unioncheckorderStatus ?
                        params.row.unioncheckorderStatus === '0' ? '待对账' :
                            params.row.unioncheckorderStatus === '1' ? '对账中' :
                                params.row.unioncheckorderStatus === '2' ? '对账成功' :
                                    params.row.unioncheckorderStatus === '3' ? '对账失败' :
                                        params.row.unioncheckorderStatus === '4' ? '存在异常' :
                                            params.row.unioncheckorderStatus === '5' ? '待勾对' :
                                                params.row.unioncheckorderStatus === '6' ? '已归档' :
                                                    params.row.unioncheckorderStatus : '--');
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '商户类型',
                align: 'center',
                render: (h, params) => {
                        return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '收款信息',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '支付场景',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '支付方式',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '业务类型',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '申请时间',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '注册成功时间',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '上线状态',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '上线时间',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '审核状态',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
            {
                key: 'operate',
                title: '操作', // '0' 开始对账，'3'重新对账， '5'手工勾对， '6'查看
                align: 'center',
                width: 160,
                render: (h, params) => {
                    let text = '',
                        text1 = '',
                        text2 = '';
                    let status = params.row.unioncheckorderStatus;
                    if (status === '0' || status === 0) {
                        text = '开始对账';
                    } else if (status === '3' || status === 3) {
                        text = '重新对账';
                    } else if (status === '5' || status === 5) {
                        text = '手工勾对';
                    } else if (status === '6' || status === 6) {
                        text1 = '查看';
                        text2 = '查看报表';
                        // text2 = '撤销归档'
                    }
                    if (status === '0' ||
                        status === 0 ||
                        status === '3' ||
                        status === 3 ||
                        status === '5' ||
                        status === 5) {
                        return h('div',
                            [h('Button', {
                                props: {
                                    type: 'dashed',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        if (status === '0' || status === 0) {
                                            this.reconciliationsRowAction(params.row);
                                        }

                                        if (status === '3' || status === 3) {
                                            this.AgainReconciliationsAction(params.row);
                                        }

                                        if (status === '5' || status === 5) {
                                            this.handworkTick(params.row);
                                        }
                                    }
                                }
                            }, text)
                            ]);
                    }
                    if (status === '6' || status === 6) {
                        return h('div',
                            [h('Button', {
                                props: {
                                    type: 'dashed',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.checkAction(params.row, 'finish');
                                    }
                                }
                            }, text1),
                                h('Button', {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    style: "margin-left: 10px",
                                    on: {
                                        click: () => {
                                            this.checkReportAction(params.row, 'finish');
                                        }
                                    }
                                }, text2)
                            ],

                        );
                    }

                }
            },
            {
                key: 'fundTransactionTotalAmount',
                title: '备注',
                align: 'center',
                render: (h, params) => {
                    return h('div', params.row.fundTransactionTotalAmount);
                }
            },
        ]
    }
}

