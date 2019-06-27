<template>
    <div>

        <Modal
                v-model="dialogShow"
                :mask-closable=false
                @on-cancel="cancelReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important', width: '650px'}"
        >
            <h3 slot="header">支付场景配置</h3>
            <Form ref="merchantform"
                  :model="merchantform"
                  :label-width="160"
                  label-position="right"
                  :rules="merchantValidate">
                <FormItem label="商户业务类型编码:"
                          prop="merchantId"
                          required
                >
                    <Input style="width:166px;"
                           v-model="merchantform.merchantId" placeholder="请输入商户业务类型编码"/>
                </FormItem>
                <FormItem label="商户业务类型名称:"
                          prop="merchantName"
                          required
                >
                    <Input style="width:166px;"
                           v-model="merchantform.merchantName" placeholder="请输入商户业务类型名称"/>
                </FormItem>
                <FormItem label="系统业务类型:"
                          prop="merchantType"
                          required
                >
                    <!--<Input style="width:166px"-->
                           <!--v-model="merchantform.merchantName" placeholder="请输入商户业务类型名称"/>-->

                    <div class="flex-content flex-content-start">
                        <modal-select :list="systemBisList"
                                      class="margin-right-15"
                                      @on-change="currentHandle"
                        >
                        </modal-select>
                        <modal-select :list="systemBisDetails[bisType.rank01]"
                                      rank02
                                      v-if="bisType.rank01"
                                      @on-change="currentHandle"
                        >
                        </modal-select>
                    </div>

                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text"
                        @click="cancelAction('merchantform')"
                >{{dialogCancelText}}
                </Button>
                <Button type="primary"
                        :loading="submitLoading"
                        @click="saveAction('merchantform')"
                >{{dialogSubmitText}}
                </Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import ajax from '@/api/configureManage';
    import ModalSelect from './select';

    export default {
        name: 'ModalOper',
        components: {
            ModalSelect
        },
        data () {
            return {
                dialogShow: false,
                dialogButtonText: '',
                merchantform: {
                    merchantId: '',
                    merchantName: ''
                },
                systemBisList: [],
                systemBisDetails: [],
                bisType: {
                    rank01: '',
                    rank02: ''
                },

                // paySceneItems: [],
                submitLoading: false,
                merchantValidate: {
                    merchantId: [
                        {required: true, message: '请输入商户业务类型编码', trigger: 'blur'}
                    ],
                    merchantName: [
                        {required: true, message: '请输入商户业务类型名称', trigger: 'blur'}
                    ],
                    merchantType: [
                        {required: true, message: '请选择系统业务类型', trigger: 'blur'}
                    ],
                },
                dialogCancelText: '取消',
                dialogSubmitText: '确定',
            };
        },
        created () {
        },
        mounted () {

        },
        methods: {
            show () {
                this.dialogShow = true;

                ajax.systemBis({}).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            const list = response.data.sysBizTypeList;
                            this.systemBisList = list.map((it,key)=> {
                                return {
                                    name: it.sysBizPropertyOne,
                                    index: it.sysBizPropertyOne
                                };
                            });
                            console.log(response.data.sysBizTypeList)

                            let dataFormat = {};
                            response.data.sysBizTypeList.forEach(it=>{
                                dataFormat={
                                    ...dataFormat,
                                    [it['sysBizPropertyOne']]: it.sysBizTypeResList
                                }
                            });
                            console.log(dataFormat)

                            this.systemBisDetails = dataFormat;
                        } else {
                            this.systemBisList = [];
                        }
                    } else {
                        this.systemBisList = [];
                        this.$Message.error({
                            content: response.msg ? response.msg : '系统业务种类列表请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });

            },
            currentHandle (item) {
                if (item) {
                    if (item.rank === 1) {
                        this.bisType.rank01 = item.value.name;
                        console.log(item)
                    } else {
                        this.bisType.rank02 = item.value.sysBizTypeName;
                        console.log(item)
                    }
                }
            },
            sceneHandle (item) {

            },
            saveAction (formName) {
                this.submitLoading = true;
                this.$refs['merchantform'].validate((valid) => {
                    if (valid === true) {
                        if (this.merchantform.payScene.length === 0) {
                            this.$message.error('请选择支付场景');
                            this.submitLoading = false;
                            return;
                        }
                        let sceneListArr = [];
                        this.merchantform.payScene.forEach(it => {
                            let item = {
                                'paySceneId': this.paySceneItems.filter(item => item.sceneName === it)[0]['paySceneId'],
                                'sceneName': it
                            };
                            sceneListArr.push(item);
                        });

                        ajax.submitScene({
                            merchantName: this.merchantform.merchantName.trim(),
                            payeeId: this.merchantform.merchant,
                            sceneList: sceneListArr
                        }).then(response => {
                            if (response.success === true) {
                                let vm = this;
                                this.queryParams.payeeId = vm.merchantform.merchant;
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
                        this.submitLoading = false;
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
                    this.$refs['merchantform'].resetFields();
                }
                this.merchantform.merchant = '';
                this.merchantform.payScene = [];
                this.dialogShow = false;
                this.submitLoading = false;
                this.paySceneItems = [];
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
    @import "../../../styles/themeType";
    @media screen and (max-height: 786px) {

    }
</style>
