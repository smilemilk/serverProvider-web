<template>
    <div>
        <wm-card title="业务类型管理"
                 class="margin-bottom-10">

            <div class="flex-content flex-content-start">
                <div class="border-right-dashed margin-right-10">
                    <Form ref="queryMerchant" :model="queryMerchant" inline :label-width="60" label-position="left">
                        <FormItem label="选择机构:">
                            <Input style="width:166px"
                                   v-model="queryMerchant.merchantName"
                                   @on-change="merchantHandle"
                                   placeholder="请输入机构"/>
                        </FormItem>
                    </Form>

                    <merchant-select
                            ref="select"
                            :merchant-list="merchantList"
                            @on-change="merchantCurrentHandle"
                            :init="merchantInit"
                    >
                    </merchant-select>
                </div>

                <div>
                    <Button type="primary" @click="addAction()" class="margin-bottom-10">添加商户业务类型
                    </Button>

                    <div class="margin-bottom-5 margin-top-5">已添加列表</div>
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
                </div>

            </div>
        </wm-card>

        <modal-oper
                ref="merchantModal"
                :id="queryParams.merchantId"
                @on-success="getListAction"
        >
        </modal-oper>

    </div>
</template>

<script>
    import WmCard from '_c/card/card';
    import storeData from './store/businessTypeConfig';
    import {parseTime} from '@/filters';
    import ajax from '@/api/configureManage';
    import MerchantSelect from './select/select';
    import ModalOper from './businessTypeConfig/modalOper';

    export default {
        name: 'businessTypeConfig',
        components: {
            WmCard,
            MerchantSelect,
            ModalOper
        },
        data () {
            return Object.assign({}, storeData.call(this), {
                queryMerchant: {
                    merchantName: '',
                    merchantId: ''
                },
                merchantList: [],
                merchantInit: true,

                total: 0,
                loading: true,
                tableHeight: 320,
                queryParams: {
                    merchantId: 'all',
                    page: 1,
                    limit: 10
                },
                dataList: [],
            });
        },
        created () {
            this.getList();
        },
        mounted () {
            let maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop
                - 44;
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

            Promise.all([this.getMerchantList()]).then((results) => {
                if (results && results[0] && results[0].status) {

                    this.$refs.select.getSelectList();
                    if (results[0].value.length) {
                        this.queryMerchant.merchantId = results[0]['value'][0]['merchantId'];
                        this.merchantCurrentHandle(results[0]['value'][0]);
                        this.queryParams.merchantId = results[0]['value'][0]['merchantId'];
                        this.getList();
                    } else {
                        this.merchantList = [];
                    }
                }
            });
        },
        watch: {

        },
        methods: {
            getMerchantList () {
                return new Promise((resolve, reject) => {
                    ajax.merchants({
                        merchantName: this.queryMerchant.merchantName
                    }).then(response => {
                        if (response.success == true) {
                            this.merchantList = response.data.items;
                        } else {
                            this.merchantList = [];
                        }
                        return resolve({
                            status: true,
                            value: response.data.items || []
                        });
                    }).catch(() => {
                        return reject({});
                    });
                }).catch(() => {
                });
            },
            merchantHandle() {
                this.merchantInit = false;
                this.queryMerchant.merchantId = '';

                Promise.all([this.getMerchantList()]).then((results) => {
                    if (results && results[0] && results[0].status) {
                        this.$refs.select.getSelectList();
                        if (results[0].value.length) {
                        } else {
                            this.merchantList = [];
                        }
                    }
                });
            },
            merchantCurrentHandle (item) {
                this.queryMerchant.merchantName = item.merchantName;
                this.queryMerchant.merchantId = item.merchantId;

                this.queryParams.merchantId = item.merchantId;
                if (this.queryParams.page !== 1) {
                    this.queryParams = {
                        ...this.queryParams,
                        page: 1
                    };
                }

                this.getList();
            },
            getList () {
                if (this.queryMerchant.merchantId === this.queryParams.merchantId)
                ajax.merchantListLimit(this.queryParams).then(response => {
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
                            content: response.msg ? response.msg : '业务类型管理请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.loading = false;
                });
            },
            getListAction () {
                this.handleCurrentPageChange(1);
            },
            handleCurrentPageChange (val) {
                this.queryParams.page = val;
                this.getList();
            },
            handlePageSizeChange (val) {
                this.queryParams.limit = val;
                this.getList();
            },
            rowAction (row) {
                this.$refs.merchantModal.show('edit', row);
            },
            addAction () {
                if (this.queryMerchant.merchantId === this.queryParams.merchantId) {
                    this.$refs.merchantModal.show('add');
                } else {
                    this.$Message.info({
                        content: '请先选择机构',
                        duration: 2,
                        closable: true
                    });
                }
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .ivu-card {
        margin-bottom: 10px;
    }

    .sceneOpera {
        .sceneBox {
            width: 306px;
            margin-left: 50px;
            padding: 2px 0 10px 10px;
            border: 1px solid @border-theme;
        }
    }

    @media screen and (max-height: 786px) {
        .operatorSection .operateItem p.operateName {
            font-size: 12px;
        }
    }
</style>
