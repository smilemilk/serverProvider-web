import {parseTime, moneyFormat} from '@/filters';
import {directionStatistics, billStatus, handleStatus, handleProcess} from '@/filters/statistics';

export default function () {
    return {
        dateSearch: '',
        billTypeList: [
            {id: "all", value: "全部"},
            {id: "0", value: "HIS账单"},
            {id: "2", value: "应用账单"},
            {id: "1", value: "资金账单"},
            {id: "3", value: "应用业务账单"},
            {id: "4", value: "应用资金账单"}
        ],
        directionList: [
            {id: "all", value: "全部"},
            {id: "1", value: "收入"},
            {id: "0", value: "支出"}
        ],
        dealTypeList: [
            {id: "all", value: "全部"},
            {id: "1", value: "账单挂起"},
            {id: "2", value: "调账"},
            {id: "3", value: "参与对账"}
        ],
        loading: true,
        queryParams: {
            startDate: '',
            endDate: '',
            billType: '',
            direction: '',
            dealType: ''
        },
        noneText: '',
        dataList: [],
        columnsTable: [
            {
                key: '',
                title: '序号',
                align: 'center',
                minWidth: 20,
                render: (h, params) => {
                    return h ('div', params.row.indexNo ?
                        params.row.indexNo : '--');
                }
            },
            {
                key: 'id',
                title: '挂账操作记录编号',
                align: 'center',
                minWidth: 90,
                render: (h, params) => {
                    return h ('div', params.row.id ?
                        params.row.id : '--');
                }
            },
            {
                key: 'billType',
                title: '账单类型',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h ('div', params.row.billType ?
                        billStatus(params.row.billType) : '--');
                }
            },
            {
                key: 'dataSourceId',
                title: '对账记录编号',
                align: 'center',
                minWidth: 90,
                render: (h, params) => {
                    return h ('div', params.row.dataSourceId ?
                        params.row.dataSourceId : '--');
                }
            },
            {
                key: 'direction',
                title: '方向',
                align: 'center',
                minWidth: 50,
                render: (h, params) => {
                    return h ('div', params.row.direction ?
                        directionStatistics(params.row.direction) : '--');
                }
            },
            {
                key: 'amount',
                title: '金额(元)',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', params.row.amount ?
                        moneyFormat(params.row.amount/100) : '--');
                }
            },
            {
                key: 'dealCheckOrderName',
                title: '处理对账期号',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', params.row.dealCheckOrderName ?
                        params.row.dealCheckOrderName : '--')
                }
            },
            {
                key: 'dealType',
                title: '处理类型',
                align: 'center',
                minWidth: 50,
                render: (h, params) => {
                    return h('div', params.row.dealType ?
                        handleStatus(params.row.dealType) : '--')
                }
            },
            {
                key: 'dealTime',
                title: '处理时间',
                align: 'center',
                minWidth: 80,
                render: (h, params) => {
                    return h('div', params.row.dealTime ?
                        parseTime(params.row.dealTime, '{y}-{m}-{d}') : '--')
                }
            },
            {
                key: 'dealProcess',
                title: '处理程序',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h('div', params.row.dealProcess ?
                        handleProcess(params.row.dealProcess) : '--')
                }
            },
            {
                key: 'operName',
                title: '操作人',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h ('div', params.row.operName ?
                        params.row.operName : '--');
                }
            },
            {
                key: 'remark',
                title: '备注',
                align: 'center',
                minWidth: 60,
                render: (h, params) => {
                    return h ('div', params.row.remark ?
                        params.row.remark : '--');
                }
            }
        ]
    }
}

