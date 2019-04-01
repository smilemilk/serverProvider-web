<template>
    <div>
        <title-item text="挂账列表" sizeType="small" class="margin-top-20"></title-item>
        <Card class="searchBox">
            <Row>
                <Col span="16" style="height: 32px; line-height: 32px;">
                    <span>日期:</span>
                    <time>{{dateHandSearch}}</time>
                </Col>
                <Col span="8">
                    <Button type="primary" class="margin-right-10" @click="exportAction">导出</Button>
                </Col>
            </Row>
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
    import storeData from './store/reconciliationsHand';
    import {parseTime} from '@/filters';
    import ajax from '@/api/statistics';
    import {downloadExcel} from '@/libs/fileSmiple';
    import baseUrl from '../../../config/server';
    import {GetDateStr} from '@/libs/common';

    export default {
        name: 'reconciliations-hand',
        components: {
            TitleItem
        },
        data() {
            return Object.assign({}, storeData.call(this), {});
        },
        created() {
            this.dateHandSearch = GetDateStr(0);
            this.getList();
            this.uploadUrl = baseUrl + 'portal/doCheck/uploadFile';
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
            getList() {
                ajax.handList(this.queryParams).then(response => {
                    if (response.success === true) {
                        this.loading = false;
                        if (response.data.items) {
                            this.dataList = response.data.items;
                            this.total = response.data.totalCount;
                        } else {
                            this.dataList = [];
                        }
                    } else {
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
            exportAction() {
                if (this.dataList.length > 0) {
                    this.$Modal.confirm({
                        content: '确定要导出&nbsp;' + this.dateHandSearch + '&nbsp;的数据?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            setTimeout(() => {
                                downloadExcel({
                                    url: baseUrl + 'merchantCheck/downloadHangedMerchantCheck',
                                    input: {},
                                    method: 'get'
                                });
                            }, 2000);
                        },
                        onCancel: () => {
                        }
                    });
                } else {
                    this.$Message.error({
                        content: '此时间没有数据，无导出数据！',
                        duration: 2,
                        closable: true
                    });
                    return;
                }
            },
            handleCurrentPageChange(val) {
                this.queryParams.page = val;
                this.getList();
            },
            handlePageSizeChange(val) {
                this.queryParams.limit = val;
                this.getList();
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .ivu-card {
        margin-bottom: 10px;
    }

</style>
