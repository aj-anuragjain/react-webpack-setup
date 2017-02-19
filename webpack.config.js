/**
 * Created by jain-hub on 3/2/17.
 */

var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require("path");


function absolute_path(arg){
    "use strict";
    return path.join(__dirname + arg)
}


var STYLE_PATH, JS_PATH, BUILD_PATH, SASS_WATCH, JS_WATCH;


STYLE_PATH = absolute_path("/static/js/style.js");
JS_PATH = absolute_path("/static/js/core.js");
BUILD_PATH = absolute_path("/build/");
SASS_WATCH = absolute_path("/static/scss/");
JS_WATCH = absolute_path("/static/js/");


module.exports = {
    devtool: "source-map",
    entry: {
        style: STYLE_PATH,
        bundle: JS_PATH,
    },
    output:{
        path: BUILD_PATH,
        filename: "js/[name].js",
        publicPath: "/build/",
        pathInfo: true
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("css/[name].css", {allChunks: true}),
        /*new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
             'process.env': {
                NODE_ENV: JSON.stringify('production')
             }
         }),*/
    ],
    module: {
        loaders: [
            {
                test : /\.js?/,
                include: JS_WATCH,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=img/[hash].[ext]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=fonts/[hash].[ext]" },
        ]
    },
    sassLoader: {
        includePaths: [
            SASS_WATCH,
        ]
    }
};