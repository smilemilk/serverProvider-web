<template>
    <div>
        <div class="margin-bottom-10">
            <Button-group class="margin-right-50">
                <Button :type="activeList[0]>0 ? 'primary' : 'default'" @click="activeAction(0)" class="">当前使用
                </Button>
                <Button :type="activeList[1]>0 ? 'primary' : 'default'" @click="activeAction(1)" class="">已废除
                </Button>
            </Button-group>

            <Button type="primary" @click="addAction()" class="margin-right-15">新增
            </Button>

            <Button type="default" @click="helpAction()" class="">帮助
            </Button>
        </div>


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
              @on-change="handleCurrentPageChange">
        </Page>
    </div>
</template>

<script>
    import {parseTime} from '@/filters';
    import ajax from '@/api/configureManage';

    export default {
        name: 'payAccount',
        components: {},
        data () {
            return  {
                activeList: [1, -1],
                total: 0,
                loading: true,
                tableHeight: 320,
                dataList: [],
                columnsTable: [{
                    key: 'merchantName',
                    title: '序号',
                    align: 'center',
                    minWidth: 30,
                    render: (h, params) => {
                        return h('div', (params.index*1+1)*(this.queryParams.page));
                    }
                },
                    {
                        key: 'merchantBizTypeName',
                        title: '商户业务类型',
                        align: 'center',
                        minWidth: 60,
                        render: (h, params) => {
                            return h('div', params.row.merchantBizTypeName || '');
                        }
                    },
                    {
                        key: 'merchantBizTypeCode',
                        title: '商户业务类型编码',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            return h('div', params.row.merchantBizTypeCode || '');
                        }
                    },
                    {
                        key: 'sysBizTypeName',
                        title: '系统业务类型',
                        align: 'center',
                        minWidth: 200,
                        render: (h, params) => {
                            return h('div',[h('span', {
                                domProps: {
                                    innerHTML: params.row.sysBizTypeName || ''
                                }
                            }),
                                h('span', {
                                    domProps: {
                                        innerHTML: params.row.sysBizPropertyOne || '——'
                                    },
                                    style: 'display: inline-block; margin-left: 7px; border: 1px solid #999; border-radius: 15px; padding: 0px 5px;'
                                }),
                                h('span', {
                                    domProps: {
                                        innerHTML: params.row.sysBizPropertyTwo || '——'
                                    },
                                    style: 'display: inline-block; margin-left: 7px; border: 1px solid #999; border-radius: 15px; padding: 0px 5px;'
                                }),
                            ]);
                        }
                    },
                    {
                        key: 'isDelete',
                        title: '状态',
                        align: 'center',
                        minWidth: 60,
                        render: (h, params) => {
                            // return h('div', businessDeleteStatus(params.row.isDelete) || '');
                        }
                    },
                    {
                        key: 'operate',
                        title: '操作',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            let buttonText = '';
                            let operStatus = '';

                            if (params.row.isDelete === 0 || params.row.isDelete === '0') {
                                buttonText = '废除';
                                operStatus = 'delete';
                            }
                            if (params.row.isDelete === 1 || params.row.isDelete === '1') {
                                buttonText = '启用';
                                operStatus = 'recover';
                            }
                            return h('div',
                                [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class: 'margin-right-15',
                                        on: {
                                            click: () => {
                                                this.rowOperaAction(params.row, operStatus);
                                            }
                                        }
                                    }, buttonText),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.rowDetailAction(params.row);
                                            }
                                        }
                                    }, '详情')
                                ]);
                        }
                    },]
            };
        },
        props: ['queryParamsPrimary', 'queryMerchantPrimary'],
        created () {
            this.getList();
        },
        computed:{
            queryParams: {
                get: function() {
                    const query = this.queryParamsPrimary;

                    console.log(query)
                    return {
                        payeeId: query.merchantId,
                        status: 0,
                        limit: query.limit,
                        page: query.page,
                    };
                },
                set: function(newValue) {
                    return newValue;
                }
            },
            queryMerchant: {
                get: function() {
                    return this.queryMerchantPrimary;
                },
                set: function(newValue) {
                    return newValue;
                }
            },
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
        },
        watch: {},
        methods: {
            getList () {
                if (this.queryMerchant.merchantId === this.queryParams.payeeId) {
                    ajax.accountList(this.queryParams).then(response => {
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
                }
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
            rowDetailAction (row) {
                this.$refs.merchantModal.show('edit', row);
            },
            rowOperaAction (row, status) {
                let msg = '';
                if (status === 'delete') {
                    msg = '禁用';
                }
                if (status === 'recover') {
                    msg = '启用';
                }
                this.$Modal.confirm({
                    title: '确认' + msg + '吗?',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                    },
                    onCancel: () => {
                    }
                });
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
            helpAction () {
                this.$Modal.info({
                    title: '帮助说明',
                    content: '1、微脉代收账户为默认开通账户，无需配置账户信息，也不可修改账户信息\n' +
                    '2、若未配置直收账户，则使用微脉代收账户收款；若某资金通道配置直收账户，则优先使用直收账户收款\n' +
                    '3、目前一个资金通道只开放配置一个直收账户'
                });
            },
            activeAction(item) {
                console.log(item)
                const list = this.activeList;
                this.activeList = [...list.map((it,key)=>{
                   if (key === item) {
                       it=1;
                   } else {
                       it=-1;
                   }
                   return it;
               })];

                this.queryParams.status = item;
                this.getListAction();
            },
            tabHandle () {

            }
        }
    };
</script>

<style lang="less" scoped>

    @media screen and (max-height: 786px) {

    }
</style>
