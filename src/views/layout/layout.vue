<template>
    <div>
        <div class="main" :class="{'main-hide-text': shrink}">
            <div class="sidebar-menu-con"
                 :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
                <!--<scroll-bar ref="scrollBar">-->
                    <shrinkable-menu
                            :shrink="shrink"
                            :before-push="beforePush"
                            :open-names="openedSubmenuArr"
                            :menu-list="menuList">
                        <div slot="top" class="logo-con" style="margin-top: 10px;">
                            <img v-show="!shrink" src="../../images/logo.png" key="max-logo"
                                 style="width: 60%; height: 60%;"/>
                            <img v-show="shrink" src="../../images/logo-min.png" key="min-logo"
                                 style="width: 25px; height: auto;"/>
                        </div>
                    </shrinkable-menu>
                <!--</scroll-bar>-->
            </div>
            <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
                <div class="main-header">
                    <div class="navicon-con">
                        <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                                @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                    </div>
                    <!--<breadcrumb-nav-->
                            <!--:currentPath="currentPath">-->
                    <!--</breadcrumb-nav>-->
                    <transition name="slide-fade">
                        <div class="alert-con"
                             v-if="this.$route.name === 'home'

                              ? alertWelcome = true : alertWelcome = false">

                                <Alert type="success"
                                       show-icon
                                       closable
                                >欢迎使用微脉在线支付结算平台！
                                </Alert>
                        </div>
                    </transition>
                    <div class="header-avator-con">
                        <div class="help-access" @click="helpAccess">
                            <i class="iconfont icon-bangzhu"></i><span>帮助</span>
                        </div>
                        <!--<help-tip v-model="mesCount"></help-tip>-->
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">{{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="ownSpace">商户信息</DropdownItem>
                                        <DropdownItem name="loginOut" divided>退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <!--<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>-->
                            </Row>
                        </div>
                    </div>
                </div>
                <div class="tags-con">
                    <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
                    <i class="iconfont icon-up tag-opera" @click="tagUp"></i>
                    <i class="iconfont icon-down tag-opera tag-opera-down" @click="tagDown" style="display: none;"></i>
                </div>
            </div>
            <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
                <div class="single-page">
                    <keep-alive :include="cachePage">
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
        <lock-screen v-if="lockStatus === true"></lock-screen>
    </div>
</template>

<script>
    import shrinkableMenu from './components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './components/tags-page-opened.vue';
    // import breadcrumbNav from './components/breadcrumb-nav.vue';
    import lockScreen from './components/lockscreen/lockscreen.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import scrollBar from '@/components/scroll-bar/vue-scroller-bars';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            // breadcrumbNav,
            scrollBar,
            lockScreen
        },
        data () {
            return {
                alertWelcome: true,
                shrink: true,
                userName: '',
                lockStatus: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                initStatus: true
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            }
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace');
                    this.$router.push({
                        name: 'ownspace'
                    });
                } else if (name === 'loginOut') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.dispatch('loginOut', this).then(() => {
                        if (this.$store.state.fetching === true) {
                            this.$router.push({
                                name: 'login'
                            });
                        } else {
                            this.$Message.error('未退出此次登录');
                        }
                    });
                    this.$store.commit('clearAllTags');
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            lockService () {
                this.$store.dispatch('userInfo', this).then(() => {
                    if (this.$store.state.userFetching === true) {
                        const data = this.$store.state.userInfo;

                        if (data !== null && data !== '' && data !== {} && data.data !== {}) {
                            if (data.data && data.data.timeout) {
                                this.lockStatus = false;
                                Cookies.set('locking', 0);
                                Cookies.set('user', '');
                                Cookies.set('password', '');
                                this.$router.push({
                                    name: 'home'
                                });
                            } else {
                                this.lockStatus = false;
                            }
                        } else {
                            this.lockStatus = true;
                            Cookies.set('locking', 1);
                        }
                    } else {
                        this.lockStatus = false;
                        Cookies.set('locking', 0);
                        Cookies.set('user', '');
                        Cookies.set('password', '');
                        this.$router.push({
                            name: 'home'
                        });
                        this.$Message.error('用户状态获取存在异常');
                    }
                }).catch(() => {
                    this.$Message.error('用户接口未请求成功');
                });
            },
            lockScreen () {
                let that = this;
                setInterval(function () {
                    that.lockService();
                }, 60000);
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            helpAccess () {
                util.openNewPage(this, 'help');
                this.$router.push({
                    name: 'help'
                });
            },
            tagUp() {
                document.querySelector('.tags-con').style.height = '0px';
                document.querySelector('.main-header-con').style.height = '40px';
                document.querySelector('.single-page-con').style.top = '40px';
                document.querySelector('.tag-opera-down').style.display = 'block';
            },
            tagDown() {
                if (window.screen.availHeight > 786) {
                    document.querySelector('.main-header-con').style.height = '100px';
                    document.querySelector('.single-page-con').style.top = '100px';
                } else {
                    document.querySelector('.main-header-con').style.height = '83px';
                    document.querySelector('.single-page-con').style.top = '82px';
                }
                document.querySelector('.tags-con').style.height = '40px';
                document.querySelector('.tag-opera-down').style.display = 'none';
            }
        },
        watch: {
            '$route' (to, form) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
                if (to.name !== "" &&  to.name !=="login" && localStorage.cachePage) {
                   this.initStatus = false;
                }
            },
            openedSubmenuArr () {
                // setTimeout(() => {
                // this.scrollBarResize();
                // }, 300);
            }
        },
        mounted () {
            this.init();
            // window.addEventListener('resize', this.scrollBarResize);
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.lockScreen();
        }
    };
</script>

<style scoped lang="less">
    .header-avator-con {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
    .main-header{
        .header-avator-con {
            .user-dropdown-menu-con {
                position: static;
            }
        }
    }
    .help-access {
        margin-right: 25px;
        height: 42px;
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
            margin-right: 2px;
            font-size: 15px;
        }
        &:hover {
            i, span{
                color: #2d8cf0;
            }
        }
    }

    .slide-fade-enter {
        opacity: 0;
        width: 0;
        transform: scale(0);
    }
    .slide-fade-enter-active {
        width: 100%;
        opacity: 1;
        transform: scale(1);
        transiton: all 6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .tags-con {
        position: relative;
        .tag-opera[class*='up'] {
            position: absolute;
            right: 6px;
            top: 8px;
            font-size: 18px;
        }
        .tag-opera[class*='down'] {
            position: fixed;
            right: 4px;
            top: 39px;
            font-size: 18px;
            z-index: 9999;
        }
    }
</style>

