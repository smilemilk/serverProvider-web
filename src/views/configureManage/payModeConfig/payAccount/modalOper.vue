<template>
    <div>
        <Modal
                v-model="dialogShow"
                :mask-closable=false
                @on-cancel="modalReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important', width: '650px'}"
        >
            <h3 slot="header">选择资金通道</h3>

            <ul class="channels-wrapper">
                <li v-for="item in channelsDetails"
                    @click="channelHandle(item)"
                    class="channel-item"
                    :class="item.active ? 'active' : ''"
                >
                    <i :class="'channel_'+item.channelCode"></i>
                    <p>{{item.channel}}</p>
                </li>
                <p>提示：开通微脉代收账户，未配置直收账户的资金通道，资金均收到商户微脉代收账户上，微脉T+1结算给商户</p>
            </ul>
            <div slot="footer">
                <Button type="text"
                        @click="modalReset()"
                >{{dialogCancelText}}
                </Button>
                <Button type="primary"
                        :loading="submitLoading"
                        @click="nextAction()"
                >{{dialogSubmitText}}
                </Button>
            </div>

        </Modal>

        <Modal
                v-model="operShow"
                :mask-closable=false
                @on-cancel="modalOperReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important', width: '650px'}"
        >
            <h3 slot="header">{{operModelTitle}}</h3>

            <div v-if="channelActive">
                <div v-if="channelActive.channelCode === 'wx'">
                    <wechat-config
                            ref="configForm_wx"
                            :id="id"
                            @on-submit="getQuery_wx"
                    ></wechat-config>
                </div>

                <div v-else-if="channelActive.channelCode === 'alipay'">
                    <alipay-config
                            ref="configForm_alipay"
                            :id="id"
                            @on-submit="getQuery_alipay"
                    ></alipay-config>
                </div>
                <div v-else>
                    <p>微脉代收账户，T+1结算给商户。微脉代收账户号</p>
                </div>
            </div>

            <div slot="footer">
                <Button type="text"
                        @click="modalOperReset()"
                >{{dialogCancelText}}
                </Button>
                <Button type="primary"
                        :loading="submitLoading"
                        @click="saveAction()"
                >{{dialogSubmitText}}
                </Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import ajax from '@/api/configureManage';
    import {validaNumberCase, validaCommon} from '@/libs/validate';
    import WechatConfig from './wechatConfig';
    import AlipayConfig from './alipayConfig';

    export default {
        name: 'ModalOper',
        components: {
            WechatConfig,
            AlipayConfig
        },
        props: ['id'],
        data () {
            // const validaNumberCaseRule = (rule, value, callback) => {
            //     if (value) {
            //         if (validaNumberCase(value)) {
            //             callback();
            //         } else {
            //             return callback(new Error('商户业务类型编码只能为字母，数字'));
            //         }
            //     } else {
            //         callback();
            //     }
            // };
            // const validaCommonRule = (rule, value, callback) => {
            //     if (value) {
            //         if (validaCommon(value)) {
            //             callback();
            //         } else {
            //             return callback(new Error('商户业务类型名称只能为汉字，字母，数字'));
            //         }
            //     } else {
            //         callback();
            //     }
            // };
            return {
                dialogShow: false,
                dialogButtonText: '',
                submitLoading: false,
                channelsDetails: [],
                channelActive: {},
                // merchantValidate: {
                //     merchantId: [
                //         {required: true, message: '请输入商户业务类型编码', trigger: 'blur'},
                //         {validator: validaNumberCaseRule, trigger: 'blur'},
                //         {validator: validaNumberCaseRule, trigger: 'change'},
                //     ],
                //     merchantName: [
                //         {required: true, message: '请输入商户业务类型名称', trigger: 'blur'},
                //         {validator: validaCommonRule, trigger: 'blur'},
                //         {validator: validaCommonRule, trigger: 'change'},
                //     ],
                // },
                dialogCancelText: '取消',
                dialogSubmitText: '下一步',

                operShow: false,
                operModelTitle: '配置账户信息',

                configResult: {}
            };
        },
        created () {
        },
        mounted () {

        },
        watch: {},
        methods: {
            show (status, row) {
                this.dialogSubmitText = '下一步';
                this.dialogShow = true;

                ajax.channelsList({}).then(response => {
                    if (response.success === true) {
                        if (response.data) {
                            this.channelsDetails = response.data.items;

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
            nextAction () {
                if (Object.keys(this.channelActive).length) {
                    this.dialogShow = false;
                    this.dialogSubmitText = '保存';
                    this.operShow = true;

                    if (this.channelActive.channelCode !== 'alipay' && this.channelActive.channelCode !== 'wx') {
                        ajax.submitAccount(
                            this.configResult.value
                        ).then(response => {
                            if (response.success === true) {
                                this.modalReset();
                                this.$emit('on-success');

                                if (this.channelActive.channelCode === 'alipay') {
                                    this.$refs.configForm_alipay.formReset();
                                }

                            } else {
                                this.$Message.error({
                                    content: response.msg ? response.msg : '账户配置请求未成功',
                                    duration: 2,
                                    closable: true
                                });
                            }
                        }).catch(() => {
                        });
                    }
                } else {
                    this.$Message.info({
                        content: '请选择资金通道',
                        duration: 2,
                        closable: true
                    });
                }
            },
            getQuery_wx (item) {

            },
            getQuery_alipay (item) {
                this.configResult = item;
            },
            saveAction () {
                if (Object.keys(this.channelActive).length) {
                    if (this.channelActive.channelCode === 'alipay' || this.channelActive.channelCode === 'wx') {

                        if (this.channelActive.channelCode === 'alipay') {
                            this.$refs.configForm_alipay.formSubmit();
                        }

                        if (this.configResult.status) {
                            ajax.submitAccount(
                                this.configResult.value
                            ).then(response => {
                                if (response.success === true) {
                                    this.modalReset();
                                    this.$emit('on-success');

                                    if (this.channelActive.channelCode === 'alipay') {
                                        this.$refs.configForm_alipay.formReset();
                                    }

                                } else {
                                    this.$Message.error({
                                        content: response.msg ? response.msg : '账户配置请求未成功',
                                        duration: 2,
                                        closable: true
                                    });
                                }
                            }).catch(() => {
                            });
                        }

                        // this.$refs.configForm_wx
                    }
                } else {
                    this.$Message.info({
                        content: '请选择资金通道',
                        duration: 2,
                        closable: true
                    });
                }
            },
            cancelAction (formName) {
                this.modalReset(formName);
            },
            modalReset (formName) {
                this.dialogShow = false;
                this.submitLoading = false;
                this.channelsDetails = [];

                if (this.operShow) {
                    this.operShow = false;
                }

                if (this.$refs[formName]) {
                    this.$refs[formName].resetFields();
                } else {
                    if (this.$refs['alipayForm']) {
                        this.$refs['alipayForm'].resetFields();
                    }
                    if (this.$refs['wechatForm']) {
                        this.$refs['wechatForm'].resetFields();
                    }
                }

                if (this.configResult) {
                    this.configResult = {};
                }
            },

            channelHandle (row) {
                this.channelsDetails.map(it => {
                    if (it.channelCode === row.channelCode) {
                        this.$set(it, 'active', true);
                        this.channelActive = row;
                    } else {
                        this.$set(it, 'active', false);
                    }
                    return it;
                });
            },

            modalOperReset () {
                this.operShow = false;
                if (this.channelActive.channelCode === 'alipay') {
                    this.$refs.configForm_alipay.formReset();
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../../styles/themeType";
    @import "../../../../styles/mixin";

    .channels-wrapper {
        margin: 15px auto 0;
        width: 398px;
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .channel-item {
            width: 80px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            padding-top: 5px;
            margin-bottom: 14px;
            cursor: pointer;
            border-radius: 4px;
            i {
                display: block;
                width: 40px;
                height: 40px;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("../../../../images/weimai.png");
                background-size: 100% auto;
                border-radius: 4px;
                &.channel_ {
                    &alipay {
                        background-image: url("../../../../images/alipay.jpg");
                        background-size: 100% auto;
                    }
                    &wechat {
                        background-image: url("../../../../images/wechat.jpg");
                        background-size: 100% auto;
                    }
                }
            }
            p {
                text-align: center;
            }
            &:hover {
                p {
                    color: @main-theme-color;
                }
            }
            &.active {
                box-shadow: 0px 0px 9px 1px @main-theme-color;
                p {
                    color: @main-theme-color;
                }
            }
        }
    }

    @media screen and (max-height: 786px) {

    }
</style>
