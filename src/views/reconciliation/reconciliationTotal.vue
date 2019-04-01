<template>
    <div class="home-container">
        <div class="homeBox">
            <title-item text="总账报表" sizeType="small" class="margin-top-20"></title-item>
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
                <Table
                        ref="table"
                        :loading="loading"
                        :columns="columnsTable"
                        :data="dataList"
                        highlight-row
                        border
                        :height="tableHeight"
                        :no-data-text="noneText"
                        :no-filtered-data-text="filterText"
                        :row-class-name="rowOpera"
                ></Table>
            </Card>
        </div>
    </div>
</template>

<script>
    import storeData from './store/reconciliationTotal';
    import ajax from '@/api/reconciliation';
    import {parseTime} from '@/filters';
    import TitleItem from '_c/title/index';
    import {getDays} from '@/libs/common'
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';

    export default {
        name: 'reconciliation-total',
        components: {
            TitleItem
        },
        data() {
            return Object.assign({}, storeData.call(this), {
                hideStatus: false,
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

            if(this.dateSearch) {
                this.getList();
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
                            this.getList();
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
                ajax.summaryData(this.queryParams).then(response => {
                    if (response.success === true) {
                        this.loading = false;

                        if (response.data) {
                            let data = response.data;

                            let transferDataList = [];

                            data.forEach((item) => {
                                let listItem = {};
                                listItem[this.columnsKey[0]] = item.checkDate;
                                if (item.indexInfos) {
                                    let indexInfos = item.indexInfos;
                                    listItem = {
                                        ...listItem,
                                        businessInAmount: null == indexInfos[0] ? "" :indexInfos[0].index_value ,
                                        businessOutAmount: null == indexInfos[1] ? "" :indexInfos[1].index_value,
                                        businessAmount: null == indexInfos[2] ? "" :indexInfos[2].index_value,
                                        businessHangInAmount: null == indexInfos[3] ? "" : indexInfos[3].index_value,
                                        businessHangOutAmount: null == indexInfos[4] ? "" : indexInfos[4].index_value,
                                        businessHangAmount: null == indexInfos[5] ? "" : indexInfos[5].index_value,
                                        applicationInAmount: indexInfos[6].index_value,
                                        applicationOutAmount: indexInfos[7].index_value,
                                        applicationAmount: indexInfos[8].index_value,
                                        applicationHangInAmount: null == indexInfos[9] ? "" : indexInfos[9].index_value,
                                        applicationHangOutAmount: null == indexInfos[10] ? "" : indexInfos[10].index_value,
                                        applicationHangAmount: null == indexInfos[11] ? "" : indexInfos[11].index_value,
                                        fundInAmount: null == indexInfos[12] ? "" : indexInfos[12].index_value,
                                        fundOutAmount: null == indexInfos[13] ? "" : indexInfos[13].index_value,
                                        fundAmount: null == indexInfos[14] ? "" :indexInfos[14].index_value,
                                        fundHangInAmount: null == indexInfos[15] ? "" : indexInfos[15].index_value,
                                        fundHangOutAmount: null == indexInfos[16] ? "" : indexInfos[16].index_value,
                                        fundHangAmount: null == indexInfos[17] ? "" : indexInfos[17].index_value,
                                        checkSuccessAmount: null == indexInfos[18] ? "" :indexInfos[18].index_value
                                    };
                                    item.indexInfos.forEach((it,index) =>{
                                        listItem[this.columnsKey[index+1]] = null == it? "" :it.index_value;
                                    });
                                }

                                listItem[this.columnsKey[this.columnsKey.length - 1]] = item.checkStatus;
                                transferDataList.push(listItem);
                            });

                            this.dataList = transferDataList;

                            if (response.data.length > 0) {
                                let dataNum = 0;
                                for (let i in response.data) {
                                    if (response.data[i].checkStatus !== 6 && response.data[i].checkStatus !== "6") {
                                        dataNum++;
                                    } else {
                                        continue;
                                    }
                                }
                                if (dataNum === response.data.length) {
                                    this.hideStatus = true;
                                } else {
                                    this.hideStatus = false;
                                }
                            }

                        } else {
                            this.dataList = [];
                            this.noneText = "暂无数据";
                            this.$Message.success({
                                content: '暂无数据，请选择其他时间段',
                                duration: 2,
                                closable: true
                            });
                        }
                    } else {
                        this.dataList = [];
                        this.loading = false;
                        this.noneText = "暂无数据";
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账总账汇总请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.dataList = [];
                    this.noneText = "暂无数据";
                    this.loading = false;
                });
            },
            rowOpera(row) {
                if (row.checkStatus === '6') { // 已归档
                    return '';
                } else if (row.checkDate === '汇总') {
                    return 'row-bold';
                } else {
                    return 'row-grey';
                }
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
                                        url: baseUrl + 'merchantCheck/Index/importSummaryIndexData',
                                        input: queryParam,
                                        method: 'POST'
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

<style lang="less">
    .ivu-table th {
        white-space: normal;
        overflow: inherit;
        position: relative;
    }

    @import "../../styles/common";
</style>
