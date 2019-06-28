<template>
    <div class="merchant-select-wrapper">
        <ul v-if="list.length">
            <li v-for="
                    (item,key) in list"
                :key="key"
                class="select-item"
                @click="merchantHandle(item)"
                :class="item.active ? 'active' : ''"
            >
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
            },
            init: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {};
        },
        computed: {
            list: {
                get: function () {
                    if (this.merchantList) {

                        this.merchantList.forEach((it, key) => {
                            if (this.init) {

                                if (key === 0) {
                                    this.$set(it, 'active', true);
                                } else {
                                    this.$set(it, 'active', false);
                                }
                            } else {
                                this.$set(it, 'active', false);
                            }
                            return it;
                        });

                        return this.merchantList;
                    } else {
                        return [];
                    }
                },
                set: function (newValue) {
                    return newValue;
                }
            }
        },
        created () {

        },
        mounted () {

        },
        methods: {
            getSelectList () {
                return this.merchantList;
            },
            merchantHandle (item) {
                const list = this.merchantList;
                this.list = list.forEach(it => {
                    if (it.merchantId === item.merchantId) {
                        this.$set(it, 'active', true);
                    } else {
                        this.$set(it, 'active', false);
                    }
                    return it;
                });
                this.$emit('on-change', item);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../styles/themeType";

    .merchant-select-wrapper {
        border: 1px solid @border-theme;
        border-radius: 2px;
        width: 226px;
        height: 352px;
        padding: 3px;
        overflow: hidden;
        .empty {
            margin-top: 30vh;
            text-align: center;
        }
        .select {
            &-item {
                padding: 8px 0 7px 3px;
                border-bottom: 1px solid @border-theme;
                cursor: pointer;
                &:hover {
                    color: @main-theme-color;
                }
                &.active {
                    color: @main-theme-color;
                    background-color: @main-theme-blueLighter;
                }
            }
        }
    }

    @media screen and (max-height: 767px) {

    }
</style>
