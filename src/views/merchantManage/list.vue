<template>
    <div>
        <title-item text="商户管理列表" sizeType="small" class="margin-top-20"></title-item>
        <Card class="searchBox">
            <Form ref="queryParams" :model="queryParams" inline :label-width="60" label-position="left">
                <FormItem label="收款类型:">
                    <Select v-model="queryParams.dealType"
                            style="width:100px">
                        <Option v-for="item in dealTypeList" :value="item.id" :key="item.value">
                            {{item.value}}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="申请日期:" prop="dateSearch">
                    <DatePicker v-model="dateSearch"
                                format="yyyy-MM-dd"
                                type="daterange"
                                placement="bottom-start"
                                placeholder="选择开始日期—结束日期"
                                style="width: 200px"
                                :options="endTimeOptions"
                                @on-change="dateChange"></DatePicker>
                </FormItem>
            </Form>
            <div>
                <Row>
                    <Col span="18" :md="18" :sm="24" :xs="24">
                        <Button type="primary" @click="getListAction()">查询</Button>
                        <!--<Button type="primary" @click="getHangLink">查看当前挂账</Button>-->
                        <!--<Button type="primary" @click="exportAction">导出</Button>-->
                        <!--<Button type="primary" @click="reconciliationsOpera">开始对账</Button>-->
                        <!--<Button type="primary" @click="downloadAction">对账结果下载</Button>-->
                        <!--<Button @click="handleSelectAll(true)" style="display:none;">全选</Button>-->
                    </Col>
                </Row>
            </div>
        </Card>
        <Card>
            <Table
                    ref="table"
                    :loading="loading"
                    :columns="columnsTable"
                    :data="dataList"
                    :height="tableHeight"
                    highlight-row
                    border
                    @on-selection-change="handleRowChange"
            ></Table>
            <Page :total="total"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                  :current="this.queryParams.page"
                  @on-change="handleCurrentPageChange"
                  @on-page-size-change="handlePageSizeChange"></Page>
        </Card>
    </div>
</template>

<script>
    import TitleItem from '_c/title/index';
    import storeData from './store/list';
    import {parseTime} from '@/filters';
    import ajax from '@/api/statistics';
    import baseUrl from '../../../config/server';
    import {WarnupLoad} from '_c/warn-up/index';

    export default {
        name: 'reconciliations',
        components: {
            WarnupLoad,
            TitleItem
        },
        data() {
            return Object.assign({}, storeData.call(this), {
                endTimeOptions: {
                    disabledDate: date => {
                        return date && date.valueOf() > Date.now();
                    }
                }
            });
        },
        created() {
            this.queryParams.billEndTime = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}'); // 首次进来默认展示一周数据
            this.queryParams.billStartTime = parseTime(new Date().getTime() - 7 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'); // 首次进来默认展示一周数据
            this.dateSearch = [this.queryParams.billStartTime, this.queryParams.billEndTime];
            this.getSearchList();
            this.getList();
        },
        mounted() {
            let maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop
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
            dateChange(val) {
                if (val) {
                    this.queryParams.billStartTime = parseTime(this.dateSearch[0], '{y}-{m}-{d}');
                    this.queryParams.billEndTime = parseTime(this.dateSearch[1], '{y}-{m}-{d}');
                } else {
                    this.queryParams.billStartTime = '';
                    this.queryParams.billEndTime = '';
                }
            },
            getSearchList() {
                ajax.checkListInfo({
                    'billEndTime': this.queryParams.billEndTime,
                    'billStartTime': this.queryParams.billStartTime,
                }).then(response => {
                    if (response.success == true) {
                        if (response.data) {
                            this.searchDay.item1 = response.data.needDealNum || null;
                            this.searchDay.item2 = response.data.archiveNum || null;
                        }
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '客户统一对账天数请求失败',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            getList() {
                ajax.checkList(this.queryParams).then(response => {
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
                        this.dataList = [];
                        this.total = 0;
                        this.queryParams.page = 1;
                        this.loading = false;
                        this.$Message.error({
                            content: response.msg ? response.msg : '客户统一对账表单请求未成功',
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
                this.getSearchList();
            },
            handleRowChange(selection, row) {
                this.multipleSelection = selection;
            },
            handleSelectAll(status) {
                this.$refs.table.selectAll(status);
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },

        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .ivu-card {
        margin-bottom: 10px;
    }

    @media screen and (max-height: 786px) {
        .operatorSection .operateItem p.operateName {
            font-size: 12px;
        }
    }
</style>
