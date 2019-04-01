export default function () {
    return {
        dateSearch: '',
        dateMonth: '',
        loading: true,
        total: 0,
        queryParams_month: {
            monthDate: ''
        },
        spinShow: true,
        queryParams_month_pre: {
            monthDate: ''
        },
        monthSummary_current: {},
        monthSummary_pre: {},
        monthDetail_current: [],
        legendNames: [],
        yAxisItems: [],
        seriesHis: [],
        multiStatus: true,
        lineData_x: [],
        lineData_y_account: [],
        lineData_y_trade: [],
        lineData_y_deal: [],
        pieAmount_app: [],
        pieAmount_fund: []
    }
}

