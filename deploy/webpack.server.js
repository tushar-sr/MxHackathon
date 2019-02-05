const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WrapperPlugin = require('wrapper-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const settings = require('../src/server/settings');
const dummyPlugin = function(){};

const PATHS = {
    build: path.resolve(__dirname + '/../', 'dist/server')
};

module.exports = {
    context: path.resolve(__dirname + '/../'),
    entry: './src/server/www.js',
    target: 'node',
    output: {
        path: PATHS.build,
        filename: 'index.js'
    },
    node: {
        __filename: false,
        __dirname: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: ["node_modules"],
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    externals: [nodeExternals({
        whitelist: function(path){
                        return path.indexOf("@mxplay") !== -1;
                    }
    })],
    plugins: [
        new webpack.DefinePlugin({
            __STATIC_URL__: ""
        }),
        new WrapperPlugin({
            test: /\.js$/, // only wrap output of bundle files with '.js' extension 
            header: 'require("module-alias/register");',
            footer: ''
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '..', 'src/server/templates'),
            to: path.join(__dirname, '..', 'dist/server/templates')
        }, {
            from: path.join(__dirname, '..', 'src/images'),
            to: path.join(__dirname, '..', 'dist/client/images')
        }, {
            from: path.join(__dirname, '..', 'src/fonts'),
            to: path.join(__dirname, '..', 'dist/client/fonts')
        }
    ])
    ],
    module: {
        rules: [
            {
                test: /\.jsx|\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    presets: [
                        "env",
                        "preact",
                        "stage-2"],
                    plugins: [
                        [
                            "transform-runtime",
                            {
                                "polyfill": false,
                                "regenerator": true
                            },
                            "transform-object-rest-spread"
                        ]
                    ]
                }
            },
            {test: /\.png$/, loaders: [
                'file-loader?name=sprite/[name].png'
            ]},
            {test: /\.svg$/, loaders: [
                'file-loader?name=font-icons/[name].svg'
            ]},
            {
                test: /\.(css|less|styl|scss|sass|sss)/,
                use: [
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, "../src/app/styles/common")]
                        }
                    }]
            }
        ]
    },
    devtool: 'sourcemap'
};