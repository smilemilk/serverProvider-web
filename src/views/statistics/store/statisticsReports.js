import {parseTime, moneyFormat} from '@/filters';
import {directionStatistics} from '@/filters/statistics';
import {sourceType} from './filters';

export default function () {
    return {
        dateSearch: '',
        checkParamList: [
            {id: "all", value: "不限"},
            {id: "1", value: "自动对账通过"},
            {id: "4", value: "手工对账通过"},
            {id: "2", value: "对账异常"},
            {id: "3", value: "挂账"}
        ],
        appParamList: [],
        fundParamList: [],
        loading: true,
        total: 0,
        queryParams: {
            checkOrderNo: '',
            autoCheckStatus: '',
            appConfigId: '',
            fundConfigId: '',
            page: 1, // 页数
            limit: 10 // 一页几条
        },
        dataList: [],
        columnsTable: [
            {
                key: 'autoCheckNo',
                width: 140,
                title: '编号',
                align: 'center',
                className: 'small'
            },
            {
                key: '',
                title: '医院账单',
                align: 'center',
                className: 'small',
                render: (h, params) => {
                    let resultHtml = "";
                    if (params.row.mchUnioncheckBusiness) {
                        let temp = params.row.mchUnioncheckBusiness;
                        for (var i in temp) {
                            var item = temp[i];
                        }
                        return h('div', [
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.mchBusinessNo ? "医院单号:" + item.mchBusinessNo : "医院单号:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.appName ? "应用:" + item.appName : "应用:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.appBusinessNo ? "单号:<br/>" + item.appBusinessNo : "单号:--"}
                            }),
                            h('p',
                                {
                                    class: ['left'],
                                },
                                [h('span', {
                                    domProps: {innerHTML: item.businessAmount ? "金额:" + (parseFloat(item.businessAmount) / 100).toFixed(2) + "元" : "金额:--"}
                                }), h('span', {
                                    class: ['margin-left-10'],
                                    domProps: {innerHTML: item.businessDirection ? "方向:" + directionStatistics(item.businessDirection) : "方向:--"}
                                })
                                ]
                            ),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.businessTime ? "时间:" + parseTime(item.businessTime) : "时间:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.sourceType ? "数据来源:" + sourceType(item.sourceType) : "数据来源:--"}
                            })
                        ])
                    } else {
                        resultHtml = '--';
                    }
                    return h('div', resultHtml);
                }
            },
            {
                title: '业务系统账单',
                align: 'center',
                children: [
                    {
                        title: '对应医院账单',
                        key: 'age',
                        align: 'center',
                        className: 'small',
                        render: (h, params) => {
                            let resultHtml = "";
                            if (params.row.appUnioncheckBusiness) {
                                let temp = params.row.appUnioncheckBusiness;
                                for (var i in temp) {
                                    var item = temp[i];
                                }
                                return h('div', [
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.appName ? "应用:" + item.appName : "应用:--"}
                                    }),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.appBusinessNo ? "业务单号:<br/>" + item.appBusinessNo : "业务单号:--"}
                                    }),
                                    h('p',
                                        {
                                            class: ['left'],
                                        },
                                        [h('span', {
                                            domProps: {innerHTML: item.businessAmount ? "金额:" + (parseFloat(item.businessAmount) / 100).toFixed(2) + "元" : "金额:--"}
                                        }), h('span', {
                                            class: ['margin-left-10'],
                                            domProps: {innerHTML: item.businessDirection ? "方向:" + directionStatistics(item.businessDirection) : "方向:--"}
                                        })
                                        ]
                                    ),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.businessTime ? "时间:" + parseTime(item.businessTime) : "时间:--"}
                                    }),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.sourceType ? "数据来源:" + sourceType(item.sourceType) : "数据来源:--"}
                                    })
                                ])
                            } else {
                                resultHtml = '--';
                            }
                            return h('div', resultHtml);
                        }
                    },
                    {
                        title: '对应资金账单',
                        key: 'age',
                        align: 'center',
                        className: 'small',
                        render: (h, params) => {
                            let resultHtml = "";
                            if (params.row.appUnionCheckTransaction) {
                                let temp = params.row.appUnionCheckTransaction;
                                for (var i in temp) {
                                    var item = temp[i];
                                }
                                return h('div', [
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.fundName ? "通道:" + item.fundName : "通道:--"}
                                    }),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.fundTransactionNo ? "通道单号:<br/>" + item.fundTransactionNo : "通道单号:--"}
                                    }),
                                    h('p',
                                        {
                                            class: ['left'],
                                        },
                                        [h('span', {
                                            domProps: {innerHTML: item.transactionAmount ? "金额:" + (parseFloat(item.transactionAmount) / 100).toFixed(2) + "元" : "金额:--"}
                                        }), h('span', {
                                            class: ['margin-left-10'],
                                            domProps: {innerHTML: item.transactionDirection ? "方向:" + directionStatistics(item.transactionDirection) : "方向:--"}
                                        })
                                        ]
                                    ),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.transactionTime ? "时间:" + parseTime(item.transactionTime) : "时间:--"}
                                    }),
                                    h('p', {
                                        class: ['left'],
                                        domProps: {innerHTML: item.sourceType ? "数据来源:" + sourceType(item.sourceType) : "数据来源:--"}
                                    })
                                ])
                            } else {
                                resultHtml = '--';
                            }
                            return h('div', resultHtml);
                        }
                    }
                ]
            },
            {
                key: '',
                title: '资金通道账单',
                align: 'center',
                className: 'small',
                render: (h, params) => {
                    let resultHtml = "";
                    if (params.row.payUnionCheckTransaction) {
                        let temp = params.row.payUnionCheckTransaction;
                        for (var i in temp) {
                            var item = temp[i];
                        }
                        return h('div', [
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.fundName ? "通道:" + item.fundName : "通道:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.appTransactionNo ? "应用单号:<br/>" + item.appTransactionNo : "应用单号:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.fundTransactionNo ? "通道单号:<br/>" + item.fundTransactionNo : "通道单号:--"}
                            }),
                            h('p',
                                {
                                    class: ['left'],
                                },
                                [h('span', {
                                    domProps: {innerHTML: item.transactionAmount ? "金额:" + (parseFloat(item.transactionAmount) / 100).toFixed(2) + "元" : "金额:--"}
                                }), h('span', {
                                    class: ['margin-left-10'],
                                    domProps: {innerHTML: item.transactionDirection ? "方向:" + directionStatistics(item.transactionDirection) : "方向:--"}
                                })
                                ]
                            ),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.transactionTime ? "时间:" + parseTime(item.transactionTime) : "时间:--"}
                            }),
                            h('p', {
                                class: ['left'],
                                domProps: {innerHTML: item.sourceType ? "数据来源:" + sourceType(item.sourceType) : "数据来源:--"}
                            })
                        ])
                    } else {
                        resultHtml = '--';
                    }
                    return h('div', resultHtml);
                }
            },
            {
                key: 'autoCheckStatus',
                title: '自动对账结果',
                align: 'center',
                className: 'small',
                render: (h, params) => {
                    let resultHtml = "";
                    if (params.row.autoCheckStatus) {
                        let it = params.row.autoCheckStatus;
                        let result = params.row.autoCheckResult ? params.row.autoCheckResult : '';
                        if (it === '1') {
                            return h('div', [
                                h('p', {
                                    domProps: {innerHTML: "对账通过"}
                                }),
                                h('p', {
                                    class: ['dark'],
                                    domProps: {innerHTML: result}
                                })
                            ]);
                        }
                        if (it === '2') {
                            return h('div', [
                                h('p', {
                                    class: ['danger'],
                                    domProps: {innerHTML: "对账异常"}
                                }),
                                h('p', {
                                    class: ['dark'],
                                    domProps: {innerHTML: result}
                                })
                            ]);
                        }
                        if (it === '0') {
                            return h('div', [
                                h('p', {
                                    domProps: {innerHTML: "对账未开始"}
                                }),
                                h('p', {
                                    class: ['dark'],
                                    domProps: {innerHTML: result}
                                })
                            ]);
                        }
                        if (it === '3') {
                            return h('div', [
                                h('p', {
                                    domProps: {innerHTML: "挂账"}
                                }),
                                h('p', {
                                    class: ['dark'],
                                    domProps: {innerHTML: result}
                                })
                            ]);
                        }
                    } else {
                        resultHtml = '--';
                    }
                    return h('div', resultHtml);
                }
            },
            {
                key: 'operate',
                title: '操作',
                align: 'center',
                width: 100,
                render: (h, params) => {
                    let text = '';
                    let status = params.row.autoCheckStatus;
                    if (status === '2' || status === 2 || status === '3' || status === 3) {
                        text = '手工勾对';
                    }
                    if (status === '2' ||
                        status === 2 ||
                        status === '3' ||
                        status === 3) {
                        return h('div',
                            [h('Button', {
                                props: {
                                    type: 'dashed',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleAction(params.row);
                                    }
                                }
                            }, text)
                            ]);
                    } else {
                        return h('div', '');
                    }
                }
            }
        ],
        fundList: [],
        columnsTableFund: [
            {
                key: 'indexGroup',
                width: 200,
                title: '通道名称',
                align: 'center'
            },
            {
                key: 'indexValue',
                width: 200,
                title: '对账数量(笔)',
                align: 'center'
            },
        ],
        showDialog: false, // 重对账 start
        fundList: [], //对账结果之前的收款选择
        hoverVisible: false, // hover操作状态
        keyItem: null,       // hover key
        idItem: '',          // hover id
        deleteStatus: false, // hover 删除状态
        checkBillCount: null, // 对账前判断是否已对账
        canNextStatus: true, // 默认可以进行其他操作
        keepSuccess: true, // 对账 默认保留
        fundListChecked: [],
        billDateRange: {
            billStartTime: '',
            billEndTime: ''
        },
        mchConfigArr: [], // HIS 交易方数据
        fundConfigArr: [], // 资金通道
        appConfigArr: [], // 应用数据
        loadingStatus: false,
        uploadUrl: '',
        headerParam: {},
        file: null,
        fileList: [],
        uploadFile: [], // 需要上传的 重对账 end
        handleFundDialog: false,
        handleShow: false // 手工对账 展现隐藏
    }
}

