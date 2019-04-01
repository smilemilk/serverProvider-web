<template>
    <div>
        <title-item text="对账操作台" sizeType="small" class="margin-top-20">
            <span v-if="timeRange"><code style="display: inline-block; margin-left: 20px;">日期：</code>{{timeRange}}
            </span>
        </title-item>
        <Card class="searchBox margin-top-10" v-if="!reconciliating">
            <Row>
                <Col span="16" :lg="18" :md="24" :sm="24" :xs="24">
                    <Form ref="queryParams" :model="queryParams" inline :label-width="60" label-position="left">
                        <FormItem label="日期:">
                            <DatePicker v-model="dateSearch"
                                        format="yyyy-MM-dd"
                                        :disabled="true"
                                        :readonly="true"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width: 140px"></DatePicker>
                        </FormItem>
                        <FormItem label="对账结果:"
                                  v-if="(!finishStatus || (finishStatus && finishStatus!=='1')) && this.changeStatus !== '0'">
                            <Select v-model="queryParams.autoCheckStatus"
                                    style="width:140px">
                                <Option v-for="item in checkParamList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="应用:">
                            <Select v-model="queryParams.appConfigId"
                                    style="width:140px">
                                <Option v-for="item in appParamList" :value="item.id" :key="item.value">{{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="通道:">
                            <Select v-model="queryParams.fundConfigId"
                                    style="width:140px">
                                <Option v-for="item in fundParamList" :value="item.id" :key="item.value">
                                     {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Col>
                <Col span="8" :lg="6" :md="24" :sm="24" :xs="24">
                    <Button type="primary" class="margin-right-10" @click="getListAction">查询</Button>
                    <Button type="primary" class="margin-right-10" @click="reconciliationsOpera"
                            v-if="(!finishStatus || (finishStatus && finishStatus!=='1'))  && this.changeStatus !== '0'">
                        重对账
                    </Button>
                    <Button type="primary" class="margin-right-10" @click="archiveAction"
                            v-if="(!finishStatus || (finishStatus && finishStatus!=='1')) && this.changeStatus !== '0'">
                        归档
                    </Button>
                    <Button type="primary" class="margin-right-10" @click="resetCheckAction" v-else>撤销归档</Button>
                    <Tooltip max-width="200" theme="light" content="下载的内容为：当前搜索条件 的数据" placement="bottom">
                        <Button type="primary" class="margin-right-0" @click="exportAction">导出</Button>
                    </Tooltip>
                </Col>
            </Row>
        </Card>
        <Card class="margin-top-10">
            <p v-if="reconciliating" style="text-align: center; margin-bottom: 10px;">正在对账，请等待...</p>

            <Table
                    ref="reconciliations"
                    :loading="loading"
                    :columns="columnsTable"
                    :data="dataList"
                    highlight-row
                    border
                    no-data-text="暂无数据"
                    no-filtered-data-text="暂无筛选结果"
            ></Table>
            <Page
                    :total="total"
                    size="small"
                    show-total
                    show-elevator
                    show-sizer
                    :current="this.queryParams.page"
                    @on-change="handleCurrentPageChange"
                    @on-page-size-change="handlePageSizeChange"></Page>
            <title-item text="通道对账结果" size-type="small"></title-item>
            <Table
                    :columns="columnsTableFund"
                    :data="fundList"
                    no-data-text="暂无数据"
                    highlight-row
                    stripe
                    border
                    width="400"
                    class="tableBorder"
            ></Table>
        </Card>
        <Modal
                class-name="reconciliationsDialog"
                width="70%"
                v-model="showDialog"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <figure style="position: absolute; left: 16px;">
                    <span>{{billDateRange.billStartTime ? billDateRange.billStartTime : '--'}}</span>
                    至
                    <span>{{billDateRange.billEndTime ? billDateRange.billEndTime : '--'}}</span>
                </figure>
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">重对账</title>
            </div>
            <div>
                <section class="operatorSection" v-if="mchConfigArr">
                    <p>医院账单</p>
                    <div>
                        <div @mouseover="hoverAction(item, key)"
                             @mouseout="hoverHiddenAction(item, key)"
                             v-for="(item,key) in mchConfigArr"
                             :class="key < mchConfigArr.length ? 'margin-right-10 inline' : 'inline'"
                             :data-link="item.configId">
                            <div
                                    :class="item.numResult !== '空' ?
                                    'operateItem operatorEmpty borderDark' :
                                     'operateItem operatorEmpty'">
                                <div
                                        :class="idItem === item.configId &&
                                                keyItem === key &&
                                                hoverVisible === true ?
                                                'operateContainer hidden' :
                                                'operateContainer'">
                                    <warnup-load
                                            sizeType="small" v-if="item.isLoading"></warnup-load>
                                    <Icon type="clipboard"></Icon>
                                    <p class="operateName">{{item.configName ? item.configName : ''}}</p>
                                    <p :class="item.numResult !== '空' ? 'dark' : ''">{{item.numResult ? item.numResult :
                                        ''}}</p>
                                </div>
                                <div v-show="idItem === item.configId &&
                                             keyItem === key &&
                                             hoverVisible === true"
                                     class="operateHover">
                                    <div class="operateHoverPull"
                                         @click="pullCheckAction(item)"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isPull === true">
                                        <Icon type="android-download"></Icon>
                                        <p>接口拉取</p>
                                    </div>
                                    <div class="operateHoverPush"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isUpload === true">
                                        <Upload
                                                ref="upload"
                                                multiple
                                                :data="headerParam"
                                                :action="uploadUrl"
                                                :on-format-error="handleFormatError"
                                                :before-upload="handleUpload"
                                                :on-progress="handleProgress"
                                                :show-upload-list="false"
                                                :on-success="uploadSuccess"
                                                accept=".txt,.csv,
                                                       application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                                       application/vnd.ms-excel">
                                            <div @click="uploadCheckAction(item)">
                                                <Icon type="android-upload"></Icon>
                                                <p>上传账单</p>
                                            </div>
                                        </Upload>
                                    </div>
                                </div>
                                <Icon type="close-circled"
                                      v-show="idItem === item.configId &&
                                             keyItem === key &&
                                             deleteStatus === true"
                                      class="deleteIcon"
                                      @click="emptyOpera(item)"></Icon>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="operatorSection margin-top-10" v-if="fundConfigArr">
                    <p>资金通道</p>
                    <div>
                        <div @mouseover="hoverAction(item, key)"
                             @mouseout="hoverHiddenAction(item, key)"
                             v-for="(item,key) in fundConfigArr" :class="key < fundConfigArr.length ?
                              'margin-right-10 inline' : 'inline'"
                             :data-link="item.configId">
                            <div :class="item.numResult !== '空' ?
                            'operateItem operatorEmpty borderDark' : 'operateItem operatorEmpty'">
                                <div :class="idItem === item.configId && keyItem === key && hoverVisible === true ?
                                'operateContainer hidden' : 'operateContainer'">
                                    <warnup-load
                                            sizeType="small" v-if="item.isLoading"></warnup-load>
                                    <Icon type="clipboard"></Icon>
                                    <p class="operateName">{{item.configName ? item.configName : ''}}</p>
                                    <p :class="item.numResult !== '空' ? 'dark' : ''">{{item.numResult ? item.numResult :
                                        ''}}</p>
                                </div>
                                <div v-show="idItem === item.configId &&
                                             keyItem === key &&
                                             hoverVisible === true"
                                     class="operateHover">
                                    <div class="operateHoverPull"
                                         @click="pullCheckAction(item)"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isPull === true">
                                        <Icon type="android-download"></Icon>
                                        <p>接口拉取</p>
                                    </div>
                                    <div class="operateHoverPush"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isUpload === true">
                                        <Upload
                                                ref="upload"
                                                multiple
                                                :data="headerParam"
                                                :action="uploadUrl"
                                                :on-format-error="handleFormatError"
                                                :before-upload="handleUpload"
                                                :on-progress="handleProgress"
                                                :show-upload-list="false"
                                                :on-success="uploadSuccess"
                                                accept=".txt,.csv,
                                                       application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                                       application/vnd.ms-excel">
                                            <div @click="uploadCheckAction(item)">
                                                <Icon type="android-upload"></Icon>
                                                <p>上传账单</p>
                                            </div>
                                        </Upload>
                                    </div>
                                </div>
                                <Icon type="close-circled"
                                      v-show="idItem === item.configId &&
                                             keyItem === key &&
                                             deleteStatus === true"
                                      class="deleteIcon"
                                      @click="emptyOpera(item)"></Icon>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="operatorSection margin-top-10" v-if="appConfigArr">
                    <p>业务系统账单</p>
                    <div>
                        <div @mouseover="hoverAction(item, key)"
                             @mouseout="hoverHiddenAction(item, key)"
                             v-for="(item,key) in appConfigArr"
                             :class="key < appConfigArr.length ? 'margin-right-10 inline' : 'inline'">
                            <div :class="item.numResult !== '空' ?
                            'operateItem operatorEmpty borderDark' : 'operateItem operatorEmpty'">
                                <div :class="idItem === item.configId && keyItem === key && hoverVisible === true ?
                                'operateContainer hidden' : 'operateContainer'">
                                    <warnup-load
                                            sizeType="small" v-if="item.isLoading"></warnup-load>
                                    <Icon type="clipboard"></Icon>
                                    <p class="operateName">{{item.configName ? item.configName : ''}}</p>
                                    <p :class="item.numResult !== '空' ? 'dark' : ''">{{item.numResult ? item.numResult :
                                        ''}}</p>
                                </div>
                                <div
                                        v-show="
                                            idItem === item.configId &&
                                            keyItem === key &&
                                            hoverVisible === true"
                                        class="operateHover">
                                    <div class="operateHoverPull"
                                         @click="pullCheckAction(item)"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isPull === true">
                                        <Icon type="android-download"></Icon>
                                        <p>接口拉取</p>
                                    </div>
                                    <div class="operateHoverPush"
                                         v-if="idItem === item.configId &&
                                             keyItem === key &&
                                             item.isUpload === true">
                                        <Upload
                                                ref="upload"
                                                multiple
                                                :data="headerParam"
                                                :action="uploadUrl"
                                                :on-format-error="handleFormatError"
                                                :before-upload="handleUpload"
                                                :on-progress="handleProgress"
                                                :show-upload-list="false"
                                                :on-success="uploadSuccess"
                                                accept=".txt,.csv,
                                                       application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                                       application/vnd.ms-excel">
                                            <div @click="uploadCheckAction(item)">
                                                <Icon type="android-upload"></Icon>
                                                <p>上传账单</p>
                                            </div>
                                        </Upload>
                                    </div>
                                </div>
                                <Icon type="close-circled"
                                      v-show="idItem === item.configId &&
                                             keyItem === key &&
                                             deleteStatus === true"
                                      class="deleteIcon"
                                      @click="emptyOpera(item)"></Icon>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                        <div class="reconciliationsBottom">
                            <label>历史对账结果</label>
                            <Button :type="keepSuccess === true ? 'primary' : 'default'"
                                    shape="circle" size="small"
                                    @click="checkToggle(keepSuccess, 1)">保留

                            </Button>
                            <Button :type="keepSuccess === false ? 'primary' : 'default'"
                                    shape="circle" size="small"
                                    @click="checkToggle(keepSuccess, 2)">不保留

                            </Button>
                        </div>
                    </Col>
                    <Col span="12">
                        <Button type="primary" size="large" @click="submitCheckAction">开始对账</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
        <hand-reconciliation
                ref="handleShow"
                :checkNo="checkNo"
                :appParamList="appParamList"
                :fundParamList="fundParamList"
                @on-success="getList"></hand-reconciliation>
        <Modal
                class-name="reconciliationsFundDialog"
                width="70%"
                v-model="handleFundDialog"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">资金通道账单</title>
            </div>
        </Modal>
    </div>
</template>

<script>
    import storeData from './store/statisticsReports';
    import HandReconciliation from './statisticsReport/handReconciliation';
    import {parseTime} from '@/filters';
    import {directionStatistics} from '@/filters/statistics';
    import ajax from '@/api/statistics';
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';
    import TitleItem from '_c/title/index';
    import {WarnupLoad} from '_c/warn-up/index';

    export default {
        name: 'statistics-report',
        components: {
            TitleItem,
            WarnupLoad,
            HandReconciliation
        },
        data() {
            return Object.assign({}, storeData.call(this), {
                checkNo: null,
                autoCheckNo: '',
                finishStatus: '', // 已归档和未归档 页面和逻辑区分关键值
                changeStatus: '', // 用来判断后续有无 撤销归档，'1'表示撤销归档，这个时候 仅finishStatus 为1 不适用了
                timeout: undefined,
                reconciliating: false
            });
        },
        created() {
            this.queryParams.checkOrderNo = this.$route.query.checkOrderNo || '';
            this.dateSearch = this.$route.query.startDate ? this.$route.query.startDate : "";
            this.queryParams.autoCheckStatus = this.checkParamList[0].id;
            this.getOrderStatus();
            this.getAppParam();
            this.getFundParam();
            this.getList();
            this.uploadUrl = baseUrl + 'portal/doCheck/uploadFile';
            if (this.$route.query.status && this.$route.query.status === 'finish' && this.changeStatus === '0') {
                this.finishStatus = '1';
            }
        },
        computed: {
            timeRange() {
                if (this.$route.query.startDate && this.$route.query.endDate) {
                    return this.$route.query.startDate + ' — ' + this.$route.query.endDate
                } else {
                    return '';
                }
            }
        },
        mounted() {
            let maxHeight = window.innerHeight - this.$refs.reconciliations.$el.offsetTop
                - document.querySelector(".main-header-con").clientHeight - document.querySelector('.searchBox').clientHeight - 44;
            let tableCount;
            if (window.screen.availHeight < 768) {
                tableCount = 32 * 11;
            } else {
                tableCount = 48 * 11;
            }
            if (maxHeight > tableCount) {
                maxHeight = tableCount;
            }
            this.tableHeight = maxHeight;
        },
        methods: {
            getOrderStatus() {
                ajax.orderNo({checkOrderNo: this.$route.query.checkOrderNo || ''}).then(response => {
                    if (response.data && response.data.unioncheckorderStatus) {
                        if (response.data.unioncheckorderStatus === '6' || response.data.unioncheckorderStatus === 6) {
                            this.changeStatus = '0';
                        } else {
                            this.changeStatus = '1';
                        }
                    } else {
                        this.changeStatus = '0';
                    }
                }).catch(() => {
                    this.changeStatus = '0';
                });
            },
            getAppParam() {
                ajax.getAppList({configType: '应用数据'}).then(response => {
                    if (response.success === true) {
                        if (response.data.items) {
                            let res = [{
                                id: 'all',
                                value: '不限'
                            }];
                            for (let i in response.data.items) {
                                res.push({
                                    id: response.data.items[i].configId,
                                    value: response.data.items[i].configName
                                })
                            }
                            this.appParamList = res;
                            this.queryParams.appConfigId = this.appParamList[0].id;
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '搜索条件应用请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getFundParam() {
                ajax.getAppList({configType: '收款通道'}).then(response => {
                    if (response.success === true) {
                        if (response.data.items) {
                            let res = [{
                                id: 'all',
                                value: '不限'
                            }];
                            let indexGroup = [];
                            for (let i in response.data.items) {
                                if (response.data.items[i].configName !== '财务调账') {
                                    res.push({
                                        id: response.data.items[i].configId,
                                        value: response.data.items[i].configName
                                    });
                                    indexGroup.push(response.data.items[i].configName);
                                }

                            }
                            this.fundParamList = res;
                            this.queryParams.fundConfigId = this.fundParamList[0].id;

                            let indexCodeGroup = "TransactionSumCount";
                            indexGroup.push("资金通道(汇总)");
                            this.getBatchList(indexCodeGroup, indexGroup);
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '搜索条件通道请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getList() {
                let queryList = this.queryParams;

                if (this.loading = false) {
                    this.loading = true;
                }

                if (this.queryParams.autoCheckStatus === 'all') {
                    queryList = {
                        ...queryList,
                        autoCheckStatus: ''
                    };
                }
                if (this.queryParams.appConfigId === 'all') {
                    queryList = {
                        ...queryList,
                        appConfigId: ''
                    };
                }
                if (this.queryParams.fundConfigId === 'all') {
                    queryList = {
                        ...queryList,
                        fundConfigId: ''
                    };
                }
                ajax.summaryCheck(queryList).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data.items) {
                            this.dataList = response.data.items;
                            this.total = response.data.totalCount;
                        } else {
                            this.dataList = [];
                            this.total = 0;
                            this.queryParams.page = 1;
                        }
                    } else {
                        this.loading = false;
                        this.dataList = [];
                        this.total = 0;
                        this.queryParams.page = 1;
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账操作表单请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.loading = false;
                });
            },
            getListAction() {
                this.handleCurrentPageChange(1);
            },
            archiveAction() {
                ajax.archiveOpera({
                    unioncheckorderNo: this.queryParams.checkOrderNo
                }).then(response => {
                    if (response.success === true) {
                        this.$Modal.success({
                            content: '归档成功',
                            okText: '确定',
                            cancelText: '取消',
                            loading: true,
                            closable: false,
                            mask: true,
                            maskClosable: false,
                            onOk: () => {
                                setTimeout(() => {
                                    // this.$router.push({
                                    //     name: 'checkReport',
                                    //     query: {
                                    //         checkOrderNo: this.$route.query.checkOrderNo || '',
                                    //         startDate: this.$route.query.startDate || '',
                                    //     }
                                    // });
                                    this.finishStatus = '1';
                                    this.changeStatus = '1';
                                    this.getList();
                                    this.getFundParam();
                                    this.$Modal.remove();
                                }, 600);
                            }
                        });
                    } else {
                        this.loading = false;
                        this.$Message.error({
                            content: response.msg ? response.msg : '归档请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getBatchList(indexCodeGroup, indexGroup) {
                let params = {
                    checkOrderNos: this.queryParams.checkOrderNo,
                    indexCodeGroup: indexCodeGroup,
                    indexGroup: indexGroup.toString()
                };
                ajax.batchResult(params).then(response => {
                    if (response.success === true) {
                        if (response.data.items) {
                            this.fundList = response.data.items;
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '通道对账结果请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            handleCurrentPageChange(val) {
                this.queryParams.page = val;
                this.getList();
            },
            handlePageSizeChange(val) {
                this.queryParams.limit = val;
                this.getList();
            },
            // 归档撤销
            resetCheckAction() {
                this.$Modal.confirm({
                    content: '确定要归档撤销吗',
                    okText: '确定',
                    cancelText: '取消',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            ajax.cancelCheck(
                                {unioncheckorderNo: this.queryParams.checkOrderNo || ''}
                            ).then(response => {
                                if (response.success === true) {
                                    this.$Modal.remove();
                                    this.$Message.success(response.msg ? response.msg : '归档撤销成功');
                                    this.finishStatus = '0';
                                    this.changeStatus = '1';
                                    this.getListAction();
                                } else {
                                    this.$Modal.remove();
                                    this.changeStatus = '0';
                                    this.$Message.error({
                                        content: response.msg ? response.msg : '归档撤销失败',
                                        duration: 10,
                                        closable: true
                                    });
                                }
                            }).catch(() => {
                                this.changeStatus = '0';
                            });
                        }, 2000);
                    },
                    onCancel: () => {
                        this.$Message.warning({
                            content: '已取消归档撤销',
                            closable: false
                        });
                    }
                });
            },
            // 重对账 begin ---------------------------------
            reconciliationsOpera() {
                this.keepSuccess = true;
                this.showDialog = true;
                this.billDateRange.billStartTime = this.$route.query.startDate;
                this.billDateRange.billEndTime = this.$route.query.endDate;
                this.getCheckSummary();
            },
            // 对账 查看配置
            getCheckSummary() {
                ajax.getCheckSummary(
                    this.billDateRange
                ).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            if (response.data.configList) {
                                const res = response.data.configList;

                                this.checkBillCount = response.data.checkBillCount;
                                let mchConfigArr = [], // HIS 交易方数据
                                    appConfigArr = [], // 应用数据
                                    fundConfigArr = []; // 资金通道
                                res.forEach((it) => {
                                    this.$set(it, 'numResult', '空');
                                    this.$set(it, 'dataCount', 0);
                                    this.$set(it, 'createUpload', false);
                                    this.$set(it, 'isUpload', false);
                                    this.$set(it, 'isDelete', false);
                                    this.$set(it, 'isPull', false);
                                    if (it.value && JSON.parse(it.value) instanceof Array) {
                                        const sourceTypes = eval(it.value);
                                        sourceTypes.map(item => {
                                            if (item.sourceType === '1' || item.sourceType === 1) {
                                                this.$set(it, 'isUpload', true);
                                            } else if (item.sourceType === '2' || item.sourceType === 2) {
                                                this.$set(it, 'isPull', true);
                                            }
                                        })
                                    }
                                    if (it.configType === '交易方数据') {
                                        if (it.configName !== '财务调账') {
                                            mchConfigArr.push(it);
                                        }
                                    } else if (it.configType === '应用数据') {
                                        if (it.configName !== '财务调账') {
                                            appConfigArr.push(it);
                                        }
                                    } else if (it.configType === '收款通道') {
                                        if (it.configName !== '财务调账') {
                                            fundConfigArr.push(it);
                                        }
                                    }
                                });
                                this.mchConfigArr = mchConfigArr;
                                this.fundConfigArr = fundConfigArr;
                                this.appConfigArr = appConfigArr;
                                this.getCheckHistory();
                            }
                        } else {
                            this.$Message.error({
                                content: response.msg ? response.msg : '对账配置数据有异常',
                                duration: 10,
                                closable: true
                            });
                        }
                    } else {
                        this.$Message.error(response.msg ? response.msg : '对账配置接口未成功');
                    }
                }).catch(() => {
                });
            },
            // 对账 历史
            getCheckHistory() {
                ajax.getHistoryCheck(
                    this.billDateRange
                ).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            if (response.data.f730035ResLists) {
                                const res = response.data.f730035ResLists;

                                for (let i in res) {
                                    this.mchConfigArr.map(it => {
                                        if (it.configId + '' === res[i].configId + '') {
                                            this.$set(it, 'isUpdown', false);
                                            this.$set(it, 'isDelete', false);
                                            this.$set(it, 'numResult', res[i].count + '条');
                                            this.$set(it, 'operated', 'operated');
                                        }
                                    });
                                    this.fundConfigArr.map(it => {
                                        if (it.configId + '' === res[i].configId + '') {
                                            this.$set(it, 'isUpdown', false);
                                            this.$set(it, 'isDelete', false);
                                            this.$set(it, 'numResult', res[i].count + '条');
                                            this.$set(it, 'operated', 'operated');
                                        }
                                    });
                                    this.appConfigArr.map(it => {
                                        if (it.configId + '' === res[i].configId + '') {
                                            this.$set(it, 'isUpdown', false);
                                            this.$set(it, 'isDelete', false);
                                            this.$set(it, 'numResult', res[i].count + '条');
                                            this.$set(it, 'operated', 'operated');
                                        }
                                    });
                                }
                            }
                        } else {
                            this.$Message.error({
                                content: response.msg ? response.msg : '对账历史数据有异常',
                                duration: 10,
                                closable: true
                            });
                        }
                    } else {
                        this.$Message.error(response.msg ? response.msg : '对账历史接口未成功');
                    }
                }).catch(() => {
                });
            },
            // 对账 hover上传模块展示
            hoverAction(item, key) {
                this.keyItem = key;
                this.idItem = item.configId;
                this.deleteStatus = item.numResult !== '空' ? true : false;
                if (this.deleteStatus === false) {
                    this.hoverVisible = true;
                } else {
                    this.hoverVisible = false;
                }
            },
            hoverHiddenAction(item, key) {
                this.idItem = item.configId;
                this.keyItem = key;
                this.deleteStatus = false;
                this.hoverVisible = false;
            },
            // ---对账内部操作 begin ----
            checkToggle(status, key) {
                if (key === 1) {
                    if (status === true) {
                        this.keepSuccess = false;
                    } else {
                        this.keepSuccess = true;
                    }
                }
                if (key === 2) {
                    if (status === true) {
                        this.keepSuccess = false;
                    } else {
                        this.keepSuccess = true;
                    }
                }
            },
            emptyOpera(item) {
                this.canNextStatus = false;

                this.showDialog = false;
                this.$Modal.confirm({
                    content: '确定要删除吗',
                    okText: '确定',
                    cancelText: '关闭',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            let queryParam = Object.assign({},
                                this.billDateRange, {configId: item.configId || ''});
                            ajax.deleteCheck(
                                queryParam
                            ).then(response => {
                                this.canNextStatus = true;

                                if (response.success === true) {
                                    this.$Modal.remove();
                                    this.$Message.success(response.msg ? response.msg : '删除成功');
                                    this.getCheckSummary();
                                    this.getCheckHistory();
                                    this.showDialog = true;
                                } else {
                                    this.$Modal.remove();
                                    this.$Message.error({
                                        content: response.msg ? response.msg : '删除失败',
                                        duration: 10,
                                        closable: true
                                    });
                                    this.showDialog = true;
                                }
                            }).catch(() => {
                                this.canNextStatus = true;

                                this.$Modal.remove();
                                this.$Message.error({
                                    content: '删除失败',
                                    duration: 10,
                                    closable: true
                                });
                                this.showDialog = true;
                            });
                        }, 2000);
                    },
                    onCancel: () => {
                        this.showDialog = true;

                        this.canNextStatus = true;
                    }
                });
            },
            // 对账 接口拉取
            pullCheckAction(item) {
                this.canNextStatus = false;

                if (item.isLoading == true) {
                    this.$Message.info({
                        content: '该接口正在拉取，请等待',
                        duration: 0.6,
                    });
                    return;
                }

                this.showDialog = true;
                this.$Modal.remove();
                this.$set(item, 'isLoading', true);
                this.pullCheckFetch(item);
            },
            pullCheckFetch(item) {

                let queryParam = Object.assign({},
                    this.billDateRange, {configId: item.configId || ''});
                ajax.pullCheck(
                    queryParam
                ).then(response => {
                    this.canNextStatus = true;

                    if (response.success === true) {
                        this.$Modal.remove();
                        this.$set(item, 'isLoading', false);
                        this.$Message.success(response.msg ? response.msg : '接口拉取成功');
                        this.getCheckSummary();
                        this.getCheckHistory();
                        this.showDialog = true;
                    } else {
                        this.$set(item, 'isLoading', false);
                        this.$Modal.remove();
                        this.$Message.error({
                            content: response.msg ? response.msg : '接口拉取失败',
                            duration: 10,
                            closable: true
                        });
                        this.showDialog = true;
                    }
                }).catch(() => {
                    this.$set(item, 'isLoading', false);
                    this.$Modal.remove();
                    this.$Message.info({
                        content: '数据拉取失败',
                        duration: 10,
                        closable: true
                    });
                    this.showDialog = true;

                    this.canNextStatus = true;
                });
            },
            uploadCheckAction(item) { // 对账 上传按钮
                this.headerParam = Object.assign({}, this.billDateRange,
                    {
                        configId: item.configId || '',
                        timestamp: ''
                    }
                );
            },
            handleUpload(file) { // 上传文件前的事件钩子
                if (file) {
                    this.showDialog = true;
                    this.file = null;
                    this.headerParam = Object.assign({}, this.headerParam, {timestamp: file.lastModified});
                    this.fileList.push(file);
                    // 保存文件到需要上传的文件数组里
                    this.uploadFile.push(file);
                }
            },
            handleProgress(event, file) {
                this.canNextStatus = false;

                this.$Modal.confirm({
                    content: '文件 ' + file.name + ' 正在上传...',
                });
            },
            handleFormatError(file) {
                this.canNextStatus = true;

                this.$Modal.confirm({
                    content: '文件 ' + file.name + ' 格式不正确，请选择图片文件。',
                    okText: '确定',
                    cancelText: '取消',
                });
                this.headerParam = {};
            },
            uploadSuccess(res, file) { // 文件上传回调 上传成功后删除待上传文件
                if (res.success === true) {
                    this.$Modal.confirm({
                        content: '文件 ' + file.name + '上传成功',
                        okText: '确定',
                    });
                    this.getCheckSummary();
                    this.getCheckHistory();
                    this.showDialog = true;
                    this.headerParam = {};

                    this.canNextStatus = true;
                } else {
                    this.$Modal.warning({
                        content: '文件 ' + file.name + res.msg ? res.msg : '上传失败',
                        okText: '确定',
                    });
                    this.showDialog = true;
                    this.headerParam = {};

                    this.canNextStatus = true;
                }
            },
            submitCheckAction() {
                if (this.checkBillCount !== 0 || this.checkBillCount !== null) {

                    if (this.canNextStatus == false) {
                        setTimeout(() => {
                            this.$Message.info({
                                content: '存在未完成的拉取或上传的账单！',
                                duration: 0.6,
                            });
                        }, 600);
                        return;
                    }

                    this.showDialog = false;
                    this.$Modal.confirm({
                        content: '当前选择的对账周期内已存在对账记录，再次发起对账会覆盖原有对账记录，继续对账吗？',
                        okText: '继续',
                        cancelText: '放弃',
                        loading: true,
                        onOk: () => {
                            this.showDialog = true;
                            setTimeout(() => {
                                let queryParam = Object.assign({},
                                    this.billDateRange, {keepSuccess: this.keepSuccess});
                                ajax.submitCheck(
                                    queryParam
                                ).then(response => {
                                    if (response.success === true) {
                                        this.$Modal.remove();
                                        this.$Message.success(response.msg ? response.msg : '对账中，请稍等');
                                        this.showDialog = false;

                                        this.reReconciliationsFetch();
                                    } else {
                                        this.$Modal.remove();
                                        this.$Message.error({
                                            content: response.msg ? response.msg : '对账失败',
                                            duration: 2,
                                            closable: true
                                        });
                                        this.showDialog = true;
                                    }
                                }).catch(() => {
                                    this.$Message.error({
                                        content: '对账失败',
                                        duration: 2,
                                        closable: true
                                    });
                                });
                            }, 2000);
                        },
                        onCancel: () => {
                            this.showDialog = true;
                        }
                    });
                    return;
                }
            },
            reReconciliationsFetch() {
                let _this = this;
                ajax.orderNo({checkOrderNo: this.queryParams.checkOrderNo || ''}).then(response => {
                    if (response.data && response.data.unioncheckorderStatus) {
                        if (response.data.unioncheckorderStatus === '1' || response.data.unioncheckorderStatus === 1) { // 1是对账中
                            _this.loading = true;
                            _this.dataList = [];
                            _this.total = 0;
                            _this.queryParams.page = 1;
                            _this.reconciliating = true;
                            setTimeout (()=> {
                                _this.reReconciliationsFetch();
                            }, 10000);
                        } else {
                            _this.getList();
                            _this.getFundParam();
                            _this.reconciliating = false;
                        }
                    } else {
                        _this.getList();
                        _this.reconciliating = false;
                    }
                }).catch(() => {
                });
            },
            // ---对账内部操作 end ----
            // 重对账 end ---------------------------------
            handleAction(row) {
                this.$refs.handleShow.show(row, this.queryParams.checkOrderNo, this.dateSearch);
            },
            //手工勾对弹框 内部编辑操作 end
            exportAction() {
                if (this.dataList.length > 0) {
                    if (this.$route.query.startDate) {

                        let queryList = {
                            checkDate: parseTime(this.dateSearch, '{y}-{m}-{d}').replace(/-/g, "") || ''
                        };
                        if (this.queryParams.autoCheckStatus === 'all') {
                            queryList = {
                                ...queryList,
                                autoCheckStatus: '',
                            };
                        } else {
                            queryList = {
                                ...queryList,
                                autoCheckStatus: this.queryParams.autoCheckStatus
                            };
                        }
                        if (this.queryParams.appConfigId === 'all') {
                            queryList = {
                                ...queryList,
                                appConfigId: ''
                            };
                        } else {
                            queryList = {
                                ...queryList,
                                appConfigId: this.queryParams.appConfigId
                            };
                        }
                        if (this.queryParams.fundConfigId === 'all') {
                            queryList = {
                                ...queryList,
                                fundConfigId: ''
                            };
                        } else {
                            queryList = {
                                ...queryList,
                                fundConfigId: this.queryParams.fundConfigId
                            };
                        }
                        let queryParam = Object.assign({}, queryList, {
                            checkOrderNo: this.queryParams.checkOrderNo || '',
                        });
                        this.$Modal.confirm({
                            content: '确定要导出&nbsp;' + this.$route.query.startDate + '&nbsp;的数据?',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                setTimeout(() => {
                                    downloadExcel({
                                        url: baseUrl + 'merchantCheck/downloadSummaryCheckDetail',
                                        input: queryParam,
                                        method: 'get'
                                    });
                                }, 2000);
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
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    @media screen and (max-height: 786px) {

    }
</style>
