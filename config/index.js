'use strict'

const path = require('path')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        disableHostCheck: true,
        allowedHosts: [
            'test.weimaipay.com'         // 允许绑定本地域名
        ],
        overlay: {    // webpack编译出错，在网页显示出错信息
            errors: true    // 只显示错误信息，不现实警告等信息
        },
        proxyTable: {
            '/unioncheck': {
                target: 'https://test.weimaipay.com',
                // target: 'https://www.weimaipay.com',
                // target: 'http://test.weimaipay.com:46002',
                // target: 'http://192.168.3.236:8070/',  //甘松香ip
                secure: false, // https域名
                changeOrigin: true,
                pathRewrite: {
                    '^/unioncheck': ''
                }
            }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8056, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        useEslint: true,
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',

        // you can set by youself according to actual condition
        assetsPublicPath: './',
        assetsStaticPath: './static',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // bundleAnalyzerReport: process.env.npm_config_report
    }
}
