<template>
    <div class="home-container">
        <div class="homeBox">
            <title-item text="资金汇总报表" sizeType="small" class="margin-top-20"></title-item>
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
                            label="日期|类目"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.checkDate ? scope.row.checkDate : '--'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            :render-header="HISDetailHeader"
                    >
                        <el-table-column
                                align="center"
                                :render-header="HISBusinessHeader"
                                min-width="120"
                        >
                            <el-table-column
                                    align="center"
                                    label="收入"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessHISInAmount">
                                    {{scope.row.BusinessHISInAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="支出"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessHISOutAmount">
                                    {{scope.row.BusinessHISOutAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="合计"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessHISSumAmount">
                                    {{scope.row.BusinessHISSumAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                :render-header="HISTZHeader"
                                min-width="120"
                        >
                            <el-table-column
                                    align="center"
                                    label="收入"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessAdjustInAmount">
                                    {{scope.row.BusinessAdjustInAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="支出"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessAdjustOutAmount">
                                    {{scope.row.BusinessAdjustOutAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="合计"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                <span v-if="scope.row.BusinessAdjustSumAmount">
                                    {{scope.row.BusinessAdjustSumAmount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="合计"
                                min-width="98"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.BusinessTotalSumAmount">
                                    {{scope.row.BusinessTotalSumAmount|moneyFormatTemp}}</span>
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
                                :label="item"
                                :key="index"
                                :prop="item"
                                align="center"
                                min-width="98"
                        >
                            <el-table-column
                                    align="center"
                                    label="收入"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row[item+'TransactionInAmount']">{{scope.row[item+'TransactionInAmount']|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="支出"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row[item+'TransactionOutAmount']">{{scope.row[item+'TransactionOutAmount']|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="合计"
                                    min-width="98"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row[item+'TransactionSumAmount']">{{scope.row[item+'TransactionSumAmount']|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="合计"
                                min-width="98"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.TransactionTotalSumAmount">{{scope.row.TransactionTotalSumAmount|moneyFormatTemp}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>

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
                </el-table>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/billTotal';
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
                        disabledDate: date => {
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
                Promise.all([this.getParams_fund()]).then(
                    (results) => {
                        let paramName = results[0];
                        this.getList(paramName);
                    }
                ).catch((e) => {
                    console.log(e)
                })
            },
            getSummaryList(paramName) {
                let groupParam;
                groupParam =
                    [
                        "我方", // 我方
                        // "应用(汇总)", // 应用
                        "资金通道(汇总)", // 资金

                        "财务调账(汇总)",
                        "业务财务调账(汇总)",
                        "应用财务调账(汇总)",
                        "资金财务调账(汇总)"
                    ].concat(paramName);
                ajax.getSummaryList({
                    ...this.queryParams,
                    "codeList": [
                        // "BusinessInAmount",
                        // "BusinessOutAmount",
                        // "BusinessTotalAmount",
                        // "BusinessAdjustInAmount",
                        // "BusinessAdjustOutAmount",
                        // "BusinessAdjustTotalAmount",
                        // "BusinessInAmount",
                        // "TransactionInAmount",
                        // "TransactionOutAmount",
                        // "TransactionTotalAmount",
                        // "TransactionHangDrawTotalAmount",

                        "BusinessInAmount",
                        "BusinessOutAmount",
                        "BusinessTotalAmount",
                        "AdjustInAmount",
                        "AdjustOutAmount",
                        "AdjustTotalAmount",
                        "TransactionInAmount",
                        "TransactionOutAmount",
                        "TransactionTotalAmount",
                    ]
                    ,
                    "groupList": groupParam
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.tableHeight = null;

                            let total = {};
                            response.data.forEach(it => {
                                if (it.indexList && it.indexList.length > 0) {

                                    it.indexList.map(_it => {
                                        if (_it.code === "TransactionInAmount") {
                                            switch (_it.group) {
                                                case "我方":
                                                    it[_it.code] = _it.value;
                                                default:
                                                    it[_it.group + ':' + 'TransactionInAmount'] = _it.value;
                                            }
                                        } else if (_it.code === "TransactionOutAmount") {
                                            switch (_it.group) {
                                                case "我方":
                                                    it[_it.code] = _it.value;
                                                default:
                                                    it[_it.group + ':' + 'TransactionOutAmount'] = _it.value;
                                            }
                                        } else if (_it.code === "TransactionTotalAmount") {
                                            switch (_it.group) {
                                                case "我方":
                                                    it[_it.code] = _it.value;
                                                default:
                                                    it[_it.group + ':' + 'TransactionTotalAmount'] = _it.value;
                                            }
                                        } else {
                                            if (_it.group === '应用(汇总)' || _it.group === '业务合计(汇总)' || (_it.group === '资金通道(汇总)' && _it.code.indexOf('Adjust') > -1)) {
                                                return false;
                                            } else {
                                                it[_it.code] = _it.value;
                                            }
                                        }
                                    });

                                }

                                for (let key in it) {
                                    let totalValue = total[key];
                                    if (!totalValue) {
                                        total[key] = it[key] * 1 + '';
                                    } else {
                                        total[key] = (it[key] * 1 + totalValue * 1) + '';
                                    }
                                }

                            });

                            total['checkDate'] = '汇总';

                            response.data.push(total);

                            this.dataList = response.data;
                        } else {
                            this.dataList = [];
                            this.noneText = "暂无数据";
                        }
                    } else {
                        this.noneText = "暂无数据";
                        this.dataList = [];
                        this.tableHeight = 320;
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账明细汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.dataList = [];
                    this.tableHeight = 320;
                    this.noneText = "暂无数据";
                });
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
                                        url: baseUrl + 'merchantCheck/Index/importFundSummary',
                                        input: queryParam,
                                        method: 'get'
                                    });
                                }, 2000);
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

            getList(fundGroups) {
                fundGroups.forEach((fItem) => {
                    let fundInItem = {};
                    fundInItem.index_type = "1";
                    fundInItem.index_group = fItem;
                    fundInItem.index_code = "TransactionInAmount";

                    let fundOutItem = {};
                    fundOutItem.index_type = "1";
                    fundOutItem.index_group = fItem;
                    fundOutItem.index_code = "TransactionOutAmount";

                    let fundSumItem = {};
                    fundSumItem.index_type = "1";
                    fundSumItem.index_group = fItem;
                    fundSumItem.index_code = "TransactionSumAmount";
                    this.queryParams.requestIndexList.push(fundInItem);
                    this.queryParams.requestIndexList.push(fundOutItem);
                    this.queryParams.requestIndexList.push(fundSumItem);
                    this.columnKeys.push(fItem + "TransactionInAmount");
                    this.columnKeys.push(fItem + "TransactionOutAmount");
                    this.columnKeys.push(fItem + "TransactionSumAmount");
                });

                this.queryParams.requestIndexList.push({
                    "index_type": "1",
                    "index_code": "TransactionTotalSumAmount"
                });

                this.columnKeys.push("TransactionTotalSumAmount");
                this.queryParams = {
                    ...this.queryParams,
                    responseFilterList: ["index_type", "index_group", "index_code", "index_value"],
                    groupBy: "check_order_no",
                    needSummation: true
                };
                ajax.summaryData(this.queryParams).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.tableHeight = null;
                            response.data.forEach(it => {
                                if (it.indexInfos && it.indexInfos.length > 0) {
                                    it.indexInfos.map((_it, index) => {
                                        it[this.columnKeys[index]] = null == _it ? "" : _it.index_value;
                                    });
                                }
                            });

                            this.dataList = response.data;
                        } else {
                            this.dataList = [];
                            this.noneText = "暂无数据";
                        }
                    } else {
                        this.noneText = "暂无数据";
                        this.dataList = [];
                        this.tableHeight = 320;
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账明细汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.dataList = [];
                    this.tableHeight = 320;
                    this.noneText = "暂无数据";
                });
            }
        },
        filters: {
            moneyFormatTemp: function (value) {
                if (value > 0) {
                    return "+" + moneyFormat(value / 100);
                } else {
                    return moneyFormat(value / 100);
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
