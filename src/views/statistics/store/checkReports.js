import {parseTime, moneyFormat} from '@/filters';
import {directionStatistics} from '@/filters/statistics';
import {sourceType} from './filters';

export default function () {
    return {
        dateSearch: '',
        queryParams_app: {
            checkOrderNo: '',
            indexCodeGroup: '',
            indexGroup: ''
        },
        queryParams_fund: {
            checkOrderNo: '',
            indexCodeGroup: '',
            indexGroup: ''
        },
        hisList: [], // his交易
        businessList: [], // 应用交易数据
        fundList: [], // 资金
        pieCount_app: [],
        pieAmount_app: [],
        pieCount_fund: [],
        pieAmount_fund: []
    }
}

