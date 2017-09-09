'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        paths.appIndexJs
    ],
    output: {
        filename: 'bundle.[hash:8].js',
        path: paths.appBuild,
        pathinfo: true,
        publicPath: paths.appPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {importLoaders: 1, sourceMap: true}
                                },
                                'postcss-loader'
                            ]
                        })
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appIndexHtml
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new CopyWebpackPlugin(
            [
                {
                    from: paths.appPublic,
                    to: paths.appBuild
                }
            ],
            {
                ignore: ['index.html']
            }
        ),
        new ExtractTextPlugin('bundle.[contenthash:8].css')
    ],
    devtool: 'source-map',
    devServer: {
        hot: true,
        host: 'localhost',
        contentBase: paths.appBuild,
        publicPath: paths.appPublicPath,
        compress: false,
        historyApiFallback: true
    },
    performance: {
        hints: false
    }
};

