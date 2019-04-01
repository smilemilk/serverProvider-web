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
        { path: 'home', title: '系统总览', name: 'home', hide: false, component: () => import('@/views/overview/overview.vue') },
        { path: 'ownspace', title: '商户信息', name: 'ownspace', hide: false, component: () => import('@/views/personInfo/personInfo.vue') },
        { path: 'help', title: '帮助中心', name: 'help', hide: false, component: () => import('@/views/help/help.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'grid',
        name: 'overview',
        title: '系统总览',
        component: Layout,
        children: [
            {
                path: 'home',
                title: '系统总览',
                name: 'home',
                icon: 'grid',
                hide: false,
                component: () => import('@/views/overview/overview.vue')
            }
        ]
    },
    {
        path: '/statistics',
        icon: 'clipboard',
        name: 'statistics',
        title: '统一对账',
        component: Layout,
        children: [
            {
                path: 'reconciliations',
                title: '统一对账',
                name: 'reconciliations',
                icon: 'clipboard',
                hide: false,
                component: () => import('@/views/statistics/reconciliations.vue'),
            },
            {
                path: 'reconciliationsHand',
                title: '统一对账',
                name: 'reconciliationsHand',
                icon: 'clipboard',
                hide: true,
                component: () => import('@/views/statistics/reconciliationsHand.vue'),
            },
            {
                path: 'reconciliations/report',
                title: '详情',
                name: 'statisticsReport',
                icon: 'clipboard',
                hide: true,
                meta: {
                    move: 'reconciliations',
                },
                component: () => import('@/views/statistics/statisticsReport.vue'),
            },
            {
                path: 'reconciliations/check',
                title: ' 报表',
                name: 'checkReport',
                icon: 'clipboard',
                hide: true,
                meta: {
                    move: 'reconciliations',
                },
                component: () => import('@/views/statistics/checkReport.vue'),
            },
            {
                path: 'reconciliations/check/detail',
                title: '对账详情',
                name: 'checkDetail',
                icon: 'clipboard',
                hide: true,
                meta: {
                    move: 'reconciliations',
                },
                component: () => import('@/views/statistics/checkReportDetail.vue'),
            }
        ]
    },
    {
        path: '/checkReconciliation',
        icon: '_guazhang',
        name: 'checkReconciliationDeal',
        title: '挂账处理查询',
        component: Layout,
        children: [
            {
                path: 'dealReconciliation',
                title: '挂账处理查询',
                name: 'dealReconciliation',
                icon: '_guazhang',
                hide: false,
                component: () => import('@/views/reconciliation/dealReconciliation.vue')
            },
        ]
    },
    {
        path: '/checkReconciliation',
        icon: '_fenxi',
        name: 'checkReconciliationDaily',
        title: '对账日报表',
        component: Layout,
        children: [
            {
                path: 'reconciliationDaily',
                title: '对账日报表',
                name: 'reconciliationDaily',
                icon: '_fenxi',
                hide: false,
                component: () => import('@/views/reconciliation/reconciliationDaily.vue')
            },
            {
                path: 'reconciliationDailyAnalysis',
                title: '对账日报分析',
                name: 'reconciliationDailyAnalysis',
                icon: '_baobiao',
                hide: true,
                component: () => import('@/views/reconciliation/reconciliationDailyAnalysis.vue')
            }
        ]
    },
    {
        path: '/checkReconciliation',
        icon: 'document',
        name: 'checkReconciliation',
        title: '对账月报表',
        component: Layout,
        children: [
            {
                path: 'reconciliationTotal',
                title: '总账报表',
                name: 'reconciliationTotal',
                icon: '_huizong',
                hide: false,
                component: () => import('@/views/reconciliation/reconciliationTotal.vue')
            },
            {
                path: 'reconciliationSpecification',
                title: '明细报表',
                name: 'reconciliationSpecification',
                icon: '_mingxi',
                hide: false,
                component: () => import('@/views/reconciliation/reconciliationSpecification.vue')
            }
        ]
    },
    {
        path: '/bill',
        icon: '_huizong',
        name: 'billOriginal',
        title: '资金汇总报表',
        component: Layout,
        children: [
            {
                path: 'total',
                title: '资金汇总报表',
                name: 'billTotal',
                icon: '_huizong',
                hide: false,
                component: () => import('@/views/billOriginal/billTotal.vue')
            }
        ]
    },
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
            // {
            //     path: 'register',
            //     title: '商户注册',
            //     name: 'merchantManageRegister',
            //     icon: 'clipboard',
            //     hide: false,
            //     component: () => import('@/views/configureManage/register.vue'),
            // }
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
