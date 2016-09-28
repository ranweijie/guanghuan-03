process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import webpack from 'webpack';
import ngAnnotatePlugin from 'ng-annotate-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import webpackConfig from './webpack.base.config.babel';

const baseConfig  = webpackConfig({
	env : process.env.NODE_ENV,
	release : true
});

const styleConfig = {
	sourceMap: true,
	modules: true,
	importLoaders: 1,
	localIdentName: '[hash:base64:5]'
};

baseConfig.devtool = false;

baseConfig.debug = false;

baseConfig.module.loaders.unshift({
	test: /\.font\.js/,
	loader:ExtractTextPlugin
		.extract(
			'style','css!postcss!fontgen'
		)
});

baseConfig.module.loaders = baseConfig.module.loaders.concat(
	{
		test: /\.scss$/,
		loader: `style!css!postcss!sass?outputStyle=expanded&includePaths[]=${global.styleRoot}&sourceMap=${styleConfig.sourceMap}&modules=${styleConfig.modules}&importLoaders=${styleConfig.importLoaders}&localIdentName=${styleConfig.localIdentName}`
	},
	{
		test: /\.css$/,
		loader: ExtractTextPlugin
			.extract(
				'style', 'css!postcss'
			)
	}
);

baseConfig.plugins = baseConfig.plugins.concat(
	new ngAnnotatePlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin()
);

export default baseConfig;
