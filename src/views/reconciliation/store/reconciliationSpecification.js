import {parseTime, moneyFormat} from '@/filters';
import {reconciliationStatus} from '@/filters/statistics';
import extendApp from '../reconciliationSpecification/tableExpend/expendApp';

export default function () {
    return {
        dateSearch: '',
        loading: true,
        tableHeight: null,
        noneText: "暂无数据",
        filterText: "暂无筛选结果",
        queryParams: {
            startDate: '',
            endDate: '',
            requestIndexList : [
            {
                "index_type": "0",
                "index_group": "HIS",
                "index_code": "BusinessHISSumAmount"
            },
            {
                "index_type": "0",
                "index_group": "财务调账",
                "index_code": "BusinessHISSumAmount"
            },
            {
                "index_type": "0",
                "index_code": "HangBillChangeTotalSumAmount"
            },
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

        columnKeys : ["BusinessHISSumAmount","BusinessAdjustSumAmount","BusinessHangFallTotalAmount"]
    }
}

