<template>
    <div>
        <Form ref="wechatForm"
              :model="queryForm"
              :label-width="160"
              label-position="right"
              :rules="merchantValidate">
            <FormItem label="支付宝账户号(seller_id):"
                      prop="aliPayAccount"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.aliPayAccount" placeholder="请输入支付宝账户号"/>
            </FormItem>
            <FormItem label="账户备注:"
                      prop="remark"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.remark" placeholder="请输入账户备注"/>
            </FormItem>
            <FormItem label="签名方式:"
                      prop="signType"
                      required
            >
                <Radio-group :value.sync="queryForm.signType"
                             @on-change="signTypeHandle"
                >
                    <Radio label="RSA">RSA
                    </Radio>
                    <Radio label="RSA2">RSA2
                    </Radio>
                </Radio-group>
            </FormItem>
            <FormItem label="应用ID(app_id):"
                      prop="aliPayAppId"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.aliPayAppId" placeholder="请输入应用ID"/>
            </FormItem>
            <FormItem label="商户号(PID):"
                      prop="PID"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.PID" placeholder="请输入商户号"/>
            </FormItem>
            <FormItem label="商户私玥(app_private_key):"
                      prop="appPrivateKey"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.appPrivateKey" placeholder="请输入商户私玥"/>
            </FormItem>
            <FormItem label="支付宝公钥(alipay_public_key)"
                      prop="aliPayPublicKey"
                      required
            >
                <Input style="width:166px;"
                       v-model="queryForm.aliPayPublicKey" placeholder="请输入支付宝公钥"/>
            </FormItem>

            <config-table config="alipay"></config-table>
        </Form>
    </div>
</template>

<script>
    import {validaNumberCase, validaCommon} from '@/libs/validate';
    import ConfigTable from './configTable';

    export default {
        name: 'AlipayConfig',
        components: {
            ConfigTable
        },
        // props: ['id'],
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
                merchantValidate: {
                    aliPayAccount: [
                        {required: true, message: '请输入支付宝账户号', trigger: 'blur'},
                    ],
                    remark: [
                        {required: true, message: '请输入账户备注', trigger: 'blur'},
                    ],
                    signType: [
                        {required: true, message: '请选择签名方式', trigger: 'blur'},
                    ],
                    aliPayAppId: [
                        {required: true, message: '请输入应用ID', trigger: 'blur'},
                    ],
                    PID: [
                        {required: true, message: '请输入商户号', trigger: 'blur'},
                    ],
                    appPrivateKey: [
                        {required: true, message: '请输入商户私玥', trigger: 'blur'},
                    ],
                    aliPayPublicKey: [
                        {required: true, message: '请输入支付宝公钥', trigger: 'blur'},
                    ],
                },
                queryForm: {
                    payeeId: '',
                    channelCode: 'alipay',
                    aliPayAccount: '',
                    remark: '',
                    signType: '',
                    aliPayAppId: '',
                    PID: '',
                    appPrivateKey: '',
                    aliPayPublicKey: '',
                }
            };
        },
        created () {
        },
        mounted () {

        },
        watch: {},
        methods: {
            signTypeHandle(item) {
                console.log(item)
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../../styles/themeType";
    @import "../../../../styles/mixin";

    @media screen and (max-height: 786px) {

    }
</style>
