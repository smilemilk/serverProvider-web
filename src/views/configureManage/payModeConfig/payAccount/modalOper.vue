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
                        @click="saveAction()"
                >{{dialogSubmitText}}
                </Button>
            </div>

        </Modal>

        <Modal
                v-model="operShow"
                :mask-closable=false
                @on-cancel="modalReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important', width: '650px'}"
        >
            <h3 slot="header">{{operModelTitle}}</h3>

            <ul class="channels-wrapper">
                <li v-for="item in channelsDetails"
                    @click="channelHandle(item)"
                    class="channel-item"
                    :class="item.active ? 'active' : ''"
                >
                    <i :class="'channel_'+item.channelCode"></i>
                    <p>{{item.channel}}</p>
                </li>
            </ul>
            <!--<Form ref="merchantform"-->
                  <!--:model="merchantform"-->
                  <!--:label-width="160"-->
                  <!--label-position="right"-->
                  <!--:rules="merchantValidate">-->
                <!--<FormItem label="商户业务类型编码:"-->
                          <!--prop="merchantId"-->
                          <!--required-->
                <!--&gt;-->
                    <!--<Input style="width:166px;"-->
                           <!--:disabled="editStatus&&!editOperStatus"-->
                           <!--v-model="merchantform.merchantId" placeholder="请输入商户业务类型编码"/>-->
                <!--</FormItem>-->
                <!--<FormItem label="商户业务类型名称:"-->
                          <!--prop="merchantName"-->
                          <!--required-->
                <!--&gt;-->
                    <!--<Input style="width:166px;"-->
                           <!--:disabled="editStatus&&!editOperStatus"-->
                           <!--v-model="merchantform.merchantName" placeholder="请输入商户业务类型名称"/>-->
                <!--</FormItem>-->
                <!--<FormItem label="系统业务类型:"-->
                          <!--required-->
                <!--&gt;-->
                    <!--<div class="flex-content flex-content-start">-->
                    <!--</div>-->

                <!--</FormItem>-->
            <!--</Form>-->

            <div>
                <p>微脉代收账户，T+1结算给商户。微脉代收账户号</p>
            </div>
            <div slot="footer">
                <Button type="text"
                        @click="modalReset()"
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

    export default {
        name: 'ModalOper',
        components: {},
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
                operModelTitle: '配置账户信息'
            };
        },
        created () {
        },
        mounted () {

        },
        watch: {},
        methods: {
            show (status, row) {
                if (status === 'add') {
                }
                if (status === 'edit') {
                    this.dialogSubmitText = '修改';
                }

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
            saveAction () {
                if (Object.keys(this.channelActive).length) {
                    this.modalReset();

                    this.operShow = true;
                    // ajax.updateMerchant(
                    //     {
                    //         'merchantBizTypeCode': this.merchantform.merchantId + '',
                    //         'merchantBizTypeName': this.merchantform.merchantName + '',
                    //         'merchantId': this.id + '',
                    //         'sysBizTypeId': this.bisType.rank02_id + ''
                    //     }
                    // ).then(response => {
                    //     if (response.success === true) {
                    //         this.modalReset();
                    //
                    //         this.$emit('on-success');
                    //     } else {
                    //         this.$Message.error({
                    //             content: response.msg ? response.msg : '支付场景配置请求未成功',
                    //             duration: 2,
                    //             closable: true
                    //         });
                    //     }
                    // }).catch(() => {
                    // });
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

                // if (this.$refs[formName]) {
                //     this.$refs[formName].resetFields();
                // } else {
                //     this.$refs['merchantform'].resetFields();
                // }
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
