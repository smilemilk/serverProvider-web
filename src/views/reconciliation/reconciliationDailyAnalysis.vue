<template>
    <div class="home-container">
        <div class="homeBox">
            <Card class="searchBox">
                <Row>
                    <Col span="24">
                        <Form
                                ref="queryParams" :model="queryParams"
                                inline :label-width="0"
                                label-position="left"
                                class="margin-bottom-0">
                            <FormItem prop="dateSearch">
                                <DatePicker v-if="finishStatus && finishStatus==='1'"
                                            v-model="dateSearch"
                                            format="yyyy-MM-dd"
                                            type="date"
                                            placement="bottom-start"
                                            placeholder="选择日期"
                                            style="width: 120px"
                                            :clearable="false"
                                            :options="endTimeOptions"
                                            :disabled="true"
                                            :readonly="true"
                                ></DatePicker>
                                <DatePicker v-else
                                            v-model="dateSearch"
                                            format="yyyy-MM-dd"
                                            type="date"
                                            placement="bottom-start"
                                            placeholder="选择日期"
                                            style="width: 120px"
                                            :clearable="false"
                                            :options="endTimeOptions"
                                            @on-change="dateChange"
                                ></DatePicker>
                            </FormItem>
                            <FormItem v-if="!finishStatus || (finishStatus && finishStatus!=='1')">
                                <Button-group shape="circle">
                                    <i-button type="ghost" @click="datePreAction">
                                        <Icon type="chevron-left normal"></Icon>
                                        上一天
                                    </i-button>
                                    <i-button type="ghost"
                                              @click="dateNextAction"
                                              :disabled="disabledDayStatus"
                                    >
                                        下一天
                                        <Icon type="chevron-right normal"></Icon>
                                    </i-button>
                                </Button-group>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <h3 class="margin-top-20 hTitle">对账日报表
                    <code v-if="this.queryParams.checkDate">{{this.queryParams.checkDate}}</code>
                    <p v-if="messageHint" style="font-size: 14px;
                    font-weight: 300; margin-top: 2px;">{{messageHint}}</p>
                </h3>
                <total-account-info
                        class="margin-top-20"
                        :summary-list="summaryInfo"
                ></total-account-info>
                <top-range
                        :top_app="topRange_app"
                        :top_fund="topRange_fund"
                ></top-range>
                <Row :gutter="16" class="padding-top-20">
                    <Col span="12" :xs="24" :sm="24" :md="24" :lg="12">
                        <chart-pie v-if="pieAmount_app.length > 0"
                                   style="min-height: 350px;"
                                   :valuePie="pieAmount_app"
                                   :legendStatus="false"
                                   radius="40%"
                                   centerY="57%"
                                   text="院内系统收入分布(元)"
                                   class="border-dash padding-top-10"
                        ></chart-pie>
                        <chart-spin
                                :noneList="pieListStatus_app"
                                :fetchStatus="pieFetch_app"></chart-spin>
                    </Col>
                    <Col span="12" :xs="24" :sm="24" :md="24" :lg="12">
                        <chart-pie v-if="pieAmount_fund.length > 0"
                                   style="min-height: 350px;"
                                   :valuePie="pieAmount_fund"
                                   :legendStatus="false"
                                   radius="40%"
                                   centerY="57%"
                                   text="资金通道收入占比(元)"
                                   class="border-dash padding-top-10"
                        ></chart-pie>
                        <chart-spin
                                :noneList="pieListStatus_fund"
                                :fetchStatus="pieFetch_fund"></chart-spin>
                    </Col>
                </Row>
                <title-item text="各应用对比图" sizeType="small"></title-item>
                <Row>
                    <Col span="24"
                         v-if="barApp_x.length > 0">
                        <ul class="line-legend">
                            <li>
                                <i></i>充值业务
                            </li>
                            <li>
                                <i></i>提现业务
                            </li>
                            <li>
                                <i></i>支付业务
                            </li>
                            <li>
                                <i></i>财务调账
                            </li>
                        </ul>
                    </Col>
                    <Col span="24" class="border-bottom-dash">
                        <chart-bar-multi
                                v-if="barApp_x.length > 0"
                                style="width: 98%; min-height: 350px;"
                                :xAxisData="barApp_x"
                                :legendData="legendNames_app"
                                :multiStatus="multiStatusBar"
                                :yAxisItems="yAxis_app"
                                :seriesItems="series_app"
                        ></chart-bar-multi>
                        <chart-spin
                                :noneList="barListStatus"
                                :fetchStatus="barFetch"></chart-spin>
                    </Col>
                </Row>
                <title-item text="订单24小时分布图" sizeType="small"></title-item>
                <Row>
                    <Col span="24"
                         v-if="lineData_hours.length > 0">
                        <ul class="line-legend">
                            <li>
                                <i></i>金额
                            </li>
                            <li>
                                <i></i>笔数
                            </li>
                        </ul>
                    </Col>
                    <Col span="24" class="border-bottom-dash">
                        <chart-line-multi
                                v-if="lineData_hours.length > 0"
                                style="width: 100%; min-height: 350px;"
                                :xAxisData="lineData_hours"
                                :legendData="legendNames_hours"
                                :multiStatus="multiStatusHours"
                                :yAxisItems="yAxis_hours"
                                :seriesItems="series_hours"
                        ></chart-line-multi>
                        <chart-spin
                                :noneList="lineHoursStatus"
                                :fetchStatus="lineHoursFetch"></chart-spin>
                    </Col>
                </Row>
                <title-item text="交易金额区间分布" sizeType="small"></title-item>
                <Row>
                    <Col span="24"
                         v-if="lineData_amounts.length > 0">
                        <ul class="line-legend">
                            <li>
                                <i></i>笔数
                            </li>
                        </ul>
                    </Col>
                    <Col span="24" class="border-bottom-dash">
                        <chart-line-multi
                                v-if="lineData_amounts.length > 0"
                                style="width: 100%; min-height: 350px;"
                                :xAxisData="lineData_amounts"
                                :legendData="legendNames_amounts"
                                :seriesData="lineAmounts_count"
                                :multiStatus="multiStatusAmounts"
                                :yAxisItems="yAxis_amounts"
                                :seriesItems="series_amounts"
                        ></chart-line-multi>
                        <chart-spin
                                :noneList="lineAmountsStatus"
                                :fetchStatus="lineAmountsFetch"></chart-spin>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/reconciliationDailyAnalysis';
    import TotalAccountInfo from './reconciliationDailyAnalysis/totalAccountInfo'
    import TopRange from './reconciliationDailyAnalysis/topRange';
    import {ChartPie, ChartBarMulti, ChartLineMulti, ChartSpin} from '_c/chart/index';
    import ajax from '@/api/reconciliation';
    import {parseTime} from '@/filters';
    import TitleItem from '_c/title/index';
    import {getDays} from '@/libs/common';

    export default {
        name: 'reconciliation-daily-analysis',
        components: {
            TitleItem,
            TotalAccountInfo, // 平台金额总览
            TopRange, // top5排行
            ChartPie,
            ChartBarMulti,
            ChartLineMulti,
            ChartSpin
        },
        data() {
            return Object.assign({},
                storeData.call(this),
                {
                    pieFetch_app: false,
                    pieListStatus_app: [],
                    pieFetch_fund: false,
                    pieListStatus_fund: [],
                    orderSearch: '',
                    disabledDayStatus: undefined,
                    legendNames_app: ['净收入金额', '交易笔数'],
                    barListStatus: [],
                    barFetch: false,
                    multiStatusBar: true,
                    lineData_hours: [],
                    legendNames_hours: ['金额', '笔数'],
                    lineHoursStatus: [],
                    lineHoursFetch: false,
                    multiStatusHours: true,
                    yAxis_hours: [],
                    series_hours: [],
                    lineHours_y_amount: [],
                    lineHours_y_count: [],
                    lineAmountsStatus: [],
                    lineAmountsFetch: false,
                    multiStatusAmounts: false,
                    lineData_amounts: [],
                    lineAmounts_count: [],
                    yAxis_amounts: [],
                    series_amounts: [],
                    legendNames_amounts: ['笔数'],
                    finishStatus: '', // 已归档和未归档 页面和逻辑区分关键值
                    endTimeOptions: {
                        disabledDate: date => {
                            return date && date.valueOf() > Date.now();
                        }
                    },
                    messageHint: ''
                });
        },
        created() {
            if (this.$route.query && this.$route.query.date) {
                this.dateSearch = this.$route.query.date;
            } else {
                this.dateSearch = parseTime(new Date(), "{y}-{m}-{d}");
            }
            if (this.dateSearch) {
                // 通过上个页面跳转对比今日和选中的日期
                const currentDate = parseTime(new Date(), "{y}-{m}-{d}");
                if (currentDate === this.dateSearch) {
                    this.disabledDayStatus = true;
                } else {
                    this.disabledDayStatus = false;
                }

                if (this.$route.query && this.$route.query.status && this.$route.query.status === 'finish') {
                    this.finishStatus = '1';
                }

                this.queryParams.checkDate = this.dateSearch.replace(/-/g, "");
                this.getAllAmount();
                this.getAPPFundDetail();
                this.getHoursFetch();
                this.getAmountRangeFetch();
            }
        },
        watch: {
            "dateSearch": function (val, pre) {
                let currentTime = new Date();
                if (pre && (val !== pre)) {
                    if (new Date(val) < currentTime) {
                        if (parseTime(val, "{y}-{m}-{d}") === parseTime(new Date(), "{y}-{m}-{d}")) {
                            this.disabledDayStatus = true;
                        } else {
                            this.disabledDayStatus = false;
                        }
                    } else {
                        this.disabledDayStatus = true;
                    }
                }
            }
        },
        methods: {
            dateChange(val) {
                if (val) {
                    this.getDayAsset(val);
                } else {
                    this.queryParams.checkDate = "";
                }
            },
            getListMessage(time) {
                // this.$Message.success({
                //     render: h => {
                //         return h('p', [
                //             '查询' +
                //             time + '对账日报分析'
                //         ]);
                //     },
                //     duration: .6,
                //     closable: true
                // });
                this.getPie_appReset();
                this.getPie_fundReset();
                this.getBar_appReset();
                this.getLine_hoursReset();
                this.getLine_amountsReset();
                this.getAllAmount();
                this.getAPPFundDetail();
                this.getHoursFetch();
                this.getAmountRangeFetch();
            },
            datePreAction() {
                if (this.dateSearch) {
                    let preDate = parseTime(new Date(new Date(this.dateSearch) - 24 * 60 * 60 * 1000), "{y}-{m}-{d}");
                    if (preDate) {
                        this.dateSearch = preDate;
                        this.queryParams.checkDate = preDate.replace(/-/g, "");
                        this.getListMessage(preDate);
                    }
                } else {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '请先选择日期，日期切换快捷键暂不可用！'
                            ]);
                        },
                        duration: .6,
                        closable: true
                    });
                }
            },
            dateNextAction() {
                if (this.dateSearch) {
                    let nextDate = parseTime(new Date(new Date(this.dateSearch) - (-24 * 60 * 60 * 1000)), "{y}-{m}-{d}");
                    if (nextDate) {
                        this.dateSearch = nextDate;
                        this.queryParams.checkDate = nextDate.replace(/-/g, "");
                        this.getDayAsset(nextDate);
                    }
                } else {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '请先选择日期，日期切换快捷键暂不可用！'
                            ]);
                        },
                        duration: .6,
                        closable: true
                    });
                }
            },
            getDayAsset(val) {
                let dateSearchFormat = new Date(val.replace(/\-/g, "\/"));
                let dateCurrentFormat = new Date();
                if (dateSearchFormat > dateCurrentFormat) {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '查看的月份晚于，当下月份，请重新选择！'
                            ])
                        },
                        duration: .6,
                        closable: true
                    });
                } else {
                    this.queryParams.checkDate = val.replace(/-/g, "");
                    this.dateSearch = val;
                    this.getListMessage(val);
                }
            },
            getAllAmount() {
                ajax.dailySummaryInfo(this.queryParams).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.messageHint = '';
                            let res = {};

                            for (let i in response.data) {
                                res[i] = response.data[i] + '';
                            }
                            this.summaryInfo = res;
                        } else {
                            this.summaryInfo = {};
                        }
                    } else {
                        this.summaryInfo = {};

                        if (response.msg.indexOf('不存在') > -1) {
                            this.messageHint = '未对账';
                        } else {
                            this.$Message.error({
                                content: response.msg ? response.msg : '日报表金额汇总请求未成功',
                                duration: .6,
                                closable: true
                            });
                            this.messageHint = '';
                        }
                    }
                }).catch(() => {
                    this.messageHint = '';
                });
            },
            getAPPFundDetail() {
                this.getAPPFundFetch_app();
                this.getAPPFundFetch_fund();
            },
            getAPPFundFetch_app() {
                ajax.dailyCheckAppFund({
                    checkDate: this.dateSearch.replace(/-/g, ""),
                    ownerType: 'App' // App,Fund
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.topRange_app = response.data;
                            this.getPie_app(response.data);
                            this.getBar_app(response.data);
                        } else {
                            this.barFetch = true;
                            this.topRange_app = [];
                            this.barListStatus = [];
                            this.pieFetch_app = true;
                            this.pieListStatus_app = [];
                        }
                    } else {
                        this.barFetch = true;
                        this.topRange_app = [];
                        this.barListStatus = [];
                        this.pieFetch_app = true;
                        this.pieListStatus_app = [];
                        // this.$Message.error({
                        //     content: response.msg ? response.msg : '应用信息请求未成功',
                        //     duration: 2,
                        //     closable: true
                        // });
                    }
                }).catch(() => {
                });
            },
            getAPPFundFetch_fund() {
                ajax.dailyCheckAppFund({
                    checkDate: this.dateSearch.replace(/-/g, ""),
                    ownerType: 'Pay' // App,Pay
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.topRange_fund = response.data;
                            this.getPie_fund(response.data);
                        } else {
                            this.barListStatus = [];
                            this.barFetch = true;
                            this.topRange_fund = [];
                            this.pieFetch_fund = true;
                            this.pieListStatus_fund = [];
                        }
                    } else {
                        this.barListStatus = [];
                        this.barFetch = true;
                        this.topRange_fund = [];
                        this.pieFetch_fund = true;
                        this.pieListStatus_fund = [];
                        // this.$Message.error({
                        //     content: response.msg ? response.msg : '资金信息请求未成功',
                        //     duration: 2,
                        //     closable: true
                        // });
                    }
                }).catch(() => {
                });
            },
            getPie_app(items) {
                this.pieFetch_app = true;
                if (items) {
                    this.pieListStatus_app = items;
                    let pieAmountArr = [];
                    for (let i in items) {
                        pieAmountArr.push({
                            value: (items[i].amount * 1) / 100,
                            name: items[i].appFundName
                        });
                    }
                    this.pieAmount_app = pieAmountArr;
                } else {
                    this.pieAmount_app = [];
                }
            },
            getPie_fund(items) {
                this.pieFetch_fund = true;
                if (items) {
                    this.pieListStatus_fund = items;
                    let pieAmountArr = [];
                    for (let i in items) {
                        pieAmountArr.push({
                            value: (items[i].amount * 1) / 100,
                            name: items[i].appFundName
                        });
                    }
                    this.pieAmount_fund = pieAmountArr;
                } else {
                    this.pieAmount_fund = [];
                }
            },
            getBar_app(items) {
                this.barFetch = true;
                if (items) {
                    this.barListStatus = items;
                }
                if (items) {
                    this.barApp_x = items.map(it => {
                        return it.appFundName;
                    });

                    this.barApp_inAmount = items.map(it => {
                        return (it.inAmount / 100);
                    });
                    this.barApp_outAmount = items.map(it => {
                        return it.outAmount < 0 ? (-it.outAmount / 100) : (it.outAmount / 100);
                    });
                    this.barApp_inCount = items.map(it => {
                        return it.inCount;
                    });
                    this.barApp_outCount = items.map(it => {
                        return it.outCount;
                    });

                    this.yAxis_app = [
                        {
                            type: 'value',
                            name: '金额(元)',
                            min: 0,
                            max: function (value) {
                                return ((parseInt(value.max).toFixed(0)) * 1.4).toFixed(0)
                            },
                            splitLine: {
                                //y轴背景表格
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true,
                                lineStyle: { // y轴刻度线
                                    opacity: 1
                                }
                            },
                            axisLine: {
                                show: true,
                                onZero: true
                            },
                            scale: true
                        },
                        {
                            type: 'value',
                            name: '笔数(笔)',
                            min: 0,
                            max: function (value) {
                                return parseInt(value.max * 1.5).toFixed(0)
                            },
                            splitLine: {
                                //y轴背景表格
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: false,
                                lineStyle: { // y轴刻度线
                                    opacity: 1
                                }
                            },
                            axisLine: {
                                show: true,
                                onZero: true
                            },
                            scale: true
                        }
                    ];

                    this.series_app = [
                        {
                            data: this.barApp_inAmount,
                            type: 'bar',
                            smooth: true,
                            name: '应用收入(元)',
                            itemStyle: {
                                normal:
                                    {
                                        barBorderRadius: [5, 5, 0, 0],
                                        color: '#70C64F',
                                        label: {
                                            show: true,
                                            position: 'outer',
                                            textStyle: {
                                                fontWeight: 'bold',
                                                align: 'center',
                                                color: '#27727B'
                                            },
                                            formatter: function (p) {
                                                return p.value > 0 ? (p.value + '\n') : '';
                                            }
                                        }
                                    }
                            },
                        },
                        {
                            data: this.barApp_outAmount,
                            type: 'bar',
                            smooth: true,
                            name: '应用支出(元)',
                            itemStyle: {
                                normal: {
                                    color: '#ED3F6C',
                                    barBorderRadius: [5, 5, 0, 0],
                                    label: {
                                        show: true,
                                        position: 'outer',
                                        textStyle: {
                                            fontWeight: 'bold',
                                            align: 'center',
                                            color: '#ed3f14'
                                        },
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value + '\n') : '';
                                        }
                                    }
                                }
                            },
                        },
                        {
                            data: this.barApp_inCount,
                            type: 'bar',
                            smooth: true,
                            name: '应用收入(笔)',
                            yAxisIndex: 1, // y轴第二个标尺
                            itemStyle: {
                                normal: {
                                    color: '#389BFF',
                                    barBorderRadius: [5, 5, 0, 0],
                                    label: {
                                        show: true,
                                        position: 'outer',
                                        textStyle: {
                                            fontWeight: 'bold',
                                            align: 'center',
                                            color: '#2d50e6'
                                        },
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value + '\n') : '';
                                        }
                                    }
                                }
                            },
                        },
                        {
                            data: this.barApp_outCount,
                            type: 'bar',
                            smooth: true,
                            name: '交易笔数(笔)',
                            yAxisIndex: 1, // y轴第二个标尺
                            itemStyle: {
                                normal: {
                                    color: '#FF7548',
                                    barBorderRadius: [5, 5, 0, 0],
                                    label: {
                                        show: true,
                                        position: 'outer',
                                        textStyle: {
                                            fontWeight: 'bold',
                                            align: 'center',
                                            color: '#E55B37'
                                        },
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value + '\n') : '';
                                        }
                                    }
                                }
                            },
                        }
                    ];
                }
            },
            getHoursFetch() {
                ajax.dailyHoursInfo({
                    checkDate: this.dateSearch.replace(/-/g, ""),
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.getLine_hours(response.data);
                        } else {
                            this.lineHoursFetch = true;
                            this.lineHoursStatus = [];
                        }
                    } else {
                        this.lineHoursFetch = true;
                        this.lineHoursStatus = [];
                        // this.$Message.error({
                        //     content: response.msg ? response.msg : '日账单按小时分布请求未成功',
                        //     duration: 2,
                        //     closable: true
                        // });
                    }
                }).catch(() => {
                });
            },
            getLine_hours(items) {
                this.lineHoursFetch = true;
                if (items) {
                    this.lineHoursStatus = items;
                }
                this.lineData_hours = items.map(it => {
                    if (it.hour) {
                        let xItem;
                        if (it.hour.substring(0, 1) === '0') {
                            xItem = it.hour.substring(1, 2) + '时';
                        } else {
                            xItem = it.hour + '时';
                        }
                        return xItem;
                    }
                });

                this.lineHours_y_amount = items.map(it => {
                    return it.amount / 100;
                });
                this.lineHours_y_count = items.map(it => {
                    return it.count;
                });

                this.yAxis_hours = [
                    {
                        type: 'value',
                        name: '金额(元)',
                        min: 0,
                        max: function (value) {
                            return (parseInt(value.max) * 1.4).toFixed(0)
                        },
                        splitLine: {
                            //y轴背景表格
                            show: false
                        },
                        axisTick: {
                            alignWithLabel: true,
                            lineStyle: { // y轴刻度线
                                opacity: 1
                            }
                        },
                        axisLine: {
                            show: true,
                            onZero: true
                        },
                        scale: true
                    },
                    {
                        type: 'value',
                        name: '笔数(笔)',
                        min: 0,
                        max: function (value) {
                            return parseInt(value.max * 1.5).toFixed(0)
                        },
                        splitLine: {
                            //y轴背景表格
                            show: true
                        },
                        axisTick: {
                            alignWithLabel: false,
                            lineStyle: { // y轴刻度线
                                opacity: 1
                            }
                        },
                        axisLine: {
                            show: true,
                            onZero: true
                        },
                        scale: true
                    }
                ];
                this.series_hours = [
                    {
                        data: this.lineHours_y_amount,
                        type: 'line',
                        symbolSize: 5,
                        smooth: true,
                        name: '金额(元)',
                        stack: '当日金额'
                    },
                    {
                        data: this.lineHours_y_count,
                        type: 'line',
                        symbolSize: 5,
                        smooth: true,
                        name: '笔数(笔)',
                        stack: '当日笔数',
                        yAxisIndex: 1 // y轴第二个标尺
                    }
                ];
            },
            getAmountRangeFetch() {
                ajax.dailyAmountRange({
                    checkDate: this.dateSearch.replace(/-/g, ""),
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.getLine_amounts(response.data);
                        } else {
                            this.lineAmountsFetch = true;
                        }
                    } else {
                        this.getLine_amounts([]);
                        // this.$Message.error({
                        //     content: response.msg ? response.msg : '交易金额区间分布请求未成功',
                        //     duration: 2,
                        //     closable: true
                        // });
                    }
                }).catch(() => {
                });
            },
            getLine_amounts(items) {
                this.lineAmountsFetch = true;
                if (items) {
                    this.lineAmountsStatus = items;
                }
                this.lineData_amounts = items.map(it => {
                    return it.amountRange + '(元)';
                });

                this.lineAmounts_count = items.map(it => {
                    return it.count;
                });

                this.yAxis_amounts = [
                    {
                        type: 'value',
                        name: '笔数(笔)',
                        min: 0,
                        max: function (value) {
                            return parseInt(value.max * 1.5).toFixed(0)
                        },
                        splitLine: {
                            //y轴背景表格
                            show: true
                        },
                        axisTick: {
                            alignWithLabel: false,
                            lineStyle: { // y轴刻度线
                                opacity: 1
                            }
                        },
                        axisLine: {
                            show: true,
                            onZero: true
                        },
                        scale: true
                    }
                ];
                this.series_amounts = [
                    {
                        data: this.lineAmounts_count,
                        type: 'line',
                        symbolSize: 5,
                        smooth: true,
                        name: '笔数(笔)',
                        stack: '当日笔数',
                        yAxisIndex: 1 // y轴第二个标尺
                    }
                ];
            },
            getPie_appReset() {
                this.pieListStatus_app = [];
                this.pieFetch_app = false;
            },
            getPie_fundReset() {
                this.pieListStatus_fund = [];
                this.pieFetch_fund = false;
            },
            getBar_appReset() {
                this.pieAmount_app = [];
                this.pieAmount_fund = [];
                this.barFetch = false;
                this.barListStatus = [];
                this.barApp_x = [];
                this.barApp_inAmount = [];
                this.barApp_outAmount = [];
                this.barApp_inCount = [];
                this.barApp_outCount = [];
                this.yAxis_app = [];
                this.series_app = [];
            },
            getLine_hoursReset() {
                this.lineHoursFetch = false;
                this.lineHoursStatus = [];
                this.lineData_hours = [];
                this.lineHours_y_amount = [];
                this.lineHours_y_count = [];
                this.yAxis_hours = [];
                this.series_hours = [];
            },
            getLine_amountsReset() {
                this.lineAmountsFetch = false;
                this.lineAmountsStatus = [];
                this.lineData_amounts = [];
                this.lineAmounts_count = [];
                this.yAxis_amounts = [];
                this.series_amounts = [];
            }
        },
        filters: {
            parseTime: (val) => {
                return parseTime(val, "{y}-{m}-{d}");
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .line-legend {
        li {
            color: @fontColor;
            margin-bottom: 5px;
            display: inline-block;
            i {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 5px;
                border-radius: 50%;
                background-color: #389BFF;
            }
            &:nth-child(2) {
                i {
                    background-color: #70C64F;
                }
            }
            &:nth-child(3) {
                i {
                    background-color: #FFD039;
                }
            }
        }
    }

    @media screen and (max-width: 1308px) {
    }

    @media screen and (max-height: 786px) {
    }
</style>
