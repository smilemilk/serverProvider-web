<template>
    <div class="home-container">
        <div class="homeBox">
            <title-item text="明细报表" sizeType="small" class="margin-top-20"></title-item>
            <Card class="searchBox">
                <Row>
                    <Col span="20">
                        <Form
                                ref="queryParams" :model="queryParams"
                                inline :label-width="60"
                                label-position="left"
                                class="margin-bottom-0">
                            <FormItem label="日期:" prop="dateSearch">
                                <DatePicker v-model="dateSearch"
                                            format="yyyy-MM-dd"
                                            type="daterange"
                                            placement="bottom-start"
                                            placeholder="选择开始日期—结束日期"
                                            style="width: 200px"
                                            :options="endTimeOptions"
                                            @on-change="dateChange"
                                ></DatePicker>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="4">
                        <Button type="primary" @click="exportAction">导出EXCEL</Button>
                    </Col>
                </Row>
            </Card>
            <Card class="searchBox margin-top-10">
                <el-table
                        class="mineTable"
                        :data="dataList"
                        ref="table"
                        :height="tableHeight"
                        :empty-text="noneText"
                        highlight-current-row
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            label="对账期号|类目"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.checkDate ? scope.row.checkDate : '--'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            :render-header="businessDetailHeader"
                    >
                        <el-table-column
                                align="center"
                                :render-header="businessTotalHeader"
                                min-width="120"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.BusinessHISSumAmount">{{scope.row.BusinessHISSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                :render-header="businessTZHeader"
                                min-width="120"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.BusinessAdjustSumAmount">{{scope.row.BusinessAdjustSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                :render-header="businessHangHeader"
                                min-width="145"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.BusinessHangFallTotalAmount">
                                    {{scope.row.BusinessHangFallTotalAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            :render-header="appDetailHeader"
                    >
                        <el-table-column
                                v-if="item"
                                v-for="(item, index) in this.appNameList"
                                :label="item+'合计'"
                                :key="index"
                                :prop="item"
                                align="center"
                                min-width="98"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row[item+'BusinessSumAmount']">{{scope.row[item+'BusinessSumAmount']|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--align="center"-->
                                <!--label="财务调账合计"-->
                                <!--min-width="98"-->
                        <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.AdjustTotalAmount_app">{{scope.row.AdjustTotalAmount_app|moneyFormatTemp}}</span>-->
                                <!--<span v-else>&#45;&#45;</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                                align="center"
                                :render-header="appHangHeader"
                                min-width="145"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.AppHangBillChangeTotalSumAmount">
                                    {{scope.row.AppHangBillChangeTotalSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            :render-header="fundDetailHeader"
                    >
                        <el-table-column
                                v-if="item"
                                v-for="(item, index) in this.fundNameList"
                                :label="item+'合计'"
                                :key="index"
                                :prop="item"
                                align="center"
                                min-width="140"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row[item + 'TransactionSumAmount']">{{scope.row[item + 'TransactionSumAmount']|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label=""
                                :render-header="fundHangHeader"
                                min-width="145"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.FundHangBillChangeTotalSumAmount">
                                    {{scope.row.FundHangBillChangeTotalSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="对账合计"
                            min-width="98">
                        <el-table-column
                                align="center"
                                label="(账平)合计"
                                min-width="98">
                            <template slot-scope="scope">
                                <span v-if="scope.row.BusinessSuccessTotalSumAmount">{{scope.row.BusinessSuccessTotalSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="数据状态"
                                min-width="98">
                            <template slot-scope="scope">
                                <span v-if="scope.row.checkStatus">{{scope.row.checkStatus|checkOrderStatus}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/reconciliationSpecification';
    import ajax from '@/api/reconciliation';
    import {parseTime, moneyFormat} from '@/filters';
    import {reconciliationStatus} from '@/filters/statistics';
    import TitleItem from '_c/title/index';
    import {getDays} from '@/libs/common';
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';

    export default {
        name: 'reconciliation-specification',
        components: {
            TitleItem
        },
        data() {
            return Object.assign({},
                storeData.call(this),
                {
                    appNameList: [],
                    fundNameList: [],
                    appNameArray: [],
                    fundNameArray: [],
                    appStatus: '0',
                    fundStatus: '0',
                    endTimeOptions: {
                        disabledDate: date=> {
                            return date && date.valueOf() > Date.now();
                        }
                    }
                });
        },
        created() {
            this.getCurrentMonthFirst();
            this.getCurrentMonthLast();

            this.dateSearch = [this.queryParams.startDate, this.queryParams.endDate];
            if (this.dateSearch) {
                this.asyncFetch();
            }
        },
        methods: {
            // 获取当前月的第一天
            getCurrentMonthFirst() {
                let date = new Date();
                date.setDate(1);
                this.queryParams.startDate = parseTime(date.setDate(1), '{y}-{m}-{d}').replace(/-/g, '');
                return date;
            },
            // 获取当前月的最后一天
            getCurrentMonthLast() {
                let date = new Date();
                let currentMonth = date.getMonth();
                let nextMonth = ++currentMonth;
                let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                let oneDay = 1000 * 60 * 60 * 24;
                this.queryParams.endDate = parseTime(new Date(nextMonthFirstDay - oneDay), '{y}-{m}-{d}').replace(/-/g, '');
                return new Date(nextMonthFirstDay - oneDay);
            },
            dateChange(val) {
                if (val) {
                    this.queryParams.startDate = parseTime(this.dateSearch[0], '{y}-{m}-{d}').replace(/-/g, '');
                    this.queryParams.endDate = parseTime(this.dateSearch[1], '{y}-{m}-{d}').replace(/-/g, '');
                    if (this.dateSearch[0] && this.dateSearch[1]) {
                        let dayNum =
                            getDays(parseTime(this.dateSearch[0], '{y}-{m}-{d}'), parseTime(this.dateSearch[1], '{y}-{m}-{d}'));
                        if (dayNum >= 0 && dayNum < 31) {
                            this.$Message.success({
                                render: h => {
                                    return h('p', [
                                        '查询' +
                                        this.queryParams.startDate + '至' +
                                        this.queryParams.endDate + '对账数据'
                                    ])
                                },
                                duration: 3,
                                closable: true
                            });
                            this.asyncFetch();
                        } else {
                            this.$Message.success({
                                render: h => {
                                    return h('p', [
                                        '查询条件间隔天数需，小于等于31天，请重新选择'
                                    ])
                                },
                                duration: 2,
                                closable: true
                            });
                            this.dataList = [];
                            this.noneText = "时间段超过查询范围，请重新选择";
                        }
                    }
                } else {
                    this.queryParams.startDate = '';
                    this.queryParams.endDate = '';
                }
            },
            getParams_app() {
                return new Promise((resolve, reject) => {
                    ajax.getAppList({
                        configType: '应用数据'
                    }).then(response => {

                        if (response.success === true) {
                            if (response.data) {
                                this.appNameArray = response.data.items.filter(it => {
                                    //if (it.configName !== '财务调账') {
                                        return it;
                                    //}
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
                                    if (it.configName !== '财务调账') {
                                        return it;
                                    } else {
                                        return;
                                    }
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
                        //this.getSummaryList(paramName);
                        this.getList(results[0],results[1]);
                    }
                ).catch((e) => {
                    // console.log(e)
                })
            },

            exportAction() {
                if (this.dataList.length > 0) {
                    if (this.queryParams.startDate && this.queryParams.endDate) {
                        let queryParam = {
                            startDate: this.queryParams.startDate || '',
                            endDate: this.queryParams.endDate || ''
                        };
                        this.$Modal.confirm({
                            content: '确定要导出&nbsp;' + queryParam.startDate + '&nbsp;至&nbsp;' + queryParam.endDate + '&nbsp;的数据?',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                setTimeout(() => {
                                    downloadExcel({
                                        url: baseUrl+'merchantCheck/Index/importLedgerSummary',
                                        input: queryParam,
                                        method: 'get'
                                    });
                                }, 2000);
                            },
                            onCancel: () => {
                            }
                        });
                    } else {
                        this.$Message.error({
                            content: '请先选择时间段',
                            duration: 2,
                            closable: true
                        });
                        return;
                    }
                } else {
                    this.$Message.error({
                        content: '此时间段没有数据，无导出数据！',
                        duration: 2,
                        closable: true
                    });
                    return;
                }
            },
            businessDetailHeader(h) {
                return h('div', {
                      class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '业务对账明细分类(元)'
                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    content: '指院内HIS业务明细类目',
                                    trigger: 'hover',
                                    placement: 'bottom-end'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '5px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            appDetailHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '应用对账明细分类(元)'
                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    content: '各业务子系统明细类目',
                                    trigger: 'hover',
                                    placement: 'bottom-end'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '5px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            fundDetailHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '资金对账明细分类(元)'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    content: '指资金渠道明细类目',
                                    trigger: 'hover',
                                    placement: 'bottom-end'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '5px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            businessTotalHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '业务账合计'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    width: '380',
                                    content: '院内业务新发生的本对账周期账单合计(收入-支出)',
                                    trigger: 'hover',
                                    placement: 'right'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '0px',
                                        marginRight: '3px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            businessTZHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '财务调账合计'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    width: '300',
                                    content: '新增财务调账合计(收入-支出)',
                                    trigger: 'hover',
                                    placement: 'right'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '0px',
                                        marginRight: '3px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            businessHangHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '业务挂账变动合计'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    width: '550',
                                    content: '院内业务账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                    trigger: 'hover',
                                    placement: 'right'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '0px',
                                        marginRight: '3px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            appHangHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '应用挂账变动合计'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    width: '550',
                                    content: '各业务子系统账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                    trigger: 'hover',
                                    placement: 'right'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '0px',
                                        marginRight: '3px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            fundHangHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('div', {
                            domProps: {
                                innerHTML: '资金挂账变动合计'

                            },
                            style: {
                                display: 'inline-block',
                            },
                        }),
                        h('Poptip', {
                                props: {
                                    width: '550',
                                    content: '各资金通道账单挂账变动合计【收入挂账】-【支出挂账】 {注：【收入挂账】（新增收入挂账-消除收入挂账）【支出挂账】（新增支出挂账-消除支出挂账）}',
                                    trigger: 'hover',
                                    placement: 'right'
                                },
                            },
                            [
                                h('i', {
                                    class: ['iconfont', 'icon-question'],
                                    style: {
                                        marginTop: '-2px',
                                        marginLeft: '0px',
                                        marginRight: '3px',
                                        fontSize: '14px',
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        fontWeight: '400'
                                    }
                                })
                            ])
                    ]
                );
            },
            getList(appGroups,fundGroups) {
                appGroups.forEach((aItem)=> {
                    var appItem ={};
                    appItem.index_type = "3";
                    appItem.index_group = aItem;
                    appItem.index_code = "BusinessSumAmount";

                    this.columnKeys.push(aItem+"BusinessSumAmount");
                    this.queryParams.requestIndexList.push(appItem);
                })

                this.queryParams.requestIndexList.push(
                    {
                        "index_type": "3",
                        "index_code": "HangBillChangeTotalSumAmount"
                    }
                );

                this.columnKeys.push("AppHangBillChangeTotalSumAmount");

                fundGroups.forEach((fItem)=> {
                    var fundItem ={};
                    fundItem.index_type = "1";
                    fundItem.index_group = fItem;
                    fundItem.index_code = "TransactionSumAmount";
                    this.columnKeys.push(fItem+"TransactionSumAmount");
                    this.queryParams.requestIndexList.push(fundItem);
                })

                this.columnKeys.push("FundHangBillChangeTotalSumAmount","BusinessSuccessTotalSumAmount");
                this.queryParams.requestIndexList.push(
                    {
                        "index_type": "1",
                        "index_code": "HangBillChangeTotalSumAmount"
                    },
                    {
                        "index_type": "0",
                        "index_code": "BusinessSuccessTotalSumAmount"
                    }
                );

                this.queryParams.responseFilterList = ["index_type","index_group","index_code","index_value"];

                this.queryParams.groupBy = "check_order_no";

                this.queryParams.needSummation = true;

                ajax.summaryData(this.queryParams).then(response => {
                    console.log(response);

                    if (response.success === true) {
                        if (response.data) {
                            response.data.forEach(it=> {
                                if (it.indexInfos && it.indexInfos.length > 0) {
                                    it.indexInfos.map((_it, index) =>{
                                        it[this.columnKeys[index]] = null == _it ? "":_it.index_value;
                                    })
                                }

                            });

                            console.log(response.data);
                            this.$nextTick(()=>{
                                 this.dataList = response.data;
                            });
                        } else {
                            this.dataList = [];
                            this.noneText = "暂无数据";
                        }
                    } else {
                        this.noneText = "暂无数据";
                        this.dataList = [];
                        // this.tableHeight = 320;
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账明细汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.dataList = [];
                    this.noneText = "暂无数据";
                    this.loading = false;
                });
            }
        },
        filters: {
            moneyFormatTemp: function (value) {
                if (value > 0) {
                    return "+"+moneyFormat(value/100);
                } else if (value===0) {
                    return 0;
                } else {
                    return moneyFormat(value/100);
                }
            },
            checkOrderStatus: function (value) {
                return reconciliationStatus(value);
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
