<template>
    <div class="merchant-select-wrapper">
        <ul v-if="merchantList">
            <li v-for="
                    item in merchantList">
                {{item.merchantName}}
            </li>
        </ul>
        <p class="empty" v-else>暂无相关机构</p>
    </div>
</template>

<script>
    export default {
        name: 'MerchantSelect',
        props: {
            merchantList: {
                type: Array,
                required: true
            }
        },
        data () {
            return {};
        },
        created () {

        },
        mounted () {

        },
        methods: {}
    };
</script>

<style lang="less" scoped>
    @import "../../../styles/themeType";

    .merchant-select-wrapper {
        border: 1px solid @border-theme;
        border-radius: 2px;
        height: 370px;
        .empty {
            margin-top: 30vh;
            text-align: center;
        }
    }
    @media screen and (max-height: 767px) {

    }
</style>
