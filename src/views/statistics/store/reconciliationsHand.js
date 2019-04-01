import {parseTime, moneyFormat} from '@/filters';
import {autoCheckStatus} from '@/filters/statistics';
import extendHospital from '../reconciliationsHand/tableExpend/expendHospital';
import extendBusiness_hospital from '../reconciliationsHand/tableExpend/expendBusiness_hospital';
import extendBusiness_fund from '../reconciliationsHand/tableExpend/expendBusiness_fund';
import extendFund from '../reconciliationsHand/tableExpend/expendFund';

export default function () {
    return {
        dateHandSearch: '',
        loading: true,
        tableHeight: 320,
        total: 0,
        queryParams: {
            checkOrderNo: 0,
            autoCheckStatus: 3,
            page: 1, // 页数
            limit: 10 // 一页几条
        },
        dataList: [],
        uploadUrl: '',
        columnsTable: [
            {
                key: 'autoCheckNo',
                title: '编号',
                align: 'center',
                width: 150,
            },
            {
                title: '医院账单',
                align: 'center',
                render: (h, params) => {
                    return h(extendHospital, {
                        props: {
                            rowTemp: params.row
                        }
                    });
                }
            },
            {
                title: '业务系统账单',
                align: 'center',
                children: [
                    {
                        key: '',
                        align: 'center',
                        title: '对应医院账单',
                        render: (h, params) => {
                            return h(extendBusiness_hospital, {
                                props: {
                                    rowTemp: params.row
                                }
                            });
                        }
                    },
                    {
                        key: '',
                        align: 'center',
                        title: '对应资金账单',
                        render: (h, params) => {
                            return h(extendBusiness_fund, {
                                props: {
                                    rowTemp: params.row
                                }
                            });
                        }
                    },
                ]
            },
            {
                title: '资金通道账单',
                align: 'center',
                render: (h, params) => {
                    return h(extendFund, {
                        props: {
                            rowTemp: params.row
                        }
                    });
                }
            },
            {
                title: '自动对账结果',
                align: 'center',
                render: (h, params) => {
                    let itemStatus = params.row.autoCheckStatus;
                    let item = params.row.autoCheckResult;
                    return h('div',[
                        h('p', autoCheckStatus(itemStatus)),
                        h('p', {
                            class: 'dark'},
                            item
                        )
                        ]
                    );
                }
            }
        ]
    }
}

