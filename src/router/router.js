import Layout from '@/views/layout/layout.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: 'login',
    name: 'login',
    meta: {
        title: '微脉在线支付结算平台'
    },
    component: () => import('@/views/login/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/layout/components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Layout,
    children: [
        { path: 'home', title: '首页', name: 'home', hide: false, component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '商户信息', name: 'ownspace', hide: false, component: () => import('@/views/personInfo/personInfo.vue') },
        { path: 'help', title: '帮助中心', name: 'help', hide: false, component: () => import('@/views/help/help.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/merchantManage',
        icon: 'clipboard',
        name: 'merchantManage',
        title: '商户管理',
        component: Layout,
        children: [
            {
                path: 'list',
                title: '商户列表',
                name: 'merchantManageList',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/merchantManage/list.vue'),
            },
            {
                path: 'register',
                title: '商户注册',
                name: 'merchantManageRegister',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/merchantManage/register.vue'),
            }
        ]
    },
    {
        path: '/configureManage',
        icon: 'clipboard',
        name: 'configureManage',
        title: '配置管理',
        component: Layout,
        children: [
            {
                path: 'payScene',
                title: '支付场景配置',
                name: 'configurePayScene',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/configureManage/payScene.vue'),
            },
            {
                path: 'businessTypeConfig',
                title: '业务类型管理',
                name: 'businessTypeConfig',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/configureManage/businessTypeConfig.vue'),
            },
            {
                path: 'payModeConfig',
                title: '支付方式配置',
                name: 'payModeConfig',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/configureManage/payModeConfig.vue'),
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
