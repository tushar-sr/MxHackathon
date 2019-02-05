const fs = require('fs')
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const settings = require('../src/server/settings');

const PATHS = {
    build: path.resolve(__dirname + '/../', 'dist/client'),
    spritePath: path.resolve(__dirname + '/../', 'dist/client/sprite/sprite.[hash].png'),
    spriteImageRef: settings.static_url + "sprite/sprite.[hash].png"
};
const extractBundleCSS = new ExtractTextPlugin({
    filename: 'css/styles.[hash].css',
    allChunks: true
});
const context = path.resolve(__dirname + '/../')

let config = {
    devtool: 'sourcemap',
	context: context,
	entry: {
		app: './src/client/index.jsx'
	},
	output: {
		path: PATHS.build,
		filename: 'js/[name]-1.[chunkhash].js',
        chunkFilename: 'js/[name]-1.[chunkhash].js',
        publicPath: settings.static_url + "/"
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
        modules: ["node_modules"],
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat",
            "create-react-class": "preact-compat/lib/create-react-class"
        }
	},
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
                        "preact"
                    ],
                    "plugins": ["transform-object-rest-spread"]
                }
            },
            {test: /\.png$/, loaders: [
                'file-loader?name=sprite-images/[name].png'
            ]},
            {test: /\.svg$/, loaders: [
                'svg-sprite-loader?name=sprite-icons/[name].svg'
            ]},
            {
                test: /\.(css|less|styl|scss|sass|sss)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [path.resolve(__dirname, "../src/app/styles/common")]
                            }
                        }],
                })
            }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__: true,
            __SERVER__: false,
            __DEBUG__: JSON.stringify(settings.debug),
            __STATIC_URL__: JSON.stringify(settings.static_url),
        }),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "..")
        }),
        new CopyWebpackPlugin([
            {
                from: context + '/node_modules/@mxplay/player/public',
                to: PATHS.build + '/js'
            },
            {
                from: context + '/node_modules/@mxplay/video-player/dist/video',
                to: PATHS.build + '/video'
            },
            {
                from: context + '/src/images',
                to: PATHS.build + '/images'
            },
            {
                from: context + '/src/fonts',
                to: PATHS.build + '/fonts'
            }
        ]),
        new ManifestPlugin({
			fileName: __dirname + '/../src/server/resources.json',
            prettyPrint: true,
            publicPath: '/'
		}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'external',
            filename: 'js/external.[chunkhash].js',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
        extractBundleCSS
    ]
};
module.exports = config
