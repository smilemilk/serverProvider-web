<template>
    <div>
        <title-item text="挂账处理查询" class="margin-top-20" sizeType="small"></title-item>
        <Card class="searchBox margin-top-10">
            <Row>
                <Col span="20" :lg="20" :md="20" :sm="24" :xs="24">
                    <Form ref="queryParams"
                          :model="queryParams"
                          inline
                          :label-width="66"
                          label-position="left"
                          class="margin-bottom-0">
                        <FormItem label="处理时间:" prop="dateSearch">
                            <DatePicker v-model="dateSearch"
                                        format="yyyy-MM-dd"
                                        type="daterange"
                                        placement="bottom-start"
                                        placeholder="选择开始日期—结束日期"
                                        style="width: 180px"
                                        :options="endTimeOptions"
                                        @on-change="dateChange"
                            ></DatePicker>
                        </FormItem>
                        <FormItem label="账单类型:">
                            <Select v-model="queryParams.billType"
                                    style="width:100px">
                                <Option v-for="item in billTypeList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="方向:">
                            <Select v-model="queryParams.direction"
                                    style="width:100px">
                                <Option v-for="item in directionList" :value="item.id" :key="item.value">{{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="处理类型:">
                            <Select v-model="queryParams.dealType"
                                    style="width:100px">
                                <Option v-for="item in dealTypeList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Col>
                <Col span="4" :lg="4" :md="4" :sm="24" :xs="24">
                    <Button type="primary" class="margin-right-10" @click="getList">查询</Button>
                </Col>
            </Row>
        </Card>
        <Card class="margin-top-10">
            <Row>
                <Col span="24" class="right margin-bottom-10">
                    <Button type="primary" @click="exportAction">导出</Button>
                </Col>
            </Row>
            <Table
                    ref="table"
                    :loading="loading"
                    :columns="columnsTable"
                    :data="dataList"
                    highlight-row
                    border
                    no-data-text="暂无数据"
                    no-filtered-data-text="暂无筛选结果"
            ></Table>
        </Card>
    </div>
</template>

<script>
    import storeData from './store/dealReconciliation';
    import {parseTime} from '@/filters';
    import {getDays} from '@/libs/common'
    import ajax from '@/api/reconciliation';
    import TitleItem from '_c/title/index';
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';

    export default {
        name: 'deal-reconciliation',
        components: {
            TitleItem
        },
        data() {
            return Object.assign({},
                storeData.call(this),
                {
                    exportQuery: {},
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

            this.queryParams.billType = this.billTypeList[0].id;
            this.queryParams.direction = this.directionList[0].id;
            this.queryParams.dealType = this.dealTypeList[0].id;
            this.dateSearch = [this.queryParams.startDate, this.queryParams.endDate];
            this.getList();
        },
        computed: {

        },
        mounted() {

        },
        methods: {
            // 获取当前月的第一天
            getCurrentMonthFirst(){
                let date = new Date();
                date.setDate(1);
                this.queryParams.startDate = parseTime(date.setDate(1), '{y}-{m}-{d}').replace(/-/g, '');
                return date;
            },
            // 获取当前月的最后一天
            getCurrentMonthLast(){
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
                            // this.$Message.success({
                            //     render: h => {
                            //         return h('p', [
                            //             '查询' +
                            //             this.queryParams.startDate + '至' +
                            //             this.queryParams.endDate + '对账数据'
                            //         ])
                            //     },
                            //     duration: 3,
                            //     closable: true
                            // });
                            // this.getList();
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
            getList() {
                let queryList = this.queryParams;
                if (this.queryParams.billType === 'all') {
                    queryList = {
                        ...queryList,
                        billType: ''
                    };
                }
                if (this.queryParams.direction === 'all') {
                    queryList = {
                        ...queryList,
                        direction: ''
                    };
                }
                if (this.queryParams.dealType === 'all') {
                    queryList = {
                        ...queryList,
                        dealType: ''
                    };
                }
                this.exportQuery = queryList;
                ajax.getDealList(queryList).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data) {
                            if (response.data.length > 0) {
                                for (let i=0; i<response.data.length; i++) {
                                    response.data[i].indexNo=i+1;
                                }
                                this.dataList = response.data;
                            } else {
                                this.dataList = [];
                            }
                        } else {
                            this.dataList = [];
                        }
                    } else {
                        this.dataList = [];
                        this.loading = false;
                        this.$Message.error({
                            content: response.msg ? response.msg : '挂账查询请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.dataList = [];
                    this.loading = false;
                });
            },
            exportAction() {
                if (this.dataList.length > 0) {
                    if (this.exportQuery.startDate && this.exportQuery.endDate) {
                        let queryParam = {
                            startDate: this.exportQuery.startDate || "",
                            endDate: this.exportQuery.endDate || "",
                            billType: this.exportQuery.billType || "",
                            dealType: this.exportQuery.dealType || "",
                            direction: this.exportQuery.direction || ""
                        };
                        this.$Modal.confirm({
                            content: '确定要导出&nbsp;' + this.exportQuery.startDate + '&nbsp;至&nbsp;' + this.exportQuery.endDate + '&nbsp;, 当前列表展示的数据?',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                setTimeout(() => {
                                    downloadExcel({
                                        url: baseUrl+'merchantCheck/Index/importRecordCheckInfo',
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
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    @media screen and (max-height: 786px) {

    }
</style>
