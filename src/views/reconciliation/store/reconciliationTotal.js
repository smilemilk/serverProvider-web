import {parseTime, moneyFormat} from '@/filters';
import {reconciliationStatus} from '@/filters/statistics';

export default function () {
    return {
        dateSearch: '',
        loading: true,
        total: 0,
        tableHeight: null,
        noneText: '暂无数据',
        filterText: '暂无筛选结果',
        queryParams: {
            startDate: '',
            endDate: '',
            requestIndexList : [{
                "index_type": "0",
                "index_code": "BusinessTotalInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessTotalOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessTotalSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillChangeTotalInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillChangeTotalOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillChangeTotalSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessTotalInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessTotalOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessTotalSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillChangeTotalInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillChangeTotalOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillChangeTotalSumAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionTotalInAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionTotalOutAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionTotalSumAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillChangeTotalInAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillChangeTotalOutAmount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillChangeTotalSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessTotalSumAmount"
                }
            ],

            responseFilterList : ["index_code","index_value"],
            groupBy : "check_order_no",
            needSummation : true,
        },
        dataList: [],
        columnsTable: [
            {
                key: 'checkDate',
                title: '对账期号|类目',
                align: 'center',
                minWidth: 98
            },
            {
                renderHeader: (h, index) => {
                    return h('div',
                        [
                            h('div', {
                                domProps: {
                                    innerHTML: '业务分类(元)'
                                },
                                style: {
                                    display: 'inline-block',
                                },
                            }),
                            h('Poptip', {
                                    props: {
                                        content: '指院内HIS业务类目',
                                        trigger: 'hover',
                                        placement: 'bottom-end'
                                    },
                                },
                                [
                                    h('i', {
                                        class: ['iconfont', 'icon-question'],
                                        style: {
                                            marginTop: '-2px',
                                            marginLeft: '5px',
                                            fontSize: '14px',
                                            color: '#2d8cf0',
                                            cursor: 'pointer',
                                            fontWeight: '400'
                                        }
                                    })
                                ])
                        ]
                    );
                },
                align: 'center',
                children: [
                    {
                        align: 'center',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期业务'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '院内业务系统新发生的本对账周期账单',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400'
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'businessInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block',
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.businessInAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'businessOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.businessOutAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'businessAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.businessAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        align: 'center',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期挂账变动'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '本期挂账数据发生的变动 挂账新增-挂账消除',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400'
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'businessHangInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.businessHangInAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat((item+"") / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat((item+"") / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'businessHangOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.businessHangOutAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'businessHangAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.businessHangAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                ]
            },
            {
                renderHeader: (h, index) => {
                    return h('div',
                            [
                            h('div', {
                                domProps: {
                                    innerHTML: '应用分类(元)'
                                },
                                style: {
                                    display: 'inline-block'
                                },
                            }),
                                h('Poptip', {
                                        props: {
                                            content: '各业务子系统类目',
                                            trigger: 'hover',
                                            placement: 'bottom-end'
                                        },
                                    },
                                    [
                                        h('i', {
                                            class: ['iconfont', 'icon-question'],
                                            style: {
                                                marginTop: '-2px',
                                                marginLeft: '5px',
                                                fontSize: '14px',
                                                color: '#2d8cf0',
                                                cursor: 'pointer',
                                                fontWeight: '400'
                                            }
                                        })
                                    ])
                            ]
                    );
                },
                align: 'center',
                children: [
                    {
                        key: 'businessAmount',
                        align: 'center',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期应用'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '各业务子系统新发生的本对账周期账单',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400'
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'applicationInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.applicationInAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'applicationOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.applicationOutAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'applicationAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.applicationAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        align: 'center',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期挂账变动'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '本期挂账数据发生的变动 挂账新增-挂账消除',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400'
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'applicationHangInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.applicationHangInAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'applicationHangOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.applicationHangOutAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'applicationHangAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.applicationHangAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                ]
            },
            {
                renderHeader: (h, index) => {
                    return h('div',
                        [
                            h('div', {
                                domProps: {
                                    innerHTML: '资金分类(元)'
                                },
                                style: {
                                    display: 'inline-block'
                                },
                            }),
                            h('Poptip', {
                                    props: {
                                        content: '指资金渠道类目',
                                        trigger: 'hover',
                                        placement: 'bottom-end'
                                    },
                                },
                                [
                                    h('i', {
                                        class: ['iconfont', 'icon-question'],
                                        style: {
                                            marginTop: '-2px',
                                            marginLeft: '5px',
                                            fontSize: '14px',
                                            color: '#2d8cf0',
                                            cursor: 'pointer',
                                            fontWeight: '400'
                                        }
                                    })
                                ])
                        ]
                    );
                },
                align: 'center',
                children: [
                    {
                        align: 'center',
                        title: '',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期资金'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '各资金渠道新发生的本对账周期账单',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400',
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'fundInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.fundInAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'fundOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.fundOutAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            },
                            {
                                key: 'fundAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let item = params.row.fundAmount;

                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat(item / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat(item / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        align: 'center',
                        renderHeader: (h, index) => {
                            return h('div',
                                [
                                    h('div', {
                                        domProps: {
                                            innerHTML: '本期挂账变动'
                                        },
                                        style: {
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('Poptip', {
                                            props: {
                                                content: '本期挂账数据发生的变动 挂账新增-挂账消除',
                                                trigger: 'hover',
                                                placement: 'right-end'
                                            },
                                        },
                                        [
                                            h('i', {
                                                class: ['iconfont', 'icon-question'],
                                                style: {
                                                    marginTop: '-2px',
                                                    marginLeft: '5px',
                                                    fontSize: '14px',
                                                    color: '#2d8cf0',
                                                    cursor: 'pointer',
                                                    fontWeight: '400'
                                                }
                                            })
                                        ])
                                ]
                            );
                        },
                        children: [
                            {
                                key: 'fundHangInAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为收入汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '收入'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.fundHangInAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'fundHangOutAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '方向为支出汇总',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '支出'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let status = params.row.checkStatus;
                                    let item = params.row.fundHangOutAmount;

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {
                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                key: 'fundHangAmount',
                                align: 'center',
                                renderHeader: (h, index) => {
                                    return h('div',
                                        [
                                            h('Poptip', {
                                                    props: {
                                                        content: '合计（收入汇总-支出汇总）',
                                                        trigger: 'hover',
                                                        placement: 'right-end'
                                                    },
                                                },
                                                [
                                                    h('div', {
                                                        domProps: {
                                                            innerHTML: '合计'
                                                        },
                                                        style: {
                                                            display: 'inline-block'
                                                        },
                                                    })
                                                ])
                                        ]
                                    );
                                },
                                minWidth: 100,
                                render: (h, params) => {
                                    let date = params.row.checkDate;
                                    let item = params.row.fundHangAmount;
                                    let status = params.row.checkStatus;

                                    // if (date === '汇总') {
                                    //     if (item > 0 && item !== null) {
                                    //         return h('div', '+' + moneyFormat(item / 100));
                                    //     } else if (item < 0 && item !== null) {
                                    //         return h('div', moneyFormat(item / 100));
                                    //     } else {
                                    //         if (item === 0 || item === "0") {
                                    //             return h('div', '0.00');
                                    //         } else {
                                    //             return h('div', '--');
                                    //         }
                                    //     }
                                    // }

                                    if (status === 0 || status === '0' ||
                                        status === 1 || status === '1' ||
                                        status === 2 || status === '2' ||
                                        status === 3 || status === '3' ||
                                        status === 4 || status === '4' ||
                                        status === 5 || status === '5' ||
                                        (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                        return h('div', '--');
                                    }
                                    if (status === 6 || status === '6') {

                                        if (item > 0 && item !== null) {
                                            return h('div', '+' + moneyFormat(item / 100));
                                        } else if (item < 0 && item !== null) {
                                            return h('div', moneyFormat(item / 100));
                                        } else {
                                            if (item === 0 || item === "0") {
                                                return h('div', '0.00');
                                            } else {
                                                return h('div', '--');
                                            }
                                        }
                                    }
                                    // 挂账和对账汇总逻辑
                                    if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                        if (this.hideStatus === true) {
                                            return h('div', '--');
                                        } else {
                                            if (item > 0 && item !== null) {
                                                return h('div', '+' + moneyFormat((item+"") / 100));
                                            } else if (item < 0 && item !== null) {
                                                return h('div', moneyFormat((item+"") / 100));
                                            } else {
                                                if (item === 0 || item === "0") {
                                                    return h('div', '0.00');
                                                } else {
                                                    return h('div', '--');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                ]
            },
            {
                title: '对账合计(元)',
                align: 'center',
                children: [
                    {
                        key: 'checkSuccessAmount',
                        align: 'center',
                        title: '(对账通过)合计',
                        minWidth: 100,
                        render: (h, params) => {
                            let status = params.row.checkStatus;
                            let item = params.row.checkSuccessAmount;

                            if (status === 0 || status === '0' ||
                                status === 1 || status === '1' ||
                                status === 2 || status === '2' ||
                                status === 3 || status === '3' ||
                                status === 4 || status === '4' ||
                                status === 5 || status === '5' ||
                                (status === ''&& params.row.checkDate !== '汇总') || (status === null&&params.row.checkDate !== '汇总')) {
                                return h('div', '--');
                            }
                            if (status === 6 || status === '6') {
                                if (item > 0 && item !== null) {
                                    return h('div', '+' + moneyFormat(item / 100));
                                } else if (item < 0 && item !== null) {
                                    return h('div', moneyFormat(item / 100));
                                } else {
                                    if (item === 0 || item === "0") {
                                        return h('div', '0.00');
                                    } else {
                                        return h('div', '--');
                                    }
                                }
                            }
                            // 挂账和对账汇总逻辑
                            if ((status === ''&& params.row.checkDate === '汇总') || (status === null&&params.row.checkDate === '汇总')) {
                                if (this.hideStatus === true) {
                                    return h('div', '--');
                                } else {
                                    if (item > 0 && item !== null) {
                                        return h('div', '+' + moneyFormat((item+"") / 100));
                                    } else if (item < 0 && item !== null) {
                                        return h('div', moneyFormat((item+"") / 100));
                                    } else {
                                        if (item === 0 || item === "0") {
                                            return h('div', '0.00');
                                        } else {
                                            return h('div', '--');
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        key: 'checkStatus',
                        align: 'center',
                        title: '对账状态',
                        minWidth: 70,
                        render: (h, params) => {
                            if (params.row.checkDate === '汇总') {
                                return h('div', '');
                            } else {
                                return h('div', params.row.checkStatus ?
                                    reconciliationStatus(params.row.checkStatus) : '--');
                            }
                        }
                    }
                ]
            }
        ],

        columnsKey : [
            'checkDate','businessInAmount','businessOutAmount','businessAmount','businessHangInAmount',
            'businessHangOutAmount','businessHangAmount','applicationInAmount','applicationOutAmount',
            'applicationAmount', 'applicationHangInAmount','applicationHangOutAmount','applicationHangAmount','fundInAmount',
            'fundOutAmount', 'fundAmount','fundHangInAmount','fundHangOutAmount','fundHangAmount',
            'checkSuccessAmount','checkStatus']
    }
}

