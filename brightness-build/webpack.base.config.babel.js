import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnano from 'cssnano';

import {getRootPath} from './tool/path';

global.styleRoot = getRootPath('brightness-frontend/styles');

export default (config)=> {
	return {
		cache: true,

		debug: true,

		entry: {
			'app': [getRootPath('brightness-frontend/app.js')],
			'vendor':
				[
					'angular',
					'angular-animate',
					'angular-cookies',
					'angular-resource',
					'angular-ui-bootstrap',
					'angular-ui-router',
					'animateplus',
					'bootstrap-sass',
					'classnames',
					'jquery',
					'js-cookie',
					'moment',
					'lodash',
					'ng-dialog',
					'scriptjs'
				]
		},

		output: {
			path: getRootPath('dist'),
			filename: '[name].js',
			publicPath: '/'
		},

		eslint: {
			configFile: './.eslintrc',
			ingore: './.eslintignore'
		},

		module: {
			preLoaders: [
				{
					test: /\.js$/,
					loader: "eslint-loader",
					exclude: /node_modules/
				}
			],
			loaders: [
				{
					test: /\.js$/,
					loaders: ['ng-annotate','babel'],
					exclude: /node_modules/
				},
				{
					test: /\.jade$/,
					loader: 'jade'
				},
				{
					test: /\.(png|jpg|gif)$/,
					loader: 'url?limit=2000'
				},
				{
					test: /\.(woff|woff2)(\?(.*))?$/,
					loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
				},
				{
					test: /\.ttf(\?(.*))?$/,
					loader: 'file?prefix=fonts/'
				},
				{
					test: /\.eot(\?(.*))?$/,
					loader: 'file?prefix=fonts/'
				},
				{
					test: /\.svg(\?(.*))?$/,
					loader: 'file?prefix=fonts/'
				},
				{
					test: /\.otf(\?(.*))?$/,
					loader: 'file?prefix=fonts/'
				}
			],
			noParse: []
		},

		resolve: {
			alias: {
				config: getRootPath( 'brightness-frontend', 'env', config.env ),
				root: getRootPath('brightness-frontend')
			},
			extensions: [
				'',
				'.js',
				'.vue',
				'.scss'
			]
		},

		singleRun: true,

		externals: [],

		postcss: [
			cssnano({
				autoprefixer: {
					add: true,
					remove: true,
					browsers: ['last 10 versions']
				},
				discardComments: {
					removeAll: true
				},
				discardUnused: false,
				mergeIdents: false,
				reduceIdents: false,
				safe: true,
				sourcemap: true
			})
		],

		context: __dirname,

		node: {
			__filename: true
		},

		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
				__DEBUG__: !config.release
			}),

			new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js"),

			new webpack.ProvidePlugin({
				'$': 'jquery',
				'jQuery': 'jquery',
				'window.jQuery': 'jquery'
			}),

			new webpack.ContextReplacementPlugin(/.*$/, /a^/),

			new ExtractTextPlugin('[name].[hash].css', {allChunks: true}),

			new HtmlWebpackPlugin({
				filename: './index.html',
				template: getRootPath('brightness-frontend/index.html'),
				inject: true,
				hash: true,
				chunks: ['vendor', 'app']
			})
		],

		devtool: 'source-map'
	}

};
