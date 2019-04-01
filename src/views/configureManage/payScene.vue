<template>
    <div>
        <title-item text="支付配置" sizeType="small" class="margin-top-20"></title-item>
        <Card class="searchBox">
            <Form ref="queryParams" :model="queryParams" inline :label-width="60" label-position="left">
                <FormItem label="商户名称:">
                    <Select v-model="queryParams.payScene"
                            style="width:100px">
                        <Option v-for="item in paySceneList" :value="item.merchantId" :key="item.merchantRealName">
                            {{item.merchantRealName}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div>
                <Row>
                    <Col span="18" :md="18" :sm="24" :xs="24">
                        <Button type="primary" @click="getListAction()">查询</Button>
                        <Button type="primary" @click="getHangLink">新增</Button>
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
    import storeData from './store/payScene';
    import {parseTime} from '@/filters';
    import ajax from '@/api/configureManage';

    export default {
        name: 'payScene',
        components: {
            TitleItem
        },
        data () {
            return Object.assign({}, storeData.call(this), {
                total: 0,
                loading: true,
                tableHeight: 320,
                queryParams: {
                    payScene: '',
                    page: 1,
                    limit: 20
                },
                payScene: '',
                paySceneList: [],
                columnsTable: [
                    {
                        key: 'merchantName',
                        title: '商户名称',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.merchantName || '');
                        }
                    },
                    {
                        key: 'payeeId',
                        title: '商户编号',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.payeeId || '');
                        }
                    },
                    {
                        key: 'sceneName',
                        title: '支付场景',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('div', params.row.sceneName || '');
                        }
                    },
                    {
                        key: 'operate',
                        title: '操作',
                        align: 'center',
                        width: 160,
                        render: (h, params) => {
                            return h('div',
                                [h('Button', {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.rowAction(params.row);
                                        }
                                    }
                                }, '详情')
                                ]);
                        }
                    },
                ],
                dataList:[]

            });
        },
        created () {
            this.getPayScene();
            this.getList();
        },
        mounted () {
            let maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop
                - document.querySelector('.main-header-con').clientHeight - document.querySelector('.searchBox').clientHeight - 44;
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

            getPayScene () {
                ajax.paySceneList({}).then(response => {
                    if (response.success == true) {
                        if (response.data) {
                            this.paySceneList = response.data.list;
                        }
                    } else {
                        this.paySceneList = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '获取商户名称失败',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                    this.paySceneList = [];
                });
            },
            getList () {
                ajax.sceneList(this.queryParams).then(response => {
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
                            content: response.msg ? response.msg : '支付配置请求未成功',
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
                this.getSearchList();
            },
            handleRowChange (selection, row) {
                this.multipleSelection = selection;
            },
            handleSelectAll (status) {
                this.$refs.table.selectAll(status);
            },
            rowAction(row) {
                console.log(row)
            }
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
