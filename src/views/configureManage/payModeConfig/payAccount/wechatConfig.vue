<template>
    <div>
        <Button-group class="margin-bottom-15">
            <Button :type="activeList[0]>0 ? 'primary' : 'default'" @click="activeAction(0)" class="">
                已有账户
            </Button>
            <Button :type="activeList[1]>0 ? 'primary' : 'default'" @click="activeAction(1)" class="">
                微脉代开账户
            </Button>
        </Button-group>

        <div v-if="activeList[0]>0">
            <Form ref="wechatForm"
                  :model="queryForm"
                  :label-width="160"
                  label-position="right"
                  :rules="merchantValidate">
                <FormItem label="微信支付账户号(merchantId):"
                          prop="wxAccount"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.wxAccount" placeholder="请输入微信支付账户号"/>
                </FormItem>
                <FormItem label="账户备注:"
                          prop="remark"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.remark" placeholder="请输入账户备注"/>
                </FormItem>
                <FormItem label="应用ID(appid):"
                          prop="wxAppId"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.wxAppId" placeholder="请输入应用ID"/>
                </FormItem>
                <FormItem label="商户号(merchantId):"
                          prop="merchantId"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.merchantId" placeholder="请输入商户号"/>
                </FormItem>
                <FormItem label="API密玥(appKey):"
                          prop="appKey"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.appKey" placeholder="请输入API密玥"/>
                </FormItem>
                <FormItem label="证书:"
                          prop="appBase64P12"
                          required
                >
                    <Upload
                            ref="upload_appBase64P12"
                            :multiple="false"
                           :headers="header"
                            :data="headerParam_appBase64P12"
                            :action="uploadUrl_appBase64P12"
                            :on-error="handleFormatError"
                            :before-upload="handleUpload"
                            :on-progress="handleProgress"
                            :show-upload-list="false"
                            :with-credentials="true"
                            name="uFile"
                            :on-success="uploadSuccess"
                    >
                        <Button icon="ios-cloud-upload-outline">上传证书</Button>
                    </Upload>
                    <p>(如何获取证书，请点击：<a href="http://kf.qq.com/faq/161222NneAJf161222U7fARv.html" target="_blank">http://kf.qq.com/faq/161222NneAJf161222U7fARv.html</a>)</p>
                </FormItem>
                <FormItem label="域名验证文件:"
                          prop="hostVerify"
                          required
                >
                    <Upload
                            ref="upload"
                            :data="headerParam_appBase64P12"
                            :multiple="false"
                            :action="uploadUrl_hostVerify">
                        <Button icon="ios-cloud-upload-outline">上传域名验证文件</Button>
                    </Upload>
                    <p>(如何验证域名文件，请点击 <a @click="">查看详情</a>)</p>
                </FormItem>
                <FormItem label="appSecret:"
                          prop="appSecret"
                          required
                >
                    <Input style="width:166px;"
                           v-model="queryForm.appSecret" placeholder="请输入appSecret"/>
                </FormItem>

                <config-table config="wx"></config-table>
            </Form>
        </div>
        <div v-else>
            <div>
                <p class="margin-bottom-15">商户委托微脉开通账号，微脉以服务商模式帮商户开通微信支付账户，开通后会移交账户信息给商户，请提供以下申请材料：</p>
                <p>联系信息、联系人姓名、手机号码、常用邮箱</p>
                <p>
                    经营信息、商户简称、经营类目、售卖商品场景、门店地址、公众号/小程序名称、页面截图、公司网站、APP上线状态、APP下载地址、特殊资质（须为彩色图片且小于2M，文件格式为bmp、png、jpeg、jpg或gif、客服电话</p>
                <p>商户信息、登记证书、相关部门颁发的证书，如：事业单位法人证书、统一社会信用代码证书（若贵司为政府机关，无法提供上述登记证书，可在此处上传组织机构代码证、证书照片、证书号、有效期、业务范围</p>
                <p>基本信息、商户名称、地址/住所、企业法人/经办人、证件持有人类型、证件类型 身份证（限中国大陆居民)、身份证正面照片、身份证反面照片、证件号码、证件持有人姓名、证件有效期</p>
                <p>结算信息、账户类型、开户名称、开户银行、开户银行城市、开户支行、银行账号</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {validaNumberCase, validaCommon} from '@/libs/validate';
    import ConfigTable from './configTable';
    import baseUrl from '../../../../../config/server';

    export default {
        name: 'WechatConfig',
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
                    wxAccount: [
                        {required: true, message: '请输入微信支付账户号', trigger: 'blur'},
                        // {validator: validaNumberCaseRule, trigger: 'blur'},
                        // {validator: validaNumberCaseRule, trigger: 'change'},
                    ],
                    remark: [
                        {required: true, message: '请输入账户备注', trigger: 'blur'},
                        // {validator: validaCommonRule, trigger: 'blur'},
                        // {validator: validaCommonRule, trigger: 'change'},
                    ],
                    wxAppId: [
                        {required: true, message: '请输入应用ID', trigger: 'blur'},
                    ],
                    merchantId: [
                        {required: true, message: '请输入商户号', trigger: 'blur'},
                    ],
                    appKey: [
                        {required: true, message: '请输入API密玥', trigger: 'blur'},
                    ],
                    appSecret: [
                        {required: true, message: '请输入appSecret', trigger: 'blur'},
                    ],
                    appBase64P12: [
                        {required: true, message: '请上传证书', trigger: 'blur'},
                    ],
                    hostVerify: [
                        {required: true, message: '请上传域名验证文件', trigger: 'blur'},
                    ],
                },
                activeList: [1, -1],
                queryForm: {
                    payeeId: '',
                    channelCode: 'wx',
                    wxAccount: '',
                    remark: '',
                    wxAppId: '',
                    merchantId: '',
                    appKey: '',
                    appSecret: '',
                    appBase64P12: '',

                    hostVerify: ''
                },
                uploadUrl_appBase64P12: baseUrl+'thirdpay/account/certUpload',
                uploadUrl_hostVerify: baseUrl+'thirdpay/account/certUpload',
                headerParam_appBase64P12: {
                    "fileType": 1
                },
                fileList: [],
                header: {
                    dataType: "json"
                }
            };
        },
        created () {
        },
        mounted () {

        },
        watch: {},
        methods: {
            activeAction (item) {
                const list = this.activeList;
                this.activeList = [...list.map((it, key) => {
                    if (key === item) {
                        it = 1;
                    } else {
                        it = -1;
                    }
                    return it;
                })];
            },
            handleUpload(file) { // 上传文件前的事件钩子
                console.log(this.headerParam_appBase64P12)
                console.log(file)
                if (file) {
                    // this.headerParam = Object.assign({}, this.headerParam, {timestamp: file.lastModified});
                    this.fileList.push(file);
                    // 保存文件到需要上传的文件数组里
                    // this.uploadFile.push(file);
                }
            },
            handleProgress(event, file) {
                this.$Modal.confirm({
                    content: '文件 ' + file.name + ' 正在上传...',
                });
            },
            handleFormatError(file) {
                this.$Modal.confirm({
                    content: '文件 ' + file.name + ' 格式不正确',
                    okText: '确定',
                    cancelText: '取消',
                });
                this.headerParam_appBase64P12 = {};
            },
            uploadSuccess(res, file) { // 文件上传回调 上传成功后删除待上传文件
                if (res.success === true) {
                    this.$Modal.confirm({
                        content: '文件 ' + file.name + '上传成功',
                        okText: '确定',
                    });
                    // this.headerParam_appBase64P12 = {};

                } else {
                    this.$Modal.warning({
                        content: '文件 ' + file.name + res.msg ? res.msg : '上传失败',
                        okText: '确定',
                    });
                    // this.headerParam_appBase64P12 = {};
                }
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../../styles/themeType";
    @import "../../../../styles/mixin";

    @media screen and (max-height: 786px) {

    }
</style>
