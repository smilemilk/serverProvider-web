<template>
    <div>
        <wm-card title="支付配置"
                 class="margin-bottom-10">

            <Row>
                <Col span="18" :md="18" :sm="24" :xs="24">
                    <Form ref="queryParams" :model="queryParams" inline :label-width="60" label-position="left">
                        <FormItem label="商户名称:">
                            <Select v-model="queryParams.payeeId"
                                    :filterable="selectFilterable"
                                    @on-query-change="merchantFilterableHandle"
                                    style="width:240px;">
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
                    <Button type="primary" @click="getListAction()" class="margin-right-15">查询</Button>
                    <Button type="primary" @click="detailAction('add')">新增</Button>
                </Col>
            </Row>

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
        </wm-card>

        <Modal
                class="sceneOpera"
                v-model="dialogShow"
                :mask-closable=false
                @on-cancel="cancelReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important', width: '480px'}"
        >
            <h3 slot="header">支付场景配置</h3>
            <Form ref="sceneform"
                  :model="sceneform"
                  :label-width="100"
                  label-position="right"
                  :rules="sceneValidate">
                <FormItem label="商户名称:"
                          prop="merchant"
                          required
                >
                    <Select v-model="sceneform.merchant"
                            filterable
                            placeholder="请选择商户"
                            @on-change="merchantHandle"
                            label-in-value
                            :disabled="detailStatus"
                            @on-query-change="merchantFilterableHandle_dialog"
                            style="width:240px; margin-left: 15px;">
                        <Option v-for="(item, key) in merchantList"
                                :value="item.merchantId"
                                :key="key"
                                v-if="item.merchantRealName && item.merchantId"
                                :label.trim="item.merchantRealName"
                        >
                            {{item.merchantRealName}}
                        </Option>
                    </Select>
                </FormItem>

                <div class="sceneBox-wrapper">
                    <CheckboxGroup
                            v-model="sceneform.payScene"
                            class="sceneBox"
                            @on-change="sceneHandle"
                    >
                        <div
                                v-for="item in paySceneItems"
                                class="margin-top-8"
                        >
                            <Checkbox
                                    v-if="item.sceneName && item.paySceneId"
                                    :label="item.sceneName">
                                {{item.sceneName}}
                            </Checkbox>
                        </div>
                    </CheckboxGroup>
                </div>

            </Form>
            <div slot="footer">
                <Button type="text"
                        @click="cancelAction('sceneform')"
                >{{dialogCancelText}}
                </Button>
                <Button type="primary"
                        :loading="savePassLoading"
                        @click="saveAction('sceneform')"
                >{{dialogButtonText}}
                </Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import WmCard from '_c/card/card';
    import storeData from './store/payScene';
    import {parseTime} from '@/filters';
    import ajax from '@/api/configureManage';

    export default {
        name: 'payScene',
        components: {
            WmCard
        },
        data () {
            return Object.assign({}, storeData.call(this), {
                total: 0,
                loading: true,
                tableHeight: 320,
                queryParams: {
                    payeeId: 'all',
                    page: 1,
                    limit: 20
                },
                payScene: '',
                paySceneList: [],
                dataList: [],

                selectFilterable: false,
                selectFilterable_dialog: false,

                dialogShow: false,
                dialogButtonText: '',
                sceneform: {
                    merchant: '',
                    merchantName: '',
                    payScene: []
                },
                merchantList: [],
                paySceneItems: [],
                savePassLoading: false,
                sceneValidate: {
                    merchant: [
                        {required: true, message: '请选择商户', trigger: 'blur'}
                    ],
                },
                dialogCancelText: '取消',
                detailStatus: false
            });
        },
        created () {
            this.getPayScene();
            this.getList();
        },
        mounted () {
            let maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop
                - document.querySelector('.main-header-con').clientHeight - 44;
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
                            this.paySceneList = [{
                                'merchantId': 'all',
                                'merchantRealName': '全部'
                            }].concat(response.data.list);
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
                let params;
                if (this.queryParams.payeeId === 'all') {
                    params = {
                        ...this.queryParams,
                        payeeId: ''
                    };
                } else {
                    params = this.queryParams;
                }
                ajax.sceneList(params).then(response => {
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
                this.sceneform.merchant = row.payeeId;
                this.sceneform.payScene = row.sceneName.split(',');
                this.merchantList = [{merchantId: row.payeeId, merchantRealName: row.merchantName}];
                this.detailAction('check');
            },
            detailAction (status) {
                this.dialogHandle(status);

                if (status === 'add') {  // 新增逻辑
                    this.dialogButtonText = '提交';
                }
                if (status === 'check') {  // 查看
                    this.dialogButtonText = '修改';
                    this.dialogCancelText = '关闭';
                }
            },
            dialogHandle (status) {
                this.dialogShow = true;

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
                if (status && status === 'check') {
                    this.detailStatus = true;
                    return;
                }

                this.detailStatus = false;
                ajax.merchantList({}).then(response => {
                    if (response.success === true) {
                        if (response.data.list) {
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

            },
            merchantHandle (item) {
                if (item) {
                    this.sceneform.merchant = item.value;
                    this.sceneform.merchantName = item.label;
                }
            },
            sceneHandle (item) {

            },
            saveAction (formName) {
                this.savePassLoading = true;
                this.$refs['sceneform'].validate((valid) => {
                    if (valid === true) {
                        if (this.sceneform.payScene.length === 0) {
                            this.$message.error('请选择支付场景');
                            this.savePassLoading = false;
                            return;
                        }
                        let sceneListArr = [];
                        this.sceneform.payScene.forEach(it => {
                            let item = {
                                'paySceneId': this.paySceneItems.filter(item => item.sceneName === it)[0]['paySceneId'],
                                'sceneName': it
                            };
                            sceneListArr.push(item);
                        });

                        ajax.submitScene({
                            merchantName: this.sceneform.merchantName.trim(),
                            payeeId: this.sceneform.merchant,
                            sceneList: sceneListArr
                        }).then(response => {
                            if (response.success === true) {
                                let vm = this;
                                this.queryParams.payeeId = vm.sceneform.merchant;
                                this.handleCurrentPageChange(1);
                                this.cancelReset(formName);
                            } else {
                                this.$Message.error({
                                    content: response.msg ? response.msg : '场景配置请求未成功',
                                    duration: 2,
                                    closable: true
                                });
                            }
                        }).catch(() => {
                        });
                    } else {
                        this.savePassLoading = false;
                    }
                });
            },
            cancelAction (formName) {
                this.cancelReset(formName);
            },
            cancelReset (formName) {
                if (this.$refs[formName]) {
                    this.$refs[formName].resetFields();
                } else {
                    this.$refs['sceneform'].resetFields();
                }
                this.sceneform.merchant = '';
                this.sceneform.payScene = [];
                this.dialogShow = false;
                this.savePassLoading = false;
                this.paySceneItems = [];
                this.selectFilterable_dialog = false;
            },

            merchantFilterableHandle () {
                this.selectFilterable = true;
            },
            merchantFilterableHandle_dialog () {
                this.selectFilterable_dialog = true;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../styles/themeType";

    .sceneBox-wrapper {
        margin: 0 93px 0 115px;
        border: 1px solid @border-theme;
        border-radius: 4px;
        padding: 0 8px 8px;
    }

    @media screen and (max-height: 767px) {

    }
</style>
