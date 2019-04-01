<template>
    <div>
        <title-item text="对账统计" sizeType="small"></title-item>
        <Card class="searchBox margin-top-10">
            <Row>
                <Col span="16" style="height: 32px; line-height: 32px;">
                    <span>日期:</span>
                    <time>{{dateSearch}}</time>
                </Col>
                <Col span="8">
                    <Button type="primary" class="margin-right-10" @click="checkReportDetailAction">查看详情</Button>
                </Col>
            </Row>
            <div class="report-container">
                <div>
                    <title-item text="HIS交易应收款" size-type="small" class="margin-top-10 margin-bottom-10"></title-item>
                    <his-table :list="hisList"></his-table>
                </div>
                <div class="margin-top-10">
                    <title-item text="应用交易情况" size-type="small" class="margin-top-20 margin-bottom-10"></title-item>
                    <app-table :list="businessList"></app-table>
                </div>
                <div>
                    <Row :gutter="20">
                        <Col span="12" :lg="12" :md="12" :sm="24" :xs="24"
                             class="margin-top-20">
                            <chart-pie style="min-height: 280px;"
                                       class="border-dash"
                                       :valuePie="pieCount_app"
                                       v-if="pieCount_app.length > 0"
                                       text="交易笔数情况"></chart-pie>
                        </Col>
                        <Col span="12" :lg="12" :md="12" :sm="24" :xs="24"
                             class="margin-top-20">
                            <chart-pie style="min-height: 280px;"
                                       class="border-dash"
                                       :valuePie="pieAmount_app"
                                       v-if="pieAmount_app.length > 0"
                                       text="交易金额情况"
                                       theme="blueLight"></chart-pie>
                        </Col>
                    </Row>
                </div>
                <div class="margin-top-10">
                    <title-item text="资金收款情况" size-type="small" class="margin-top-20 margin-bottom-10"></title-item>
                    <fund-table :list="fundList"></fund-table>
                </div>
                <div>
                    <Row :gutter="20">
                        <Col span="12" :lg="12" :md="12" :sm="24" :xs="24"
                             class="margin-top-20">
                            <chart-pie style="min-height: 280px;"
                                       class="border-dash"
                                       :valuePie="pieCount_fund"
                                       v-if="pieCount_fund.length > 0"
                                       text="资金笔数情况"></chart-pie>
                        </Col>
                        <Col span="12" :lg="12" :md="12" :sm="24" :xs="24"
                             class="margin-top-20">
                            <chart-pie style="min-height: 280px;"
                                       class="border-dash"
                                       :valuePie="pieAmount_fund"
                                       v-if="pieAmount_fund.length > 0"
                                       text="资金金额情况"
                                       theme="blueLight"></chart-pie>
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import storeData from './store/checkReports';
    import {parseTime, codefans_net_CC2PY} from '@/filters';
    // import {directionStatistics} from '@/filters/statistics';
    // import ajax from '@/api/statistics';
    import ajax from '@/api/reconciliation';
    import TitleItem from '_c/title/index';
    import {ChartPie} from '_c/chart/index';
    import HisTable from './checkReport/hisTable';
    import AppTable from './checkReport/appTable';
    import FundTable from './checkReport/fundTable';
    import _ from 'lodash';

    export default {
        name: 'check-report',
        components: {
            TitleItem,
            ChartPie,
            HisTable,
            AppTable,
            FundTable
        },
        data() {
            return Object.assign({}, storeData.call(this), {
                appNameArray: [],
                appNameList: [],
                fundNameArray: [],
                fundNameList: []
            });
        },
        created() {
            this.dateSearch = this.$route.query.startDate ? this.$route.query.startDate : "";

            this.asyncFetch();
        },
        mounted() {
        },
        methods: {
            getParams_app() {
                return new Promise((resolve, reject) => {
                    ajax.getAppList({
                        configType: '应用数据'
                    }).then(response => {

                        if (response.success === true) {
                            if (response.data) {
                                this.appNameArray = response.data.items.filter(it => {
                                    // if (it.configName !== '财务调账') {
                                    return it;
                                    // }
                                });
                                this.appNameList = this.appNameArray.map(it => {
                                    return it.configName;
                                });
                                const appNameList = this.appNameList;
                                return resolve(
                                    appNameList
                                );
                            } else {
                                return reject({});
                            }
                        } else {
                            this.$Message.error({
                                content: response.msg ? response.msg : '应用类型请求未成功',
                                duration: 2,
                                closable: true
                            });
                            return Promise.resolve({});
                        }
                    }).catch(() => {
                    });
                });
            },
            getParams_fund() {
                return new Promise((resolve, reject) => {
                    ajax.getAppList({
                        configType: '收款通道'
                    }).then(response => {
                        if (response.success === true) {
                            if (response.data) {
                                this.fundNameArray = response.data.items.filter(it => {
                                    // if (it.configName !== '财务调账') {
                                    return it;
                                    // }
                                });
                                this.fundNameList = this.fundNameArray.map(it => {
                                    return it.configName;
                                });
                                const fundNameList = this.fundNameList;
                                return resolve(fundNameList);
                            } else {
                                return reject({});
                            }
                        } else {
                            this.$Message.error({
                                content: response.msg ? response.msg : '资金类型请求未成功',
                                duration: 2,
                                closable: true
                            });
                        }
                    }).catch(() => {
                    });
                });
            },
            asyncFetch() {
                Promise.all([this.getParams_app(), this.getParams_fund()]).then(
                    (results) => {
                        let paramName = results[0].concat(results[1]);
                        this.getSummaryList(paramName);
                    }
                ).catch((e) => {
                    // console.log(e)
                })
            },
            getSummaryList(paramName) {
                let groupParam;
                groupParam =
                    [
                        "我方", // 我方
                        // "应用(汇总)", // 应用
                        // "资金通道(汇总)", // 资金
                        // "业务合计(汇总)"
                    ].concat(paramName);
                ajax.getSummaryList({
                    "startDate": this.dateSearch ? this.dateSearch.replace(/-/g, '') : '',
                    "endDate": this.dateSearch ? this.dateSearch.replace(/-/g, '') : '',
                    "codeList": [
                        "BusinessTotalAmount",
                        "BusinessTotalCount",
                        "TransactionTotalAmount", // 资金
                        "TransactionTotalCount" // 资金
                    ],
                    "groupList": groupParam
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.tableHeight = null;

                            let self = this;
                            let groups = {};
                            let lists = [];
                            if (response.data[0] && response.data[0].indexList) {
                                response.data[0].indexList.forEach(it => {
                                    let group = it["group"];

                                    let list = groups[group];

                                    if (list) {
                                        list.push(it);
                                    } else {
                                        groups[group] = [it];
                                    }
                                });

                                for (let group in groups) {
                                    let content = {}

                                    groups[group].forEach(kv => {
                                        content[kv.code] = kv.value;
                                        if (group === "我方") {
                                            content["name"] = "his交易";
                                        } else {
                                            content["name"] = group;
                                        }
                                    });
                                    lists.push(content);
                                }
                            }
                            let hisList = [];
                            let appList = [];
                            let fundList = [];
                            _.map(lists, function (it) {
                                if (it.name === 'his交易') {
                                    hisList.push(it);
                                }
                                if (self.appNameList.indexOf(it.name) > -1) {
                                    appList.push(it);
                                }
                                if (self.fundNameList.indexOf(it.name) > -1) {
                                    fundList.push(it);
                                }
                            });
                            this.hisList = hisList;
                            this.businessList = appList;
                            this.fundList = fundList;

                            if (this.businessList) {
                                _.map(this.businessList, it=> {
                                    let item = {
                                        name: it.name,
                                        value: it.BusinessTotalAmount
                                    };
                                    let des = {
                                        name: it.name,
                                        value: it.BusinessTotalCount
                                    };
                                    this.pieAmount_app.push(item);
                                    this.pieCount_app.push(des);
                                });
                            } else {
                                this.pieCount_app = [];
                                this.pieAmount_app = [];
                            }

                            if (this.fundList) {
                                _.map(this.fundList, it=> {
                                    let item = {
                                        name: it.name,
                                        value: it.TransactionTotalAmount
                                    };
                                    let des = {
                                        name: it.name,
                                        value: it.TransactionTotalCount
                                    };
                                    this.pieAmount_fund.push(item);
                                    this.pieCount_fund.push(des);
                                });
                            } else {
                                this.pieCount_fund = [];
                                this.pieAmount_fund = [];
                            }

                            this.loading = false;
                        } else {
                            this.hisList = [];
                            this.businessList = [];
                            this.fundList = [];
                            this.loading = false;
                            this.noneText = "暂无数据";
                        }
                    } else {
                        this.hisList = [];
                        this.businessList = [];
                        this.fundList = [];
                        this.loading = false;
                        this.noneText = "暂无数据";
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账日报请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.hisList = [];
                    this.businessList = [];
                    this.fundList = [];
                    this.noneText = "暂无数据";
                });
            },
            checkReportDetailAction() {
                let urlParam = {
                    checkOrderNo: this.$route.query.checkOrderNo || '',
                    date: this.$route.query.startDate || ''
                };
                this.$router.push({
                    name: 'checkDetail',
                    query: urlParam
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .tableBorder {
        table {
            width: 388px;
            border-sizing: border-box;
        }
    }

    @media screen and (max-height: 786px) {

    }
</style>
