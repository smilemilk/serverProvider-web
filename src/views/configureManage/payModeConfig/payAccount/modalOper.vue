<template>
    <div>

        <Modal
                v-model="dialogShow"
                :mask-closable=false
                @on-cancel="modalReset"
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
                           :disabled="editStatus&&!editOperStatus"
                           v-model="merchantform.merchantId" placeholder="请输入商户业务类型编码"/>
                </FormItem>
                <FormItem label="商户业务类型名称:"
                          prop="merchantName"
                          required
                >
                    <Input style="width:166px;"
                           :disabled="editStatus&&!editOperStatus"
                           v-model="merchantform.merchantName" placeholder="请输入商户业务类型名称"/>
                </FormItem>
                <FormItem label="系统业务类型:"
                          required
                >
                    <div class="flex-content flex-content-start">
                        <modal-select :list="systemBisList"
                                      class="margin-right-15"
                                      @on-change="currentHandle"
                                      :edit-status="editStatus&&!editOperStatus"
                                      :edit-init="editInit['rank01']"
                                      ref="selectRank01"
                        >
                        </modal-select>
                        <modal-select :list="systemBisDetails[bisType.rank01]"
                                      rank02
                                      v-if="!editStatus ? bisType.rank01 &&systemBisDetails[bisType.rank01]  : bisType.rank01 && editInit.rank02&&systemBisDetails[bisType.rank01]"
                                      @on-change="currentHandle"
                                      :edit-status="editStatus&&!editOperStatus"
                                      :edit-init="editInit['rank02']"
                                      ref="selectRank02"
                        >
                        </modal-select>
                    </div>

                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text"
                        @click="modalReset('merchantform')"
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
    import {validaNumberCase, validaCommon} from '@/libs/validate';

    export default {
        name: 'ModalOper',
        components: {
            ModalSelect
        },
        props: ['id'],
        data () {
            const validaNumberCaseRule = (rule, value, callback) => {
                if (value) {
                    if (validaNumberCase(value)) {
                        callback();
                    } else {
                        return callback(new Error('商户业务类型编码只能为字母，数字'));
                    }
                } else {
                    callback();
                }
            };
            const validaCommonRule = (rule, value, callback) => {
                if (value) {
                    if (validaCommon(value)) {
                        callback();
                    } else {
                        return callback(new Error('商户业务类型名称只能为汉字，字母，数字'));
                    }
                } else {
                    callback();
                }
            };
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

                editStatus: undefined,
                editOperStatus: false,
                editInitItem: {},
                editInit: {
                    'rank01': '',
                    'rank02': '',
                    'rank02_id': ''
                },
                submitLoading: false,
                merchantValidate: {
                    merchantId: [
                        {required: true, message: '请输入商户业务类型编码', trigger: 'blur'},
                        {validator: validaNumberCaseRule, trigger: 'blur'},
                        {validator: validaNumberCaseRule, trigger: 'change'},
                    ],
                    merchantName: [
                        {required: true, message: '请输入商户业务类型名称', trigger: 'blur'},
                        {validator: validaCommonRule, trigger: 'blur'},
                        {validator: validaCommonRule, trigger: 'change'},
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
        watch: {
            editOperStatus: function (val) {
                if (val === true) {
                    this.dialogSubmitText = '保存';

                    this.$refs.selectRank01.init();
                    this.$refs.selectRank02.init();
                }
            }
        },
        methods: {
            show (status, row) {
                if (status === 'add') {
                    this.editStatus = false;
                }
                if (status === 'edit') {
                    this.dialogSubmitText = '修改';
                    this.editStatus = true;
                }

                this.dialogShow = true;

                ajax.systemBis({}).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            const list = response.data.sysBizTypeList;

                            this.systemBisList = list.map((it, key) => {
                                return {
                                    name: it.sysBizPropertyOne,
                                    index: it.sysBizPropertyOne
                                };
                            });

                            let dataFormat = {};
                            response.data.sysBizTypeList.forEach(it => {
                                dataFormat = {
                                    ...dataFormat,
                                    [it['sysBizPropertyOne']]: it.sysBizTypeResList
                                };
                            });

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

                if (status === 'edit') {
                    this.modalEditInit(row);
                }

            },
            currentHandle (item) {
                if (item) {
                    if (item.rank === 1) {

                        if (this.editStatus) {
                            this.editInit.rank01 = item.value.name;
                        }
                        this.bisType.rank01 = item.value.name;

                    } else {

                        if (this.editStatus) {
                            this.editInit.rank02 = item.value.sysBizTypeName || '';
                        }
                        this.bisType.rank02 = item.value.sysBizTypeName;
                        this.bisType.rank02_id = item.value.sysBizTypeId || '';
                    }
                }
            },
            saveAction (formName) {

                if (!this.editStatus) {
                    this.$refs['merchantform'].validate((valid) => {
                        if (valid === true) {

                            if (!this.bisType.rank02_id) {
                                this.$Message.error({
                                    content: '请选择系统业务类型',
                                    duration: 2,
                                    closable: true
                                });
                                return;
                            }

                            this.submitLoading = true;
                            ajax.addMerchant(
                                {
                                    'merchantBizTypeCode': this.merchantform.merchantId + '',
                                    'merchantBizTypeName': this.merchantform.merchantName + '',
                                    'merchantId': this.id + '',
                                    'sysBizTypeId': this.bisType.rank02_id + ''
                                }
                            ).then(response => {
                                if (response.success === true) {
                                    this.modalReset();

                                    this.$emit('on-success');
                                } else {
                                    this.$Message.error({
                                        content: response.msg ? response.msg : '支付场景配置请求未成功',
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
                } else {
                    if (this.dialogSubmitText === '修改') {
                        this.editOperStatus = true;
                    }
                    if (this.dialogSubmitText === '保存') {
                        this.$refs['merchantform'].validate((valid) => {
                            if (valid === true) {

                                if (!this.bisType.rank02_id) {
                                    this.$Message.error({
                                        content: '请选择系统业务类型',
                                        duration: 2,
                                        closable: true
                                    });
                                    return;
                                }

                                this.submitLoading = true;
                                ajax.updateMerchant(
                                    {
                                        'merchantBizTypeCode': this.merchantform.merchantId + '',
                                        'merchantBizTypeName': this.merchantform.merchantName + '',
                                        'merchantId': this.id + '',
                                        'sysBizTypeId': this.bisType.rank02_id + ''
                                    }
                                ).then(response => {
                                    if (response.success === true) {
                                        this.modalReset();

                                        this.$emit('on-success');
                                    } else {
                                        this.$Message.error({
                                            content: response.msg ? response.msg : '支付场景配置请求未成功',
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
                    }
                }
            },
            cancelAction (formName) {
                this.modalReset(formName);
            },
            modalReset (formName) {
                this.dialogShow = false;
                this.submitLoading = false;

                if (this.$refs[formName]) {
                    this.$refs[formName].resetFields();
                } else {
                    this.$refs['merchantform'].resetFields();
                }
                this.merchantform.merchantId = '';
                this.merchantform.merchantName = '';
                this.bisType.rank01 = '';
                this.bisType.rank02_id = '';
                this.bisType.rank02 = '';

                if (this.editStatus) {
                    this.editOperStatus = false;
                    this.editInitItem={};
                }
            },

            modalEditInit (row) {

                this.editInitItem = row;
                this.merchantform.merchantId = row.merchantBizTypeCode || '';
                this.merchantform.merchantName = row.merchantBizTypeName || '';

                this.editInit.rank01 = row.sysBizPropertyOne || '';
                this.bisType.rank01 = row.sysBizPropertyOne || '';

                this.editInit.rank02 = row.sysBizTypeName || '';
                this.editInit.rank02_id = row.sysBizTypeId || '';
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../styles/themeType";

    @media screen and (max-height: 786px) {

    }
</style>
