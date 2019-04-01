'use strict';

const path = require('path');
const os = require('os');
const utils = require('./utils');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        main: '@/main',
        'vender-base': '@/vendors/vendors.base.js',
        'vender-exten': '@/vendors/vendors.exten.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader', // 将vue文件转化 为js模版
                options: vueLoaderConfig
                // options: {
                //     loaders: {
                //         css: 'vue-style-loader!css-loader',
                //         less: 'vue-style-loader!css-loader!less-loader'
                //     },
                //     postLoaders: {
                //         html: 'babel-loader'
                //     }
                // }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js[x]?$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'happypack/loader?id=happybabel'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        'css-loader?minimize',
                        'autoprefixer-loader'
                    ],
                })
            },
            {
                test: /\.less$/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader', // 编译后用来提取css文件
                        use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                    })
            }
            ,
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader:
                    'url-loader',
                options:
                    {
                        limit: 20000,
                        loader:
                            'url-loader',
                        name:
                            utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
            }
            ,
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader:
                    'image-webpack-loader',
            }
            ,
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader:
                    'url-loader',
                options:
                    {
                        limit: 10000,
                        name:
                            '[name].[ext]',
                    }
            }
            ,
            {
                test: /\.(html|tpl)$/,
                loader:
                    'html-loader'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    resolve:
        {
            extensions: ['.js', '.vue'],
            alias:
                {
                    'vue':
                        'vue/dist/vue.esm.js',
                    '@':
                        resolve('../src'),
                    '_c':
                        resolve('../src/components')
                }
        }
}
;
