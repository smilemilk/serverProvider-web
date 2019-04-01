<template>
    <div>
        <title-item text="对账详情" sizeType="small"></title-item>
        <Card class="searchBox margin-top-10">
            <Row>
                <Col span="16" style="height: 32px; line-height: 32px; margin-top: -14px;">
                    <span>日期:</span>
                    <time>{{dateSearch}}</time>
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
    import storeData from './store/checkReportsDetail';
    import {parseTime, codefans_net_CC2PY} from '@/filters';
    import ajax from '@/api/statistics';
    import TitleItem from '_c/title/index';

    export default {
        name: 'check-detail',
        components: {
            TitleItem,
        },
        data() {
            return storeData.call(this);
        },
        created() {
            this.dateSearch = this.$route.query.date ? this.$route.query.date : "";
            this.queryParams.checkOrderNo = this.$route.query.checkOrderNo || "";
            this.getList();
        },
        methods: {
            getList() {
                ajax.checkFormDetail(this.queryParams).then(response => {
                    if (response.success === true) {
                        if (response.data.items) {
                            this.loading = false;
                            if (response.data.items) {
                                this.dataList = response.data.items;
                                this.total = response.data.totalCount;
                            } else {
                                this.dataList = [];
                            }
                        } else {
                            this.dataList = [];
                        }

                    } else {
                        this.loading = false;
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账详情请求未成功',
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
            }
        }
    };
</script>
