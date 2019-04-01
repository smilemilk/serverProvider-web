import {parseTime, moneyFormat} from '@/filters';
import {directionStatistics} from '@/filters/statistics';
import extendHospital from '../checkReportDetail/tableExpend/expendHospital';
import extendApp_hospital from '../checkReportDetail/tableExpend/expendApp_hospital';
import extendApp_fund from '../checkReportDetail/tableExpend/expendApp_fund';
import extendFund from '../checkReportDetail/tableExpend/expendFund';

export default function () {
    return {
        dateSearch: '',
        loading: true,
        total: 0,
        queryParams: {
            checkOrderNo: '',
            autoCheckStatus: '',
            page: 1, // 页数
            limit: 10 // 一页几条
        },
        dataList: [],
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
                title: '应用账单',
                align: 'center',
                children: [
                    {
                        title: '对应医院账单',
                        align: 'center',
                        render: (h, params) => {
                            return h(extendApp_hospital, {
                                props: {
                                    rowTemp: params.row
                                }
                            });
                        }
                    },
                    {
                        title: '对应资金账单',
                        align: 'center',
                        render: (h, params) => {
                            return h(extendApp_fund, {
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
            }
        ]
    }
}

