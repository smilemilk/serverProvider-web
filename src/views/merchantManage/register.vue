<template>
    <div>
        <wm-card title="商户注册"
                 class="margin-bottom-10">
            <Form ref="queryParams" :model="queryParams" inline :label-width="70" label-position="left">
                <div>
                    <title-item text="基本信息"  class="margin-top-20"></title-item>
                    <FormItem label="商户类型:">
                        <Select v-model="queryParams.merchantType"
                                style="width:160px">
                            <Option v-for="item in dealTypeList" :value="item.id" :key="item.value">
                                {{item.value}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="商户名称:">
                        <Input
                        v-model="queryParams.merchantName"
                        :value.sync="queryParams.merchantName"
                        placeholder="请输入商户名称"
                        ></Input>
                    </FormItem>

                    <FormItem label="商户简称:">
                        <Input
                                v-model="queryParams.merchantShortName"
                                :value.sync="queryParams.merchantShortName"
                                placeholder="请输入商户简称"
                        ></Input>
                    </FormItem>

                    <FormItem label="外部编号:">
                        <Input
                                v-model="queryParams.outerNumber"
                                :value.sync="queryParams.outerNumber"
                                placeholder="请输入外部编号"
                        ></Input>
                    </FormItem>

                    <FormItem label="商户地址:">
                        <Select v-model="queryParams.merchantAddress"
                                style="width:160px">
                            <Option v-for="item in dealTypeList" :value="item.id" :key="item.value">
                                {{item.value}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="商户管理员:">
                        <Input
                                v-model="queryParams.merchantManager"
                                :value.sync="queryParams.merchantManager"
                                placeholder="请输入商户管理员"
                        ></Input>
                    </FormItem>

                    <FormItem label="管理员手机:">
                        <Input
                                v-model="queryParams.merchantManagerPhone"
                                :value.sync="queryParams.merchantManagerPhone"
                                placeholder="请输入管理员手机"
                        ></Input>
                    </FormItem>
                </div>

                <div>
                    <title-item text="商户联系人" sizeType="small" class="margin-top-20"></title-item>
                    <FormItem label="联系人:">
                        <Input
                                v-model="queryParams.contacts"
                                :value.sync="queryParams.contacts"
                                placeholder="请输入联系人"
                        ></Input>
                    </FormItem>
                    <FormItem label="联系人手机:">
                        <Input
                                v-model="queryParams.contactsPhone"
                                :value.sync="queryParams.contactsPhone"
                                placeholder="请输入联系人手机"
                        ></Input>
                    </FormItem>
                </div>

                <div>
                    <title-item text="收款信息" sizeType="small" class="margin-top-20"></title-item>
                </div>

                <div>
                    <title-item text="结算信息" sizeType="small" class="margin-top-20"></title-item>
                    <FormItem label="收款人名称">
                        <Input
                                v-model="queryParams.payeeName"
                                :value.sync="queryParams.payeeName"
                                placeholder="请输入收款人名称"
                        ></Input>
                    </FormItem>
                    <FormItem label="收款银行:">
                        <Input
                                v-model="queryParams.payeeBank"
                                :value.sync="queryParams.payeeBank"
                                placeholder="请输入收款银行"
                        ></Input>
                    </FormItem>
                    <FormItem label="收款银行账号">
                        <Input
                                v-model="queryParams.payeeBankAccount"
                                :value.sync="queryParams.payeeBankAccount"
                                placeholder="请输入收款银行账号"
                        ></Input>
                    </FormItem>
                    <FormItem label="收款银行地址">
                        <Select v-model="queryParams.payeeBankAddress"
                                style="width:160px">
                            <Option v-for="item in dealTypeList" :value="item.id" :key="item.value">
                                {{item.value}}
                            </Option>
                        </Select>
                    </FormItem>
                </div>

                <div>
                    <title-item text="账户功能" sizeType="small" class="margin-top-20"></title-item>
                    <FormItem label="申请事由">
                        <Input
                                type="textarea"
                                v-model="queryParams.applyReason"
                                :value.sync="queryParams.applyReason"
                                placeholder="请说明申请事由（必填，不少于10个字符）"
                        ></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input
                                type="textarea"
                                v-model="queryParams.remark"
                                :value.sync="queryParams.remark"
                                placeholder="请添加申请备注，仅自己可见"
                        ></Input>
                    </FormItem>
                </div>

                <div>
                    <title-item text="申请事由及备注" sizeType="small" class="margin-top-20"></title-item>
                </div>

            </Form>
            <Row>
                <Col span="18" :md="18" :sm="24" :xs="24">
                    <Button type="primary" @click="getListAction()">返回</Button>
                    <Button type="primary">保存为草稿</Button>
                    <Button type="primary">提交审核</Button>
                </Col>
            </Row>
        </wm-card>
    </div>
</template>

<script>
    import WmCard from '_c/card/card';
    import TitleItem from '_c/title/index';
    import storeData from './store/list';
    import {parseTime} from '@/filters';
    import ajax from '@/api/statistics';

    export default {
        name: 'reconciliations',
        components: {
            WmCard,
            TitleItem
        },
        data () {
            return Object.assign({}, storeData.call(this), {

            });
        },
        created () {

        },
        methods: {

        }
    };
</script>

<style lang="less" scoped>

    @media screen and (max-height: 786px) {

    }
</style>
