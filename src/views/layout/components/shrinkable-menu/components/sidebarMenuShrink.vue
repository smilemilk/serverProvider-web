<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index"
                          @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!--<Icon :size="20" :color="iconColor" :type="item.icon"></Icon>-->
                        <common-icons :size="20" :color="iconColor" :type="item.icon"></common-icons>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i">
                                <!--<Icon :type="child.icon"></Icon>-->
                                <common-icons :type="child.icon"></common-icons>
                                <span class="menu-label">{{ itemTitle(child) }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].name)"
                            style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!--<Icon :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon>-->
                        <common-icons :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></common-icons>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index">
                            <!--<Icon :type="item.children[0].icon || item.icon"></Icon>-->
                            <common-icons :type="item.children[0].icon || item.icon"></common-icons>
                            <span class="menu-label">{{ itemTitle(item.children[0]) }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
    import CommonIcons from '_c/common-icon/index.js'

    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            },
            iconColor: {
                type: String,
                default: 'white'
            },
            menuTheme: {
                type: String,
                default: 'darck'
            }
        },
        components: {
            CommonIcons
        },
        methods: {
            changeMenu(active) {
                this.$emit('on-change', active);
            },
            itemTitle(item) {
                if (typeof item.title === 'object') {
                    return item.title.i18n;
                } else {
                    return item.title;
                }
            }
        }
    };
</script>

<style lang="less">
    .menu-label {
        padding-left:10px;
        display: inline-block;
        min-width: 84px;
        text-align: left;
    }
</style>
