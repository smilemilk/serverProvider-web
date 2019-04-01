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
            checkDate: '',
        },
        dataList: [],
        loading_count: true,
        noneText_count: "暂无数据",
        filterText_count: "暂无筛选结果",
        dataList_count: [],
        sourceList: [],
        businessAmountParams : {
            startDate : '',
            endDate :  '',
            requestIndexList : [
                {
                     "index_type": "0",
                     "index_code": "BusinessHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessHISSumAmount"
                },

                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISSumAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISInAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISOutAmount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISSumAmount"
                }
    ],
            responseFilterList :  ["index_type","index_group","index_code","index_value"],
            groupBy :  "index_group",
            needSummation:  true
        },

        applicationAmountParams : {
            startDate : '',
            endDate : '',
            requestIndexList: [
                {
                    "index_type": "3",
                    "index_code": "BusinessInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessSumAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorInAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorOutAmount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorSumAmount"
                }
            ],
            responseFilterList : ["index_type", "index_group", "index_code", "index_value"],
            groupBy : "index_group",
            needSummation : true
        },

        transactionAmountParams : {
            startDate : '',
            endDate : '',
            requestIndexList : [
        {
            "index_type": "1",
            "index_code": "TransactionInAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionOutAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionSumAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillRemoveInAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillRemoveOutAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillRemoveSumAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillAddInAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillAddOutAmount"
        },
        {
            "index_type": "1",
            "index_code": "HangBillAddSumAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionSuccessInAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionSuccessOutAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionSuccessSumAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionErrorInAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionErrorOutAmount"
        },
        {
            "index_type": "1",
            "index_code": "TransactionErrorSumAmount"
        }
    ],
            responseFilterList : ["index_type", "index_group", "index_code", "index_value"],
            groupBy : "index_group",
            needSummation : true
        },

        amountColumnKeys : ["keyIndex","groupName",
            "CurrentInAmount","CurrentOutAmount","CurrentSumAmount",
            "HangBillRemoveInAmount","HangBillRemoveOutAmount","HangBillRemoveSumAmount",
            "HangBillAddInAmount","HangBillAddOutAmount","HangBillAddSumAmount",
            "SuccessInAmount","SuccessOutAmount","SuccessSumAmount",
            "ErrorInAmount","ErrorOutAmount","ErrorSumAmount"
        ],

        businessCountParams : {
            startDate : '',
            endDate :  '',
            requestIndexList : [
                {
                    "index_type": "0",
                    "index_code": "BusinessHISInCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessHISOutCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessHISSumCount"
                },

                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISInCount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISOutCount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillRemoveHISSumCount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISInCount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISOutCount"
                },
                {
                    "index_type": "0",
                    "index_code": "HangBillAddHISSumCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISInCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISOutCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessSuccessHISSumCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISInCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISOutCount"
                },
                {
                    "index_type": "0",
                    "index_code": "BusinessErrorHISSumCount"
                }
            ],
            responseFilterList :  ["index_type","index_group","index_code","index_value"],
            groupBy :  "index_group",
            needSummation:  true
        },

        applicationCountParams : {
            startDate : '',
            endDate : '',
            requestIndexList: [
                {
                    "index_type": "3",
                    "index_code": "BusinessInCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessOutCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSumCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveInCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveOutCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillRemoveSumCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddInCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddOutCount"
                },
                {
                    "index_type": "3",
                    "index_code": "HangBillAddSumCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessInCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessOutCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessSuccessSumCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorInCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorOutCount"
                },
                {
                    "index_type": "3",
                    "index_code": "BusinessErrorSumCount"
                }
            ],
            responseFilterList : ["index_type", "index_group", "index_code", "index_value"],
            groupBy : "index_group",
            needSummation : true
        },

        transactionCountParams : {
            startDate : '',
            endDate : '',
            requestIndexList : [
                {
                    "index_type": "1",
                    "index_code": "TransactionInCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionOutCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionSumCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillRemoveInCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillRemoveOutCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillRemoveSumCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillAddInCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillAddOutCount"
                },
                {
                    "index_type": "1",
                    "index_code": "HangBillAddSumCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionSuccessInCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionSuccessOutCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionSuccessSumCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionErrorInCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionErrorOutCount"
                },
                {
                    "index_type": "1",
                    "index_code": "TransactionErrorSumCount"
                }
            ],
            responseFilterList : ["index_type", "index_group", "index_code", "index_value"],
            groupBy : "index_group",
            needSummation : true
        },

        countColumnKeys : ["keyIndex","groupName",
            "CurrentInCount","CurrentOutCount","CurrentSumCount",
            "HangBillRemoveInCount","HangBillRemoveOutCount","HangBillRemoveSumCount",
            "HangBillAddInCount","HangBillAddOutCount","HangBillAddSumCount",
            "SuccessInCount","SuccessOutCount","SuccessSumCount",
            "ErrorInCount","ErrorOutCount","ErrorSumCount"
        ],
        billHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '本期账单(元)'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '对账结果(元)'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationHisHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '历史挂账消除'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationAddHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '本期新增挂账'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationSuccessHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '本期对账已通过'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationErrorHeader(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '待处理异常账单'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        billHeader_count(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '本期账单(笔)'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
        reconciliationHeader_count(h) {
            return h('div', {
                    class: ['mine-tableCell']
                },
                [
                    h('div', {
                        domProps: {
                            innerHTML: '对账结果(笔)'
                        },
                        style: {
                            display: 'inline-block',
                        },
                    })
                ]
            );
        },
    }
}

