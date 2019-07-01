<template>
    <div>
        <wm-card title="支付方式配置"
                 class="margin-bottom-10">

            <div class="flex-content flex-content-start">
                <div class="border-right-dashed margin-right-10">
                    <Form ref="queryMerchant" :model="queryMerchant" inline :label-width="60" label-position="left">
                        <FormItem label="选择机构:">
                            <Input style="width:166px"
                                   v-model="queryMerchant.merchantName"
                                   @on-change="merchantHandle"
                                   placeholder="请输入机构"/>
                        </FormItem>
                    </Form>

                    <merchant-select
                            ref="select"
                            :merchant-list="merchantList"
                            @on-change="merchantCurrentHandle"
                            :init="merchantInit"
                    >
                    </merchant-select>
                </div>

                <div>
                    <Button-group class="margin-right-50">
                        <Button :type="tabCurrent==='account'? 'primary' : 'default'" @click="activeAction('account')" class="">收款账户配置
                        </Button>
                        <Button :type="tabCurrent==='mode' ? 'primary' : 'default'" @click="activeAction('mode')" class="">支付方式配置
                        </Button>
                    </Button-group>

                    <div class="margin-top-20">
                        <pay-account
                                v-if="tabCurrent==='account'"
                                ref="payAccount"
                                :query-params-primary="queryParams"
                                :query-merchant-primary="queryMerchant"
                        ></pay-account>

                        <pay-mode
                                v-if="tabCurrent==='mode'"
                                ref="payMode"
                                :query-params-primary="queryParams"
                                :query-merchant-primary="queryMerchant"
                        ></pay-mode>
                    </div>

                </div>

            </div>
        </wm-card>
    </div>
</template>

<script>
    import WmCard from '_c/card/card';
    import storeData from './store/payModeConfig';
    import {parseTime} from '@/filters';
    import ajax from '@/api/configureManage';
    import MerchantSelect from './select/select';
    import payAccount from './payModeConfig/payAccount';
    import payMode from './payModeConfig/payMode';

    export default {
        name: 'payModeConfig',
        components: {
            WmCard,
            MerchantSelect,
            payAccount,
            payMode
        },
        data () {
            return Object.assign({}, storeData.call(this), {
                queryMerchant: {
                    merchantName: '',
                    merchantId: ''
                },
                merchantList: [],
                merchantInit: true,
                queryParams: {
                    merchantId: 'all',
                    page: 1,
                    limit: 10
                },
                tabCurrent: 'account',
            });
        },
        created () {
        },
        mounted () {
            Promise.all([this.getMerchantList()]).then((results) => {
                if (results && results[0] && results[0].status) {

                    this.$refs.select.getSelectList();
                    if (results[0].value.length) {
                        this.queryMerchant.merchantId = results[0]['value'][0]['merchantId'];
                        this.merchantCurrentHandle(results[0]['value'][0]);
                        this.queryParams.merchantId = results[0]['value'][0]['merchantId'];
                        this.$refs.payAccount.getList();

                    } else {
                        this.merchantList = [];
                    }
                }
            });
        },
        watch: {},
        methods: {
            getMerchantList () {
                return new Promise((resolve, reject) => {
                    ajax.merchants({
                        merchantName: this.queryMerchant.merchantName
                    }).then(response => {
                        if (response.success == true) {
                            this.merchantList = response.data.items;
                        } else {
                            this.merchantList = [];
                        }
                        return resolve({
                            status: true,
                            value: response.data.items || []
                        });
                    }).catch(() => {
                        return reject({});
                    });
                }).catch(() => {
                });
            },
            merchantHandle () {
                this.merchantInit = false;
                this.queryMerchant.merchantId = '';

                Promise.all([this.getMerchantList()]).then((results) => {
                    if (results && results[0] && results[0].status) {
                        this.$refs.select.getSelectList();
                        if (results[0].value.length) {
                        } else {
                            this.merchantList = [];
                        }
                    }
                });
            },
            merchantCurrentHandle (item) {
                this.queryMerchant.merchantName = item.merchantName;
                this.queryMerchant.merchantId = item.merchantId;

                this.queryParams.merchantId = item.merchantId;
                if (this.queryParams.page !== 1) {
                    this.queryParams = {
                        ...this.queryParams,
                        page: 1
                    };
                }

                if (item === 'account') {
                    this.$refs.payAccount.getList();
                }
                if (item === 'mode') {
                    this.$refs.payMode.getList();
                }
            },
            addAction () {

            },
            helpAction () {
                this.$Modal.info({
                    title: '帮助说明',
                    content: '1、微脉代收账户为默认开通账户，无需配置账户信息，也不可修改账户信息\n' +
                    '2、若未配置直收账户，则使用微脉代收账户收款；若某资金通道配置直收账户，则优先使用直收账户收款\n' +
                    '3、目前一个资金通道只开放配置一个直收账户'
                });
            },
            activeAction (item) {
                if (this.tabCurrent !== item) {
                    this.tabCurrent = item;
                    if (item==='account') {
                        this.$refs.payAccount.getList();
                    }
                    if (item==='mode') {
                        this.$refs.payMode.getList();
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped>

    @media screen and (max-height: 786px) {

    }
</style>
