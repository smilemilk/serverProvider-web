import {parseTime, moneyFormat} from '@/filters';
import {reconciliationStatus} from '@/filters/statistics';

export default function () {
    return {
        dateSearch: '',
        loading: true,
        tableHeight: 'auto',
        noneText: "暂无数据",
        filterText: "暂无筛选结果",
        queryParams: {
            startDate: '',
            endDate: '',
            requestIndexList : [
                {
                    "index_type": "0",
                    "index_group": "HIS",
                    "index_code": "BusinessHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_group": "HIS",
                    "index_code": "BusinessHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_group": "HIS",
                    "index_code": "BusinessHISSumAmount"
                },
                {
                    "index_type": "0",
                    "index_group": "财务调账",
                    "index_code": "BusinessHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_group": "财务调账",
                    "index_code": "BusinessHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_group": "财务调账",
                    "index_code": "BusinessHISSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessTotalSumAmount"
                }
            ]
        },
        dataList: [],
        columnsAppMap: [
                // {
                //     key: 'applicationReconciliateAmount',
                //     align: 'center',
                //     title: '账务调账',
                //     minWidth: 100,
                //     ellipsis: false,
                //     render: (h, params) => {
                //         return h('div', params.row.applicationReconciliateAmount ?
                //             moneyFormat(params.row.applicationReconciliateAmount / 100) : '--');
                //     }
                // },
                // {
                //     key: 'applicationHangAmount',
                //     align: 'center',
                //     title: '应用挂账合计',
                //     minWidth: 110,
                //     ellipsis: false,
                //     render: (h, params) => {
                //         return h('div', params.row.applicationHangAmount ?
                //             moneyFormat(params.row.applicationHangAmount / 100) : '--');
                //     }
                // },
        ],
        columnsTable: [
            {
                key: 'checkName',
                title: '对账期号|类目',
                align: 'center',
                minWidth: 98,
                ellipsis: false
            },
            {
                title: '业务对账明细(元)',
                align: 'center',
                children: [
                    {
                        key: 'businessAmount',
                        align: 'center',
                        title: '业务账',
                        render: (h, params) => {
                            return h('div', params.row.businessAmount ?
                                moneyFormat(params.row.businessAmount / 100) : '--');
                        },
                        minWidth: 100,
                        ellipsis: false
                    },
                    {
                        key: 'businessReconciliateAmount',
                        align: 'center',
                        title: '账户调账',
                        render: (h, params) => {
                            return h('div', params.row.businessReconciliateAmount ?
                                moneyFormat(params.row.businessReconciliateAmount / 100) : '--');
                        },
                        minWidth: 100,
                        ellipsis: false
                    },
                    {
                        key: 'businessHangAmount',
                        align: 'center',
                        title: '业务挂帐合计',
                        render: (h, params) => {
                            return h('div', params.row.businessHangAmount ?
                                moneyFormat(params.row.businessHangAmount / 100) : '--');
                        },
                        minWidth: 110,
                        ellipsis: false
                    },
                ]
            },
            {
                title: '应用对账明细(元)',
                align: 'center',
                children:
                    [
                    {
                        key: 'applicationReconciliateAmount',
                        align: 'center',
                        title: '账务调账',
                        minWidth: 100,
                        ellipsis: false,
                        render: (h, params) => {
                            return h('div', params.row.applicationReconciliateAmount ?
                                moneyFormat(params.row.applicationReconciliateAmount / 100) : '--');
                        }
                    },
                    {
                        key: 'applicationHangAmount',
                        align: 'center',
                        title: '应用挂账合计',
                        minWidth: 110,
                        ellipsis: false,
                        render: (h, params) => {
                            return h('div', params.row.applicationHangAmount ?
                                moneyFormat(params.row.applicationHangAmount / 100) : '--');
                        }

                    }
                ]
            },
            {
                title: '资金对账明细(元)',
                align: 'center',
                children: [
                    {
                        key: 'fundDetailAmount',
                        minWidth: 300,
                    },
                    {
                        key: 'fundHangAmount',
                        align: 'center',
                        title: '资金挂账合计',
                        render: (h, params) => {
                            return h('div', params.row.fundHangAmount ?
                                moneyFormat(params.row.fundHangAmount / 100) : '--');
                        },
                        minWidth: 110,
                        ellipsis: false,
                    },
                ]
            },
            {
                key: 'checkSuccessAmount',
                title: '(账平)合计',
                align: 'center',
                minWidth: 100,
                ellipsis: false,
                render: (h, params) => {
                    return h('div', params.row.checkSuccessAmount ?
                        moneyFormat(params.row.checkSuccessAmount / 100) : '--');
                }
            },
            {
                key: 'checkStatus',
                title: '数据状态',
                align: 'center',
                minWidth: 100,
                ellipsis: false,
                render: (h, params) => {
                    return h('div', params.row.checkStatus ?
                        reconciliationStatus(params.row.checkStatus) : '--');
                }
            }
        ],

        columnKeys : ["BusinessHISInAmount","BusinessHISOutAmount","BusinessHISSumAmount",
            "BusinessAdjustInAmount","BusinessAdjustOutAmount","BusinessAdjustSumAmount",
            "BusinessTotalSumAmount"],

        HISDetailHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: 'HIS账单(元)'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                content: '指院内HIS业务明细类目',
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
        fundDetailHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '资金账单(元)'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                content: '指资金渠道明细类目',
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
        HISBusinessHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: 'HIS业务'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                width: '380',
                                content: '院内业务新发生的本对账周期账单合计(收入-支出)',
                                trigger: 'hover',
                                placement: 'right'
                            },
                        },
                        [
                            h('i', {
                                class: ['iconfont', 'icon-question'],
                                style: {
                                    marginTop: '-2px',
                                    marginLeft: '0px',
                                    marginRight: '3px',
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
        HISTZHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '财务调账'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                width: '300',
                                content: '新增财务调账合计(收入-支出)',
                                trigger: 'hover',
                                placement: 'right'
                            },
                        },
                        [
                            h('i', {
                                class: ['iconfont', 'icon-question'],
                                style: {
                                    marginTop: '-2px',
                                    marginLeft: '0px',
                                    marginRight: '3px',
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
        businessHangHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '业务挂账变动合计'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                width: '550',
                                content: '院内业务账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                trigger: 'hover',
                                placement: 'right'
                            },
                        },
                        [
                            h('i', {
                                class: ['iconfont', 'icon-question'],
                                style: {
                                    marginTop: '-2px',
                                    marginLeft: '0px',
                                    marginRight: '3px',
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
        appHangHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '应用挂账变动合计'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                width: '550',
                                content: '各业务子系统账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                trigger: 'hover',
                                placement: 'right'
                            },
                        },
                        [
                            h('i', {
                                class: ['iconfont', 'icon-question'],
                                style: {
                                    marginTop: '-2px',
                                    marginLeft: '0px',
                                    marginRight: '3px',
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
        fundHangHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '资金挂账变动合计'

                        },
                        style: {
                            display: 'inline-block',
                        },
                    }),
                    h('Poptip', {
                            props: {
                                width: '550',
                                content: '各资金通道账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                trigger: 'hover',
                                placement: 'right'
                            },
                        },
                        [
                            h('i', {
                                class: ['iconfont', 'icon-question'],
                                style: {
                                    marginTop: '-2px',
                                    marginLeft: '0px',
                                    marginRight: '3px',
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
    }
}

