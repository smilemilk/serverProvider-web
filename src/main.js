import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
// import '@/locale';
import ElementUI from 'element-ui';

import locale from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css';
import 'iview/dist/styles/fonts/ionicons.svg';
import 'iview/dist/styles/fonts/ionicons.ttf';
import 'iview/dist/styles/fonts/ionicons.woff';
import 'iview/dist/styles/fonts/ionicons.woff2';

import localeEle from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/total.less';
// import VueI18n from 'vue-i18n';
import util from './libs/util';
// import JsEncrypt from 'jsencrypt/bin/jsencrypt';

import filter from '@/filters/filters';

// Vue.use(VueI18n);
Vue.use(iView, {locale});
// Vue.use(JsEncrypt);

// Vue.prototype.$JE = JsEncrypt;

Vue.use(ElementUI, { localeEle });
Vue.mixin(filter);

let fundebug = require("fundebug-javascript");
fundebug.apikey = "14705b46064dd7cdbf7859fc4aa6196931d200b45a7935777220762376e3f103";

    fundebug = {
    ...fundebug,
    silent: false, // true的时候，不再收集任何错误
    appversion: '', // 应用版本
    releasestage: 'test', // development,test,production
    callback: function(event) {
        console.log(event)
    },
    setHttpBody: true, // 记录http请求的body参数
    silentWebsocket: true, // 不允许websoket
    silentVideo: false,    // 允许录屏
    silentBehavior: false, // 记录用户行为
    silentConsole: true, // 不需要
    filters: [// 过滤不需要的捕获错误
        {
            message: /^Script error\.$/
        },
        {
            message: /WeixinJSBridge is not defined/
        }
    ]
};

function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    var name = vm._isVue
        ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
        : vm.name;
    return (
        (name ? 'component <' + name + '>' : 'anonymous component') +
        (vm._isVue && vm.$options && vm.$options.__file
            ? ' at ' + (vm.$options && vm.$options.__file)
            : '')
    );
}

Vue.config.errorHandler = function(err, vm, info) {
    if (vm) {
        var componentName = formatComponentName(vm);
        var propsData = vm.$options && vm.$options.propsData;
        fundebug.notifyError(err, {
            metaData: {
                componentName: componentName,
                propsData: propsData,
                info: info
            }
        });
    } else {
        fundebug.notifyError(err);
    }
};

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
