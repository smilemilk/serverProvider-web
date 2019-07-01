<template>
    <div class="table-description">
        <dl v-for="(item,key) in dataDescription"
        >
            <dt>
                {{item.name}}
            </dt>
            <dd>
                <span v-if="key===0" class="table-item">
                   {{config === 'wx' ? '微信' : ''}}{{item.des}}
                </span>
                <span v-else class="table-item">
                    {{item.des}}
                </span>
            </dd>
        </dl>
    </div>
</template>

<script>

    export default {
        name: 'ConfigTable',
        components: {},
        props: ['config'],
        data () {
            return {
                dataDescription: [
                    {
                        name: '支付场景',
                        des: '支付账号开通功能'
                    },
                    {
                        name: '微脉APP',
                        des: 'H5支付'
                    },
                    {
                        name: 'H5',
                        des: 'H5支付'
                    },
                    {
                        name: '微信公众号',
                        des: '公众号支付(需公众号)'
                    },
                    {
                        name: '条码枪收款',
                        des: '刷卡支付(需公众号)'
                    },
                    {
                        name: '聚合码扫码支付',
                        des: '公众号支付(需公众号)'
                    },
                    {
                        name: '微信原生码扫码',
                        des: '扫码支付(需公众号)'
                    }
                ]
            };
        },
        created () {
        },
        mounted () {

        },
        watch: {},
        methods: {}
    };
</script>

<style lang="less" scoped>
    @import "../../../../styles/themeType";
    @import "../../../../styles/mixin";

    .table-description {
        border: 1px solid @border-theme;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        dl {
            flex:1;
            border-right: 1px solid @border-theme;
            &:nth-last-child(1) {
                border: none;
            }
        }
        dt {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            border-bottom: 1px solid @border-theme;
        }
        .table-item {
            padding: 0 2px;
            height: 36px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

    @media screen and (max-height: 786px) {

    }
</style>
