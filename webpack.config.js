

const path = require("path"),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      webpack = require("webpack");


function absolutepath(){
    let args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.resolve(path.join.apply(null, args));
}


let entry_js = absolutepath("/static/js/core.js");


let entry_sass = absolutepath("/static/js/style.js");


let js_watcher = [
    absolutepath("/static/js/"),
];


let js_exclude = [
    absolutepath("/node_modules/"),
];


let sass_watcher = [
    absolutepath("/static/scss/"),
];


let output_path = absolutepath("/static/build/");


const config = {
    target: "web",
    entry: {
        app: entry_js,
        style: entry_sass,
    },
    output: {
        path: output_path,
        filename: "js/[name].js",
        publicPath: "/static/build/",
        pathinfo: process.env.NODE_ENV !== 'production'
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: js_watcher,
                exclude: js_exclude,
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    loader: [
                        {loader: "css-loader"}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    loader: [
                        {loader: "css-loader"},
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: sass_watcher
                            }
                        },
                    ],
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=img/[hash].[ext]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader?name=fonts/[hash].[ext]" },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/[name].css",
            disable: process.env.NODE_ENV !== 'production'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].common.js',
        }),
    ],
    performance: {
        hints: "warning",
    },
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },
};


if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: true,
                drop_console: true,
            },
            beautify: process.env.NODE_ENV !== 'production',
            comments: process.env.NODE_ENV !== 'production'
        })
    )
}
else {
    config.devtool = "source-map"
}


module.exports = config;