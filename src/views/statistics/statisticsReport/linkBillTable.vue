<template>
    <div
    >
        <title-item
                text="关联账单列表"
                size-type="small"
                class="margin-top-20 border-top-dash"
        ></title-item>
        <Form ref="queryCheckDetailObj"
              :model="queryCheckDetailObj"
              inline
              :label-width="60"
              label-position="left"
              class="searchBox margin-bottom-10">
            <FormItem label="单号:">
                <Input
                        v-model="queryCheckDetailObj.orderNo"
                        placeholder="请输入单号"
                        style="width: 140px"></Input>
            </FormItem>
            <Button type="primary" class="margin-right-10" @click="queryRelationCheck">查询</Button>
            <Button type="primary" class="margin-right-10" @click="moveToBlending">移至手工勾对区</Button>
            <Button @click="handleSelectAll(true)" style="display:none;">全选</Button>
        </Form>
        <Table
                ref="table"
                :loading="loadingTable"
                :columns="columnsTableRelation"
                :row-class-name="rowClassName"
                :data="dataListBill"
                highlight-row
                border
                width="100%"
                no-data-text="暂无数据"
                no-filtered-data-text="暂无筛选结果"
                @on-selection-change="handleRowChange"
        ></Table>
    </div>
</template>

<script>
    import TitleItem from '_c/title/index';
    import ajax from '@/api/statistics';
    import extendHospital from './tableExpend/expendHospital';
    import extendApp_hospital from './tableExpend/expendApp_hospital';
    import extendApp_fund from './tableExpend/expendApp_fund';
    import extendFund from './tableExpend/expendFund';
    import {autoCheckStatus} from '@/filters/statistics';

    export default {
        name: 'link-bill',
        components: {
            TitleItem
        },
        data() {
            return {
                multipleSelection: [], // 计算选中项
                queryCheckDetailObj: {
                    orderNo: '',
                    isRelation: ''
                },
                loadingTable: false,
                columnsTableRelation: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        width: 80,
                        title: '序号',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', params.index*1+1)
                        }
                    },
                    {
                        title: '医院账单',
                        align: 'center',
                        render: (h, params) => {
                            return h(extendHospital, {
                                props: {
                                    rowTemp: params.row
                                }
                            });
                        }
                    },
                    {
                        title: '应用账单',
                        align: 'center',
                        children: [
                            {
                                align: 'center',
                                title: '对应医院账单',
                                render: (h, params) => {
                                    return h(extendApp_hospital, {
                                        props: {
                                            rowTemp: params.row
                                        }
                                    });
                                }
                            },
                            {
                                align: 'center',
                                title: '对应资金账单',
                                render: (h, params) => {
                                    return h(extendApp_fund, {
                                        props: {
                                            rowTemp: params.row
                                        }
                                    });
                                }
                            },
                        ]
                    },
                    {
                        title: '资金通道账单',
                        align: 'center',
                        render: (h, params) => {
                            return h(extendFund, {
                                props: {
                                    rowTemp: params.row
                                }
                            });
                        }
                    },
                    {
                        key: 'autoCheckStatus',
                        title: '自动对账结果',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            return h('div', params.row.autoCheckStatus ? autoCheckStatus(params.row.autoCheckStatus) : '--');
                        }
                    }
                ], // 手工勾对 end,
                dataListBill: []
            }
        },
        props: {
            emptyStatus: {
                type: Boolean,
                default: true
            },
            autoCheckNo: {
                type: Number,
                default: null
            },
            id: {
                default: '',
                type: String
            }
        },
        methods: {
            show() {
                this.queryCheckDetailObj.orderNo = '';
                this.dataListBill = [];
            },
            relationBill() {
                    let param = {
                        orderNo: this.queryCheckDetailObj.orderNo + '' || '',
                        autoCheckNo: this.autoCheckNo || '',
                        checkOrderNo: this.id + '' || '',
                        relationQuery: this.queryCheckDetailObj.isRelation
                    };

                    this.loadingTable = true;

                    ajax.checkSummary(param).then(response => {
                        this.loadingTable = false;
                        if (response.success === true) {
                            let res = response.data.items;
                            if (res.length === 0) {
                                this.$Message.success({
                                    content: response.msg ? response.msg : '暂无关联账单数据',
                                    duration: 2,
                                    closable: true
                                });
                            }
                            res.map((it, key)=> {
                                this.$set(it, 'indexKey', key+1);
                                this.$set(it, 'showStatus', true);
                            });
                            this.dataListBill = res;
                        } else {
                            this.loadingTable = false;
                            this.$Message.error({
                                content: response.msg ? response.msg : '关联账单请求未成功',
                                duration: 2,
                                closable: true
                            });
                        }
                    }).catch(() => {
                    });
            },
            queryRelationCheck(){
                if (!this.queryCheckDetailObj.orderNo){
                    this.$Message.error({
                        content: '请输入单号查询',
                        duration: 2,
                        closable: true
                    });
                    this.dataListBill = [];
                    return;
                }

                this.queryCheckDetailObj.isRelation = true;
                this.relationBill();
                this.selectAll = false;
            },
            moveToBlending() {
                if (this.multipleSelection.length > 0) {
                    let num = this.multipleSelection.length;
                    this.$Modal.confirm({
                        content: '确定要移至手工勾对区' + num + '条数据?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            let that = this;
                            this.$emit('move', that.multipleSelection);
                            if (that.multipleSelection) {
                                let list = that.multipleSelection.map(it => {
                                    return it.autoCheckNo;
                                });
                                let forList = [];
                                this.dataListBill.forEach(it=> {
                                    list.forEach(index => {
                                        if (it.autoCheckNo === index) {
                                            this.$set(it, 'showStatus', false);
                                            it.showStatus = false;
                                        }
                                    });
                                    forList.push(it);
                                });
                                this.dataListBill = forList;
                                this.multipleSelection = [];
                            }
                        }
                    });
                } else {
                    this.$Message.error({
                        content: '请先选择账单',
                        duration: 2,
                        closable: true
                    });
                    return;
                }
            },
            removeRelation(key) {
                this.dataListBill.map(it=>{
                    if (key) {
                        if (key === it['indexKey']) {
                            this.$set(it, 'showStatus', true);
                        }
                    } else {
                        this.$set(it, 'showStatus', true);
                    }
                });
            },
            rowClassName (row) {
                if (row.showStatus === false) {
                    return 'hidden';
                } else {
                    return '';
                }
            },
            handleRowChange(selection, row) {
                this.multipleSelection = selection;
            },
            handleSelectAll(status) {
                this.$refs.table.selectAll(status);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../styles/common";

    @media screen and (max-height: 786px) {

    }
</style>


