<template>
    <div class="home-container">
        <title-item text="对账日报表" sizeType="small" class="margin-top-20"></title-item>
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
                                <DatePicker v-model="dateSearch"
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
                            <FormItem>
                                <Button-group shape="circle">
                                    <i-button type="ghost" @click="datePreAction">
                                        <Icon type="chevron-left normal"></Icon>
                                        上一天
                                    </i-button>
                                    <i-button type="ghost"
                                              @click="dateNextAction"
                                              :disabled="disabledDayStatus">
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
                    font-weight: 300; margin-top: 2px;">{{messageHint && messageHint.indexOf('未开始对账')>-1 ? '未对账' :
                        messageHint}}</p>
                </h3>
                <Row class="label-lg">
                    <Col class="label-lg-top" span="24" :xs="24" :sm="16" :md="16" :lg="16">
                        <Form
                                inline :label-width="66"
                                label-position="right"
                                class="margin-bottom-0">
                            <FormItem label="对账编号:" class="margin-right-20">
                                <span>{{headerInfo.checkOrderNo ? headerInfo.checkOrderNo : '--'}}</span>
                            </FormItem>
                            <FormItem label="账单状态:" class="margin-right-20">
                                <span v-if="headerInfo && headerInfo.checkStatus">{{headerInfo.checkStatus|checkOrderStatus}}</span>
                                <span v-else>--</span>
                            </FormItem>
                            <FormItem label="归档人:" class="margin-right-20">
                                <span>{{headerInfo.archiveOperName ? headerInfo.archiveOperName : '--'}}</span>
                            </FormItem>
                            <FormItem label="归档时间:" class="margin-right-20">
                                <span v-if="headerInfo.archiveTime">{{headerInfo.archiveTime|parseTime}}</span>
                                <span v-else>--</span>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col class="label-lg-bottom right" span="24" :xs="24" :sm="8" :md="8" :lg="8">
                        <Button type="primary" @click="analysisAction">图表分析</Button>
                        <Button type="primary" @click="exportAction">导出</Button>
                    </Col>
                </Row>

            </Card>
            <Card class="searchBox margin-top-10">
                <Tabs type="card">
                    <TabPane label="金额" name="0">
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
                                    label="对账结果"
                                    min-width="98"
                            >
                                <el-table-column
                                        align="center"
                                        label="类目|分类"
                                        min-width="180"
                                        class-name="leftCell"
                                >
                                    <template slot-scope="scope">
                                        <div v-if="scope.row && scope.row.keyIndex"
                                             style="position: relative;
                                                width: 40px;
                                                height: 20px;
                                                display: inline-block;
                                                vertical-align: middle;"
                                        >
                                                <span
                                                        style="position: absolute;
                                                               top: -2px;
                                                               left: 4px;">{{scope.row.keyIndex}}</span>
                                            <i
                                                    style="margin-top: -2px;
                                                          margin-left: 0;
                                                          font-size: 42px;
                                                          color: #dddee1;
                                                          cursor: pointer;
                                                          font-weight: 100;
                                                          position: absolute;
                                                          top: 0;
                                                          left: 0;"
                                                    class="iconfont icon-shuqian"></i>
                                        </div>
                                        <span v-else></span>
                                        <span>{{scope.row.groupName ? scope.row.groupName : '--'}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    :render-header="billHeader"
                            >
                                <el-table-column
                                        align="center"
                                        label="收入"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.CurrentInAmount">
                                            {{scope.row.CurrentInAmount|moneyFormatTemp}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="支出"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                       <span v-if="scope.row.CurrentOutAmount">
                                            {{scope.row.CurrentOutAmount|moneyFormatTemp}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="合计"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                       <span v-if="scope.row.CurrentSumAmount">
                                            {{scope.row.CurrentSumAmount|moneyFormatTemp}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    :render-header="reconciliationHeader"
                            >
                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationHisHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillRemoveInAmount">
                                                    {{scope.row.HangBillRemoveInAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                              <span v-if="scope.row.HangBillRemoveOutAmount">
                                                    {{scope.row.HangBillRemoveOutAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                              <span v-if="scope.row.HangBillRemoveSumAmount">
                                                    {{scope.row.HangBillRemoveSumAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationAddHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillAddInAmount">
                                                    {{scope.row.HangBillAddInAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillAddOutAmount">
                                                    {{scope.row.HangBillAddOutAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillAddSumAmount">
                                                    {{scope.row.HangBillAddSumAmount|moneyFormatTemp}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationSuccessHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                             <span v-if="scope.row.SuccessInAmount">
                                                {{scope.row.SuccessInAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.SuccessOutAmount">
                                                {{scope.row.SuccessOutAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.SuccessSumAmount">
                                                {{scope.row.SuccessSumAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationErrorHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.ErrorInAmount">
                                                {{scope.row.ErrorInAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                             <span v-if="scope.row.ErrorOutAmount">
                                                {{scope.row.ErrorOutAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                             <span v-if="scope.row.ErrorSumAmount">
                                                {{scope.row.ErrorSumAmount|moneyFormatTemp}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                            </el-table-column>
                        </el-table>
                        <warnup-spin
                                v-if="spinShow_amount"></warnup-spin>
                    </TabPane>
                    <TabPane label="笔数" name="1">
                        <el-table
                                class="mineTable"
                                :data="dataList_count"
                                ref="table"
                                :height="tableHeight"
                                :empty-text="noneText"
                                highlight-current-row
                                border
                                style="width: 100%">
                            <el-table-column
                                    align="center"
                                    label="对账结果"
                                    min-width="98"
                            >
                                <el-table-column
                                        align="center"
                                        label="类目|分类"
                                        min-width="120"
                                        class-name="leftCell"
                                >
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.keyIndex"
                                             style="position: relative;
                                                width: 40px;
                                                height: 20px;
                                                display: inline-block;
                                                vertical-align: middle;"
                                        >
                                                <span
                                                        style="position: absolute;
                                                               top: -2px;
                                                               left: 4px;">{{scope.row.keyIndex}}</span>
                                            <i
                                                    style="margin-top: -2px;
                                                          margin-left: 0;
                                                          font-size: 42px;
                                                          color: #dddee1;
                                                          cursor: pointer;
                                                          font-weight: 100;
                                                          position: absolute;
                                                          top: 0;
                                                          left: 0;"
                                                    class="iconfont icon-shuqian"></i>
                                        </div>
                                        <span>{{scope.row.groupName ? scope.row.groupName : '--'}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    :render-header="billHeader_count"
                            >
                                <el-table-column
                                        align="center"
                                        label="收入"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.CurrentInCount">
                                            {{scope.row.CurrentInCount}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="支出"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                       <span v-if="scope.row.CurrentOutCount">
                                            {{scope.row.CurrentOutCount}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="合计"
                                        min-width="98"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.CurrentSumCount">
                                            {{scope.row.CurrentSumCount}}
                                        </span>
                                        <span v-else>--</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    :render-header="reconciliationHeader_count"
                            >
                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationHisHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillRemoveInCount">
                                                    {{scope.row.HangBillRemoveInCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                             <span v-if="scope.row.HangBillRemoveOutCount">
                                                    {{scope.row.HangBillRemoveOutCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                              <span v-if="scope.row.HangBillRemoveSumCount">
                                                    {{scope.row.HangBillRemoveSumCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationAddHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillAddInCount">
                                                    {{scope.row.HangBillAddInCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                           <span v-if="scope.row.HangBillAddOutCount">
                                                    {{scope.row.HangBillAddOutCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.HangBillAddSumCount">
                                                    {{scope.row.HangBillAddSumCount}}
                                            </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationSuccessHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                             <span v-if="scope.row.SuccessInCount">
                                                {{scope.row.SuccessInCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.SuccessOutCount">
                                                {{scope.row.SuccessOutCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.SuccessSumCount">
                                                {{scope.row.SuccessSumCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        :render-header="reconciliationErrorHeader"
                                        min-width="120"
                                >
                                    <el-table-column
                                            align="center"
                                            label="收入"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.ErrorInCount">
                                                {{scope.row.ErrorInCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="支出"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.ErrorOutCount">
                                                {{scope.row.ErrorOutCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="合计"
                                            min-width="98"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.ErrorSumCount">
                                                {{scope.row.ErrorSumCount}}
                                             </span>
                                            <span v-else>--</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                            </el-table-column>
                        </el-table>
                        <warnup-spin
                                v-if="spinShow_count"></warnup-spin>
                    </TabPane>
                </Tabs>
                <div class="margin-top-10 addInfo">
                    <title-item text="本期新增账单信息" size-type="small" class="margin-top-20 margin-bottom-10"></title-item>
                    <add-reconciliation-info :infoList="sourceList"></add-reconciliation-info>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/reconciliationDaily';
    import ajax from '@/api/reconciliation';
    import {parseTime, moneyFormat} from '@/filters';
    import {reconciliationStatus} from '@/filters/statistics';
    import TitleItem from '_c/title/index';
    import {getDays} from '@/libs/common';
    import AddReconciliationInfo from './reconciliationDaily/addReconciliationInfo';
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';
    import {WarnupSpin} from '_c/warn-up/index';

    export default {
        name: 'reconciliation-daily',
        components: {
            TitleItem,
            AddReconciliationInfo,
            WarnupSpin
        },
        data() {
            return Object.assign({},
                storeData.call(this),
                {
                    disabledDayStatus: false,
                    fundList: [],
                    headerInfo: {},
                    appNameList: [],
                    fundNameList: [],
                    endTimeOptions: {
                        disabledDate: date => {
                            return date && date.valueOf() > Date.now();
                        }
                    },
                    messageHint: '',
                    spinShow_amount: true,
                    spinShow_count: true
                });
        },
        created() {
            this.dateSearch = parseTime(new Date() - 24 * 60 * 60 * 1000, "{y}-{m}-{d}");
            if (this.dateSearch) {
                this.queryParams.checkDate = this.dateSearch.replace(/-/g, '');
                this.asyncFetch();
                this.getSourceInfo();
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
                    } else if (new Date(val) >= currentTime) {
                        this.disabledDayStatus = false;
                    }
                }
            }
        },
        methods: {
            dateChange(val) {
                if (val) {
                    this.getDayAsset(val);
                } else {
                    this.queryParams.checkDate = '';
                }
            },
            datePreAction() {
                let _this = this;
                if (_this.dateSearch) {
                    let preDate = parseTime(new Date(new Date(_this.dateSearch) - 24 * 60 * 60 * 1000), "{y}-{m}-{d}");
                    if (preDate) {
                        _this.dateSearch = preDate;
                        _this.queryParams.checkDate = preDate.replace(/-/g, "");
                        _this.getListMessage(preDate);
                    }
                } else {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '请先选择日期，日期切换快捷键暂不可用！'
                            ]);
                        },
                        duration: 3,
                        closable: true
                    });
                }
            },
            dateNextAction() {
                let _this = this;
                if (_this.dateSearch) {
                    let nextDate = parseTime(new Date(new Date(_this.dateSearch) - (-24 * 60 * 60 * 1000)), "{y}-{m}-{d}");
                    if (nextDate) {
                        _this.dateSearch = nextDate;
                        _this.queryParams.checkDate = nextDate.replace(/-/g, "");
                        _this.getDayAsset(nextDate);
                    }
                } else {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '请先选择日期，日期切换快捷键暂不可用！'
                            ]);
                        },
                        duration: 3,
                        closable: true
                    });
                }
            },
            getListMessage(time) {
                // this.$Message.success({
                //     render: h => {
                //         return h('p', [
                //             '查询' +
                //             time + '对账日报'
                //         ]);
                //     },
                //     duration: .6,
                //     closable: true
                // });
                this.asyncFetch();
                this.getSourceInfo();
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
                        duration: 3,
                        closable: true
                    });
                } else {
                    this.queryParams.checkDate = val.replace(/-/g, "");
                    this.dateSearch = val;
                    this.getListMessage(val);
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
                                    if (it.configName !== '财务调账') {
                                        return it;
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
                    () => {
                        this.spinShow_amount = true;
                        this.spinShow_count = true;
                        this.getCheckOrder();
                        this.getAmountList();
                        this.getCountList();
                    }
                ).catch((e) => {
                    this.spinShow_amount = false;
                    this.spinShow_count = false;
                })
            },
            getSourceInfo() {
                ajax.dailySourceInfo(this.queryParams).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.sourceList = response.data;
                        } else {
                            this.sourceList = [];
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '本期新增账单信息请求未成功',
                            duration: 2,
                            closable: true
                        });
                        this.sourceList = [];
                    }
                }).catch(() => {
                });
            },
            analysisAction() {
                let urlParam = {
                    date: this.dateSearch ? parseTime(this.dateSearch, "{y}-{m}-{d}") : "",
                };
                if (!this.dateSearch) {
                    this.$Message.error({
                        render: h => {
                            return h('p', [
                                '先选择日期'
                            ]);
                        },
                        duration: 3,
                        closable: true
                    });
                    return;
                }
                this.$router.push({
                    name: 'reconciliationDailyAnalysis',
                    query: urlParam
                });
            },
            exportAction() {
                if (this.dataList.length > 0) {
                    if (this.queryParams.checkDate) {
                        let queryParam = {
                            startDate: this.queryParams.checkDate || '',
                            endDate: this.queryParams.checkDate || ''
                        };
                        this.$Modal.confirm({
                            content: '确定要导出&nbsp;' + queryParam.startDate + '&nbsp;的数据?',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                setTimeout(() => {
                                    downloadExcel({
                                        url: baseUrl + 'merchantCheck/Index/importDailySummary',
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
                            content: '请先选择时间',
                            duration: 2,
                            closable: true
                        });
                        return;
                    }
                } else {
                    this.$Message.error({
                        content: '此时间没有数据，无导出数据！',
                        duration: 2,
                        closable: true
                    });
                    return;
                }
            },

            getCheckOrder() {
                let checkDate = this.queryParams.checkDate.slice(0, 4) + '-'
                    + this.queryParams.checkDate.slice(4, 6) + '-'
                    + this.queryParams.checkDate.slice(6);

                ajax.getCheckOrder({
                    "checkTime": checkDate
                }).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.headerInfo.checkOrderNo = response.data.checkOrderNo;
                            this.headerInfo.archiveTime = response.data.archiveTime;
                            this.headerInfo.archiveOperName = response.data.archiveOperName;
                            this.headerInfo.checkStatus = response.data.checkOrderStatus;
                            this.messageHint = '';
                        } else {
                            this.headerInfo.checkOrderNo = '';
                            this.headerInfo.archiveTime = '';
                            this.headerInfo.archiveOperName = '';
                            this.headerInfo.checkStatus = '';
                            this.messageHint = '';
                        }
                    } else {
                        this.headerInfo.checkOrderNo = '';
                        this.headerInfo.archiveTime = '';
                        this.headerInfo.archiveOperName = '';
                        this.headerInfo.checkStatus = '';
                        this.messageHint = '';
                        if (response.errorNo && response.errorNo !== '73000502') {
                            this.$Modal.warning({
                                content: response.msg ? response.msg : '请求未成功',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: () => {
                                    setTimeout(() => {

                                    }, 2000);
                                },
                                onCancel: () => {
                                }
                            });
                        } else {
                            if (response.errorNo === '73000502') {
                                this.messageHint = response.msg || '';
                            }
                        }
                    }
                }).catch(() => {
                    this.headerInfo.checkOrderNo = '';
                    this.headerInfo.archiveTime = '';
                    this.headerInfo.archiveOperName = '';
                    this.headerInfo.checkStatus = '';
                    this.messageHint = '';
                    this.$Modal.warning({
                        content: '请求未成功',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            setTimeout(() => {

                            }, 2000);
                        },
                        onCancel: () => {
                        }
                    });
                });
            },

            getAmountList() {
                this.businessAmountParams.startDate = this.queryParams.checkDate;
                this.businessAmountParams.endDate = this.queryParams.checkDate;

                this.applicationAmountParams.startDate = this.queryParams.checkDate;
                this.applicationAmountParams.endDate = this.queryParams.checkDate;

                this.transactionAmountParams.startDate = this.queryParams.checkDate;
                this.transactionAmountParams.endDate = this.queryParams.checkDate;

                Promise.all([this.getBusinessList(this.businessAmountParams),
                    this.getApplicationList(this.applicationAmountParams),
                    this.getTransactionList(this.transactionAmountParams)
                ]).then(
                    (results) => {
                        const list = results[0].concat(results[1]).concat(results[2]);
                        let resultList = [];
                        list.forEach(it => {
                            it.map((_it, index) => {
                                if (index == 0 || index == 1) {
                                    it[this.amountColumnKeys[index]] = _it;
                                } else {
                                    it[this.amountColumnKeys[index]] = null === _it ? "" : _it.index_value;
                                }
                            });

                            resultList.push(it);
                        });

                        this.dataList = resultList;

                        let baseHeight,
                            moreHeight = 0;
                        if (window.screen.availHeight < 768) {
                            baseHeight = 28;
                        } else {
                            baseHeight = 38;
                        }
                        if (this.dataList.length >0) {
                            this.dataList.forEach(it=>{
                                if (it[1].length > 10) {
                                    moreHeight++;
                                }
                            });

                            this.tableHeight = (resultList.length+1)*baseHeight+(baseHeight-5)*3+moreHeight*23;
                        } else {
                            this.tableHeight = 64+(baseHeight-5)*3;
                        }

                        this.spinShow_amount = false;
                    }
                ).catch((e) => {
                    this.spinShow_amount = false;
                });
            },

            getCountList() {
                this.businessCountParams.startDate = this.queryParams.checkDate;
                this.businessCountParams.endDate = this.queryParams.checkDate;

                this.applicationCountParams.startDate = this.queryParams.checkDate;
                this.applicationCountParams.endDate = this.queryParams.checkDate;

                this.transactionCountParams.startDate = this.queryParams.checkDate;
                this.transactionCountParams.endDate = this.queryParams.checkDate;

                Promise.all([this.getBusinessList(this.businessCountParams),
                    this.getApplicationList(this.applicationCountParams),
                    this.getTransactionList(this.transactionCountParams)]).then(
                    (results) => {
                        let list = results[0].concat(results[1]).concat(results[2]);
                        let resultList = [];
                        list.forEach(it => {
                            it.map((_it, index) => {
                                if (index == 0 || index == 1) {
                                    it[this.countColumnKeys[index]] = _it;
                                } else {
                                    it[this.countColumnKeys[index]] = null == _it ? "" : _it.index_value;
                                }
                            });

                            resultList.push(it);
                        });

                        this.dataList_count = resultList;
                        this.spinShow_count = false;
                    }
                ).catch((e) => {
                    this.spinShow_count = false;
                });
            },

            getBusinessList(params) {
                return new Promise((resolve, reject) => {
                    ajax.summaryDailyIndexData(params).then(response => {
                        if (response.success === true) {
                            if (response.data) {
                                let resultList = [];
                                response.data.forEach(it => {
                                    if ("SUMMATIONGROUP" === it.groupName) {
                                        it.indexInfos.unshift("业务合计");
                                    } else {
                                        it.indexInfos.unshift(it.groupName);
                                    }

                                    it.indexInfos.unshift("业务");
                                    resultList.push(it.indexInfos);
                                });

                                return resolve(
                                    resultList
                                );
                            } else {
                                return reject({});
                            }
                        } else {
                            this.spinShow_amount = false;
                            this.spinShow_count = false;

                            // this.$Message.error({
                            //     content: response.msg ? response.msg : '请求未成功',
                            //     duration: 2,
                            //     closable: true
                            // });
                            return Promise.resolve({});
                        }
                    }).catch(() => {
                    });
                });
            },

            getApplicationList(params) {
                return new Promise((resolve, reject) => {
                    ajax.summaryDailyIndexData(params).then(response => {
                        if (response.success === true) {
                            if (response.data) {
                                let resultList = [];
                                response.data.forEach(it => {
                                    if ("SUMMATIONGROUP" === it.groupName) {
                                        it.indexInfos.unshift("应用合计");
                                    } else {
                                        it.indexInfos.unshift(it.groupName);
                                    }

                                    it.indexInfos.unshift("应用");
                                    resultList.push(it.indexInfos);
                                });

                                return resolve(
                                    resultList
                                );
                            } else {
                                return reject({});
                            }
                        } else {
                            // this.$Message.error({
                            //     content: response.msg ? response.msg : '请求未成功',
                            //     duration: 2,
                            //     closable: true
                            // });
                            return Promise.resolve({});
                        }
                    }).catch(() => {
                    });
                });
            },

            getTransactionList(params) {
                return new Promise((resolve, reject) => {
                    ajax.summaryDailyIndexData(params).then(response => {
                        if (response.success === true) {
                            if (response.data) {
                                let resultList = [];
                                response.data.forEach(it => {
                                    if ("SUMMATIONGROUP" === it.groupName) {
                                        it.indexInfos.unshift("资金合计");
                                    } else {
                                        it.indexInfos.unshift(it.groupName);
                                    }

                                    it.indexInfos.unshift("资金");
                                    resultList.push(it.indexInfos);
                                });

                                return resolve(
                                    resultList
                                );
                            } else {
                                return reject({});
                            }
                        } else {
                            // this.$Message.error({
                            //     content: response.msg ? response.msg : '请求未成功',
                            //     duration: 2,
                            //     closable: true
                            // });
                            return Promise.resolve({});
                        }
                    }).catch(() => {
                    });
                });
            },

        },
        filters: {
            parseTime: (val) => {
                return parseTime(val, "{y}-{m}-{d}");
            },
            checkOrderStatus: (value) => {
                return reconciliationStatus(value);
            },
            moneyFormatTemp: (value) => {
                return moneyFormat(value / 100);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .label-lg {
        &-top {
            margin-top: 40px;
        }
        &-bottom {
            margin-top: 11px;
        }
    }

    @media screen and (max-width: 1308px) {
        .label-lg {
            &-top {
                margin-top: 0;
            }
            &-bottom {
                margin-top: 0;
            }
        }
    }
    body .el-table th.gutter{
        display: table-cell !important;
    }
</style>
