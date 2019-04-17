<template>
    <div>
        <title-item text="支付配置" sizeType="small" class="margin-top-20"></title-item>
        <Card class="searchBox">
            <Row>
                <Col span="18" :md="18" :sm="24" :xs="24">
                    <Form ref="queryParams" :model="queryParams" inline :label-width="60" label-position="left">
                        <FormItem label="商户名称:">
                            <Select v-model="queryParams.payScene"
                                    filterable
                                    label-in-value
                                    style="width:140px">
                                <Option v-for="item in paySceneList"
                                        :value="item.merchantId"
                                        :key="item.merchantId">
                                    {{item.merchantRealName}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Col>

                <Col span="6" :md="6" :sm="24" :xs="24">
                    <Button type="primary" @click="getListAction()">查询</Button>
                    <Button type="primary" @click="detailAction('add')">新增</Button>
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

        <Modal
                width="70%"
                v-model="dialogShow"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}"
        >
            <h3 slot="header">支付场景配置</h3>
            <Form ref="sceneform" :model="sceneform" :label-width="100" label-position="right"
                  :rules="sceneValidate">
                <FormItem label="商户名称:"
                          prop="merchant"
                          :error="sceneValidate.merchant"
                >

                    <Select v-model="sceneform.merchant"
                            on-change="merchantHandle"
                            filterable
                            placeholder="请选择商户"
                            label-in-value
                            style="width:200px; margin-left: 15px;">
                        <Option v-for="(item, key) in merchantList"
                                :value="item.merchantId"
                                :key="key"
                                v-if="item.merchantRealName && item.merchantId"
                        >
                            {{item.merchantRealName}}
                        </Option>
                    </Select>
                </FormItem>

                <CheckboxGroup v-model="sceneform.payScene">
                <div v-for="item in paySceneItems">
                    <Checkbox
                            v-if="item.sceneName && item.paySceneId"
                            :label="item.sceneName">
                    {{item.sceneName}}
                    </Checkbox>
                </div>
                </CheckboxGroup>
            </Form>
            <div slot="footer">
                <Button type="text"
                        @click="cancelEditPass('sceneform')"
                >取消</Button>
                <Button type="primary"
                        :loading="savePassLoading"
                        @click="saveEditPass('sceneform')"
                >{{dialogButtonText}}</Button>
            </div>
        </Modal>
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
                    payScene: 'all',
                    page: 1,
                    limit: 20
                },
                payScene: '',
                paySceneList: [],
                dataList: [],
                dialogShow: false,
                dialogButtonText: '',
                sceneform: {
                    merchant: '',
                    payScene: ''
                },
                merchantList: [],
                paySceneItems: [],
                savePassLoading: false,
                sceneValidate: {
                    merchantError: [
                        {required: true, message: '请选择商户', trigger: 'blur'}
                    ],
                }
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
                if (this.queryParams.payScene === 'all') {
                    this.queryParams.payScene = '';
                }
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
                this.getList();
            },
            handleRowChange (selection, row) {
                this.multipleSelection = selection;
            },
            handleSelectAll (status) {
                this.$refs.table.selectAll(status);
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
                console.log(row);
            },
            detailAction(status) {
                this.dialogHandle();



                if (status === 'add') {  // 新增逻辑
                   this.dialogButtonText = '提交';
                }
                if (status === 'check') {  // 查看
                    this.dialogButtonText = '关闭';
                }
            },
            dialogHandle() {
                this.dialogShow = true;
                ajax.merchantList({}).then(response => {
                    console.log('---')
                    if (response.success === true) {
                        if (response.data.list) {
                            console.log(response.data)
                            this.merchantList = response.data.list;
                        } else {
                            this.merchantList = [];
                        }
                    } else {
                        this.merchantList = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '商户列表请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });

                ajax.payScene({}).then(response => {
                    if (response.success === true) {
                        if (response.data.items) {
                            this.paySceneItems = response.data.items;
                        } else {
                            this.paySceneItems = [];
                        }
                    } else {
                        this.paySceneItems = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '场景配置请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            merchantHandle(item) {
                console.log(item)
                this.sceneform.merchant = '';
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
