'use strict';

const webpack = require('webpack');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
// const os = require('os');
// const fs = require('fs');
const path = require('path');
const config = require('../config');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// function resolve (dir) {
//     return path.join(__dirname, '..', dir)
// }
//
// const env = require('../config/prod.env')
const version = new Date().getTime(); // 添加版本号

const webpackConfig = merge(webpackBaseConfig, {
    output: {
        publicPath: './',
        filename: utils.assetsPath('js/[name].[chunkhash]' + version + '.js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash]' + version + '.js')
    },
    // module: {
    //     rules: utils.styleLoaders({
    //         sourceMap: config.build.productionSourceMap,
    //         extract: false
    //     })
    // },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('style/[name].[chunkhash]' + version + '.css'),
            allChunks: true
        }),
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: config.build.productionSourceMap
        //         ? { safe: true, map: { inline: false } }
        //         : { safe: true }
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'favicon.ico',
                to: 'favicon.ico'
            },
            {
                from: 'src/fonts',
                to: 'static/style'
            },
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsStaticPath,
                ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            title: '微脉在线支付结算平台',
            favicon: 'favicon.ico',
            filename: config.build.index,
            template: '!!ejs-loader!./src/template/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            cache: true,
            inject: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), // 只保留moment的简体中文
        new BundleAnalyzerPlugin()
    ]
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
