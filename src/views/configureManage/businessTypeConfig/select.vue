<template>
    <div class="select-wrapper">
        <ul v-if="listFormat">
            <li v-for="
                    (item,key) in listFormat"
                :key="key"
                class="select-item"
                @click="merchantHandle(item)"
                :class="item.active ? 'active' : ''"
            >
                {{rank02 ? item.sysBizTypeName || '' : item.name || ''}}
            </li>
        </ul>
        <p class="empty" v-else>暂无相关数据</p>
    </div>
</template>

<script>
    export default {
        name: 'ModalSelect',
        props: {
            list: {
                type: Array,
                required: true
            },
            rank02: {
                type: Boolean,
                required: false
            }
        },
        data () {
            return {};
        },
        computed: {
            listFormat: {
                get: function () {
                    if (this.list)
                    this.list.forEach((it, key) => {
                        if (!this.rank02) {
                            if (key === 0) {
                                this.$set(it, 'active', true);
                            } else {
                                this.$set(it, 'active', false);
                            }
                            this.merchantHandle(this.list[0]);
                        } else {
                            this.$set(it, 'active', false);

                        }
                        return it;
                    });
                    return this.list;
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
            merchantHandle (item) {
                const list = this.list;
                this.listFormat = list.forEach(it => {

                    if (!this.rank02) {
                        if (it.name === item.name) {
                            this.$set(it, 'active', true);
                        } else {
                            this.$set(it, 'active', false);
                        }
                        return it;
                    } else {
                        if (it.sysBizTypeName === item.sysBizTypeName) {
                            this.$set(it, 'active', true);
                        } else {
                            this.$set(it, 'active', false);
                        }
                        return it;
                    }

                });
                this.$emit('on-change', {
                    rank: this.rank02 ? 2 : 1,
                    value: item
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../styles/themeType";

    .select-wrapper {
        border: 1px solid @border-theme;
        border-radius: 4px;
        width: 166px;
        min-height: 338px;
        padding: 3px;
        .empty {
            margin-top: 30vh;
            text-align: center;
        }
        .select {
            &-item {
                padding: 0 0 0 3px;
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
