<template>
    <div class="home-container">
        <div class="homeBox">
            <title-item text="系统总览" sizeType="small"></title-item>

            <Card class="panelBox">
                <Row :gutter="16">
                    <Col span="12" :xs="24" :sm="12" :md="12" :lg="12">
                        <Col span="12" :xs="24" :sm="22" :md="22" :lg="18">
                            <div class="table-span12">
                                <p class="table-title">当月对账情况</p>
                                <ul class="table-body">
                                    <li>
                                        <label class="table-body-title">HIS应收
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="HIS原始账单统计收入-支出">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>
                                            ：</label>
                                        <span class="table-body-num" v-if="monthSummary_current.hisincomeAmount">{{monthSummary_current.hisincomeAmount|$_filters_moneyFormat_fen}}元</span>
                                        <span class="table-body-num"
                                              v-else="monthSummary_current.hisincomeAmount">--元</span>

                                    </li>
                                    <li>
                                        <label class="table-body-title">各资金渠道实收
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="各资金渠道原始账单收入汇总-支出汇总">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：</label>
                                        <span class="table-body-num" v-if="monthSummary_current.fundIncomeAmount">{{monthSummary_current.fundIncomeAmount|$_filters_moneyFormat_fen}}元</span>
                                        <span class="table-body-num"
                                              v-else="monthSummary_current.fundIncomeAmount">--元</span>
                                    </li>
                                    <li class="li-grid">
                                        <label class="table-body-title">
                                            <span>
                                                已对账
                                                <Poptip trigger="hover" placement="right-end"
                                                        content="已上传数据进行对账天数">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：
                                            </span>
                                            <kbd>{{monthSummary_current.checkedNums ? monthSummary_current.checkedNums
                                                : '--'}}
                                                |
                                                {{monthSummary_current.orderNums ? monthSummary_current.orderNums :
                                                '--'}}</kbd>
                                        </label>
                                        <label class="table-body-title">
                                            <span>
                                                已归档
                                                 <Poptip trigger="hover" placement="right-end"
                                                         content="已对账通过并归档天数">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：
                                            </span>
                                            <kbd>{{monthSummary_current.archiveNums ? monthSummary_current.archiveNums
                                                : '--'}}
                                                |
                                                {{monthSummary_current.orderNums ? monthSummary_current.orderNums :
                                                '--'}}</kbd>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="table-body-title">异常待处理账单
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="异常待手工勾对账单数量">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：</label>
                                        <span class="table-body-num">{{monthSummary_current.needDealNums ? monthSummary_current.needDealNums : '--'}}笔</span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Col>
                    <Col span="12" :xs="24" :sm="12" :md="12" :lg="12">
                        <Col span="12" :xs="24" :sm="22" :md="22" :lg="18">
                            <div class="table-span12">
                                <p class="table-title">上月对账情况</p>
                                <ul class="table-body">
                                    <li>
                                        <label class="table-body-title">HIS应收
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="HIS原始账单统计收入-支出">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：</label>
                                        <span class="table-body-num" v-if="monthSummary_pre.hisincomeAmount">{{monthSummary_pre.hisincomeAmount|$_filters_moneyFormat_fen}}元</span>
                                        <span class="table-body-num"
                                              v-else="monthSummary_pre.hisincomeAmount">--元</span>
                                    </li>
                                    <li>
                                        <label class="table-body-title">各资金渠道实收
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="各资金渠道原始账单收入汇总-支出汇总">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：</label>
                                        <span class="table-body-num" v-if="monthSummary_pre.fundIncomeAmount">{{monthSummary_pre.fundIncomeAmount|$_filters_moneyFormat_fen}}元</span>
                                        <span class="table-body-num"
                                              v-else="monthSummary_pre.fundIncomeAmount">--元</span>
                                    </li>
                                    <li class="li-grid">
                                        <label class="table-body-title">
                                            <span>
                                                已对账
                                                <Poptip trigger="hover" placement="right-end"
                                                        content="已上传数据进行对账天数">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：
                                            </span>
                                            <kbd>{{monthSummary_pre.checkedNums ? monthSummary_pre.checkedNums
                                                : '--'}}
                                                |
                                                {{monthSummary_pre.orderNums ? monthSummary_pre.orderNums :
                                                '--'}}</kbd>
                                        </label>
                                        <label class="table-body-title">
                                            <span>
                                                已归档
                                                  <Poptip trigger="hover" placement="right-end"
                                                          content="已对账通过并归档天数">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：
                                            </span>
                                            <kbd>{{monthSummary_pre.archiveNums ? monthSummary_pre.archiveNums
                                                : '--'}}
                                                |
                                                {{monthSummary_pre.orderNums ? monthSummary_pre.orderNums :
                                                '--'}}</kbd>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="table-body-title">异常待处理账单
                                            <Poptip trigger="hover" placement="right-end"
                                                    content="异常待手工勾对账单数量">
                                                <i class="iconfont icon-question"
                                                   style="margin-left: 5px; margin-top: 2px; color: #2d8cf0; font-size: 14px; display: inline-block; cursor: pointer;"></i>
                                            </Poptip>：</label>
                                        <span class="table-body-num">{{monthSummary_pre.needDealNums ? monthSummary_pre.needDealNums : '--'}}笔</span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <title-item text="对账日历" sizeType="small" bottomType="bottom_0" class="border-top-dash margin-top-20"></title-item>
                <Row>
                    <Col span="24" class="right">
                        <Form
                                inline :label-width="0"
                                label-position="left"
                                class="margin-bottom-5 margin-top-0">
                            <FormItem prop="dateSearch">
                                <DatePicker v-model="dateSearch"
                                            format="yyyy-MM"
                                            type="month"
                                            placement="bottom-start"
                                            placeholder="选择月份"
                                            :clearable="false"
                                            style="width: 200px"
                                            :options="endTimeOptions"
                                            @on-change="dateChange"
                                ></DatePicker>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <div class="calendar-box">
                    <div class="calendar-weekName">
                        <label>周一</label>
                        <label>周二</label>
                        <label>周三</label>
                        <label>周四</label>
                        <label>周五</label>
                        <label>周六</label>
                        <label>周日</label>
                    </div>
                    <ul class="calendar-container">
                        <div class="calendar-loading-context">
                            <warnup-spin
                                    sizeType="large" v-if="spinShow"></warnup-spin>

                        </div>
                        <p      class="calendar-loading-none"
                                v-if="monthDetail_current.length === 0 && spinShow===false">
                            暂无数据
                        </p>
                        <li
                                v-if="monthDetail_current.length > 0"
                                v-for="item in monthDetail_current"
                                :class="item.date ? `calendar-item` : `noneItem calendar-item`"
                                :key="item.keyDate">
                            <span class="calendar-item-day" :class="[item.pre ? calendarItemPre : '']">{{item.date}}</span>
                            <p :class="[calendarItemStatus, className, item.pre ? calendarItemPre : '']" @click="dailyAction"
                               v-if="
                            item.checkOrderStatus == '0' || item.checkOrderStatus == 0 ||
                            item.checkOrderStatus == '1' || item.checkOrderStatus == 1 ||
                             item.checkOrderStatus == '3' || item.checkOrderStatus == 3 ||
                              item.checkOrderStatus == '4' || item.checkOrderStatus == 4 ||
                               item.checkOrderStatus == '5' || item.checkOrderStatus == 5 ? className='danger' :
                            item.checkOrderStatus == '2' || item.checkOrderStatus == 2 ? className='normal' :
                            item.checkOrderStatus == '6' || item.checkOrderStatus == 6 ? className='success' :className=''">
                                {{item.checkOrderStatus | checkOrderStatus}}
                            </p>
                            <p :class="[calendarItemStatus, className, item.pre ? calendarItemPre : '']"
                               v-if="
                            item.checkOrderStatus == '未对账'">
                                {{item.checkOrderStatus}}
                            </p>
                        </li>
                    </ul>
                </div>
                <title-item text="当月HIS账单汇总曲线" sizeType="small" class="border-top-dash margin-top-20"></title-item>
                <Row>
                    <Col span="24"
                         class="margin-top-10">
                        <ul class="line-legend" v-if="lineData_x.length > 0">
                            <li>
                                <i></i>净收入金额
                            </li>
                            <li>
                                <i></i>交易笔数
                            </li>
                            <li>
                                <i></i>异常处理笔数
                            </li>
                        </ul>
                    </Col>
                    <Col span="24">
                        <chart-line-multi
                                v-if="lineData_x.length > 0"
                                style="width: 100%; min-height: 280px;"
                                :legendData="legendNames"
                                :xAxisData="lineData_x"
                                :multiStatus="multiStatus"
                                :yAxisItems="yAxisItems"
                                :seriesItems="seriesHis"
                        ></chart-line-multi>
                        <chart-spin
                                :noneList="lineListStatus"
                                :fetchStatus="lineFetch"></chart-spin>
                    </Col>
                </Row>
                <Row :gutter="16" class="margin-top-20">
                    <Col span="12" :xs="24" :sm="24" :md="24" :lg="12">
                        <chart-pie v-if="pieAmount_app.length > 0"
                                   style="min-height: 350px;"
                                   :valuePie="pieAmount_app"
                                   :legendStatus="false"
                                   radius="50%"
                                   centerY="57%"
                                   text="院内系统收入分布(元)"
                                   class="border-dash padding-top-10"
                        ></chart-pie>
                    </Col>
                    <Col span="12" :xs="24" :sm="24" :md="24" :lg="12">
                        <chart-pie v-if="pieAmount_fund.length > 0"
                                   style="min-height: 350px;"
                                   :valuePie="pieAmount_fund"
                                   :legendStatus="false"
                                   radius="50%"
                                   centerY="57%"
                                   text="资金通道收入占比(元)"
                                   class="border-dash padding-top-10"
                        ></chart-pie>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/overview';
    import ajax from '@/api/overview';
    import {parseTime} from '@/filters';
    import {reconciliationStatus} from './store/filters';
    import {getPreMonth} from '@/libs/common';
    import TitleItem from '_c/title/index';
    import {ChartPie, ChartLineMulti, ChartSpin} from '_c/chart/index';
    import {WarnupSpin} from '_c/warn-up/index';
    import moment from 'moment';

    export default {
        name: 'overview-index',
        components: {
            TitleItem,
            ChartPie,
            ChartLineMulti,
            ChartSpin,
            WarnupSpin
        },
        data() {
            return Object.assign(storeData.call(this), {
                calendarItemStatus: 'calendar-item-status',
                calendarItemPre: 'calendar-item-pre',
                legendNames: ['净收入金额', '交易笔数', '异常处理数量'],
                lineListStatus: [],
                lineFetch: false,
                endTimeOptions: {
                    disabledDate: date=> {
                        return date && date.valueOf() > Date.now();
                    }
                }
            });
        },
        created() {
            this.dateSearch = parseTime(new Date(), '{y}-{m}-{d}').substring(0, 7);
            this.getDate();
        },
        methods: {
            getDate() {
                let nowTime = new Date();
                if (nowTime) {
                    this.dateMonth = parseTime(nowTime, '{y}-{m}-{d}').replace(/-/g, '').substring(0, 6);
                }
                this.queryParams_month = {
                    ...this.queryParams_month,
                    monthDate: this.dateMonth || ''
                };
                this.queryParams_month_pre = {
                    monthDate: getPreMonth(parseTime(nowTime, '{y}-{m}-{d}')).replace(/-/g, '').substring(0, 6) || ''
                };
                this.getMonthSummary_current();
                this.getMonthSummary_pre();
                this.getCalendar();
                this.getLineDetail();
                this.getPieDetail_app();
                this.getPieDetail_fund();
            },
            getMonthSummary_current() {
                ajax.monthSummary(this.queryParams_month).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data) {
                            this.monthSummary_current = response.data;
                        } else {
                            this.monthSummary_current = {};
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账总账汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getMonthSummary_pre() {
                ajax.monthSummary(this.queryParams_month_pre).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data) {
                            this.monthSummary_pre = response.data;
                        } else {
                            this.monthSummary_pre = {};
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账总账汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getCalendar() {
                ajax.monthDetail(this.queryParams_month).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data) {
                            const DATE_REGEXP = new RegExp("(\\d{4})(\\d{2})(\\d{2})");
                            function toDate(dateString){
                                if(DATE_REGEXP.test(dateString)){
                                    let timestamp = dateString.replace(DATE_REGEXP, function($all,$year,$month,$day,$part1,$hour,$minute,$second,$part2,$milliscond){
                                        let date = new Date($year, $month,$day, $hour||"00", $minute||"00", $second||"00", $milliscond||"00");
                                        return date.getTime();
                                    });
                                    let date = new Date();
                                    date.setTime(timestamp);
                                    return date;
                                }
                                return null;
                            }

                            //最终数据集合
                            let resFormat = [];
                            let tmpPreDate;
                            let dayNum = 0;
                            //遍历原集合，处理数据，得到目标数据集
                            response.data.forEach((it,index)=> {
                                //数据第一顺位直接存入
                                if(0 != index){
                                    //计算前后时间差，并对时间差进行空录入，进行占位
                                    //let day = parseInt((toDate(it.date).getTime() - toDate(tmpPreDate).getTime())/(1000 * 60 * 60 * 24))+1;
                                    let day = 0;
                                    let grid = 1;

                                    while (--day > 1){
                                        let item = {
                                            keyDate: dayNum++,
                                            date: moment(it.date).subtract(day - grid, 'days').format("YYYYMMDD"), // 填充空的日期
                                            weekDay: "",
                                            checkOrderStatus: "未对账"
                                        };
                                        resFormat.push(item);
                                    }
                                }

                                tmpPreDate = it.date;

                                let item = {
                                    keyDate: dayNum++,
                                    date: it.date || "",
                                    weekDay: it.weekDay || "",
                                    checkOrderStatus: it.checkOrderStatus || ""
                                };
                                resFormat.push(item);

                            });

                            this.monthDetail_current = resFormat;
                            this.spinShow = false;

                            if (response.data.length > 0) {
                                if (response.data[0].weekDay)
                                // 对第一个周几的逻辑处理
                                    if (response.data[0].weekDay) {
                                        let item = response.data[0].weekDay;
                                        let weekAxisOrder = null;
                                        let dom = [];

                                        const weekAxis = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                        for (let i = 0; i < weekAxis.length; i++) {
                                            if (weekAxis[i] === item) {
                                                weekAxisOrder = i;
                                                break;
                                            } else {
                                                let item = {
                                                    keyDate: -(i+1),
                                                    date: moment(response.data[0].date).subtract(i+1, 'days').format("YYYYMMDD"), // 填充空的日期
                                                    weekDay: "",
                                                    checkOrderStatus: "未对账",
                                                    pre: '1'
                                                };
                                                dom.push(
                                                    item
                                                );
                                            }
                                        }
                                        if (weekAxisOrder !== 0 && weekAxisOrder !== null) {
                                            this.monthDetail_current = (dom.reverse()).concat(this.monthDetail_current);
                                        }
                                    }
                            }
                        } else {
                            this.spinShow = false;
                            this.monthDetail_current = [];
                        }
                    } else {
                        this.spinShow = false;
                        this.monthDetail_current = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账月详情请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.spinShow = false;
                });
            },
            dateChange(val) {
                if (val) {
                    this.queryParams_month.monthDate = val.replace(/-/g, "");
                    this.dateSearch = val;
                    if (val) {
                        let dateSearchFormat = new Date(val.replace(/\-/g, "\/"));
                        let dateCurrentFormat = new Date();
                        if (dateSearchFormat > dateCurrentFormat) {
                            this.$Message.error({
                                render: h => {
                                    return h('p', [
                                        '查看的月份晚于，当下月份，请重新选择！'
                                    ])
                                },
                                duration: 3,
                                closable: true
                            });
                            this.monthDetail_current = [];
                        } else {
                            this.$Message.success({
                                render: h => {
                                    return h('p', [
                                        '查询' +
                                        this.queryParams_month.monthDate + '对账日历'
                                    ])
                                },
                                duration: 3,
                                closable: true
                            });
                            this.getCalendar();
                        }
                    }
                } else {
                    this.queryParams_month.monthDate = '';
                }
            },
            getLineDetail() {
                ajax.monthBillData({
                    monthDate: this.dateMonth
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.lineFetch = true;
                            this.lineListStatus = response.data;
                            this.lineData_x = response.data.map(it => {
                                return it.date;
                            });
                            this.lineData_y_account = response.data.map(it => {
                                return it.netIncomeAmount / 100;
                            });
                            this.lineData_y_trade = response.data.map(it => {
                                return it.tradeNums || 0;
                            });
                            this.lineData_y_deal = response.data.map(it => {
                                return it.dealNums || 0;
                            });

                            this.yAxisItems = [
                                {
                                    type: 'value',
                                    name: '金额(元)',
                                    min: 0,
                                    max: function (value) {
                                        return (parseInt((value.max))* 1.2).toFixed(0)
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

                            this.seriesHis = [
                                {
                                    data: this.lineData_y_account,
                                    type: 'line',
                                    symbolSize: 5,
                                    smooth: true,
                                    name: '净收入金额(元)',
                                    stack: '当日净收入金额'
                                },
                                {
                                    data: this.lineData_y_trade,
                                    type: 'line',
                                    symbolSize: 5,
                                    smooth: true,
                                    name: '交易笔数(笔)',
                                    stack: '当日交易笔数',
                                    yAxisIndex: 1 // y轴第二个标尺
                                },
                                {
                                    data: this.lineData_y_deal,
                                    type: 'line',
                                    symbolSize: 5,
                                    smooth: true,
                                    name: '异常处理数量(笔)',
                                    stack: '当日异常处理数量',
                                    yAxisIndex: 1 // y轴第二个标尺
                                }
                            ];
                        } else {
                            this.lineFetch = true;
                            this.lineListStatus = [];
                        }
                    } else {
                        this.lineFetch = true;
                        this.lineListStatus = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账月账单求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getPieDetail_app() {
                ajax.monthAppFundData({
                    monthDate: this.dateMonth,
                    ownerType: 'App'
                }).then(response => {
                    if (response.success === true) {
                        let pieAmountArr = [];

                        if (response.data) {
                            for (let i in response.data) {
                                pieAmountArr.push({
                                    value: (response.data[i].tradeAmounts * 1) / 100,
                                    name: response.data[i].name
                                });
                            }
                            this.pieAmount_app = pieAmountArr;
                        } else {
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '月账单应用请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getPieDetail_fund() {
                ajax.monthAppFundData({
                    monthDate: this.dateMonth,
                    ownerType: 'Pay'
                }).then(response => {
                    if (response.success === true) {
                        let pieAmountArr = [];

                        if (response.data) {
                            for (let i in response.data) {
                                pieAmountArr.push({
                                    value: (response.data[i].tradeAmounts * 1) / 100,
                                    name: response.data[i].name
                                });
                            }
                            this.pieAmount_fund = pieAmountArr;
                        } else {
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '月账单应用请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            dailyAction() {

            }
        },
        filters: {
            checkOrderStatus: function (value) {
                return reconciliationStatus(value);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .table-span12 {
        border: 1px solid @borderLighter;
        .table {
            &-title {
                display: flex;
                align-items: center;
                padding-left: 14px;
                height: 44px;
                box-sizing: border-box;
                background: @background;
                border-bottom: 1px solid @borderLighter;
            }
            &-body {
                li {
                    &:not(:last-child) {
                        border-bottom: 1px solid @borderLighter;
                    }
                    display: flex;
                    height: 44px;
                    align-items: center;
                    .table-body-title {
                        height: 43px;
                        width: 50%;
                        display: flex;
                        align-items: center;
                        padding-left: 14px;
                        border-right: 1px solid @borderLighter;
                    }
                    .table-body-num {
                        width: e("calc(50% - 14px)");
                        display: inline-block;
                        text-align: right;
                        kbd {
                            font-weight: normal;
                            font-style: normal;
                        }
                    }
                    &.li-grid {
                        label {
                            padding-right: 15px;
                            justify-content: space-between;
                            &:not(:first-child) {
                                border-right: none;
                            }
                        }
                    }
                }
            }
        }
    }

    .calendar-box {
        .calendar {
            &-weekName {
                display: flex;
                border-top: 1px solid @borderLighter;
                label {
                    display: flex;
                    flex-basis: e("calc((100% - 1px)/7)");
                    height: 44px;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    box-sizing: border-box;
                    background-color: @backgroundGrey;
                    &:last-child {
                        border-right: 1px solid @borderLighter;
                    }
                    &:not(:last-child) {
                        border-right: 1px solid #fff;
                    }
                }
            }
            &-container {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                min-height: 97px;
                transition: all 1s ease-in 200ms;
            }
            &-loading-context {
                .ivu-spin-fix {
                    height: 97px;
                    border-bottom: 1px solid @borderLighter;
                    border-left: 1px solid @borderLighter;
                    border-right: 1px solid @borderLighter;
                }
            }
            &-loading-none {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 97px;
                border-bottom: 1px solid @borderLighter;
                border-left: 1px solid @borderLighter;
                border-right: 1px solid @borderLighter;
                box-sizing: border-box;
            }
            &-item {
                border-left: 1px solid @borderLighter;
                flex-basis: e("calc((100% - 1px)/7)");
                box-sizing: border-box;
                &:nth-child(7n+1) {
                    border-right: 1px solid @borderLighter;
                }
                &:nth-child(7n+6) {
                    border-right: none;
                }
                &:last-child {
                    border-right: 1px solid @borderLighter;
                }
                &:not(.noneItem)+.noneItem.calendar-item {
                    border-left: 1px solid @borderLighter;
                }
                &.noneItem {
                    border-left-color: #fff;
                    border-right-color: #fff;
                    .calendar-item {
                        &-day {
                            background-color: #fff;
                            border-bottom-color: #fff;
                        }
                    }
                }
                &-day {
                    display: flex;
                    height: 32px;
                    align-items: center;
                    justify-content: center;
                    color: @fontColor;
                    background-color: @background;
                    border-bottom: 1px solid @borderLighter;
                    box-sizing: border-box;
                    &.calendar-item {
                        &-pre {
                            background-color: @borderNormal;
                            color: @fontColorLight;
                        }
                    }
                }
                &-status {
                    display: flex;
                    height: 65px;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 1px solid @borderLighter;
                    box-sizing: border-box;
                    &.calendar-item {
                        &-pre {
                            background-color: @borderNormal;
                        }
                    }
                }
            }
        }
    }

    .line-legend {
        margin-top: 0;
        li {
            color: @fontColor;
            margin-bottom: 5px;
            display: inline-block;
            margin-right: 25px;
            i {
                position: relative;
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

    @media screen and (max-height: 786px) {

    }
</style>
