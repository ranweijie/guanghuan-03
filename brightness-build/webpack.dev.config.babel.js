process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

import webpack from 'webpack';
import webpackConfig from './webpack.base.config.babel';

const baseConfig  = webpackConfig({
	env : process.env.NODE_ENV,
	release : false
});

const styleConfig = {
	sourceMap: true,
	modules: true,
	importLoaders: 1,
	localIdentName: '[name]__[local]___[hash:base64:5]'
};

baseConfig.entry.app.unshift(
	"webpack/hot/dev-server",
	"webpack-dev-server/client?http://0.0.0.0:3000"
);

baseConfig.output.publicPath = '/';

baseConfig.module.loaders.unshift({
	test: /\.font\.js$/,
	loaders: ['style', 'css','postcss','fontgen']
});

baseConfig.module.loaders = baseConfig.module.loaders.concat(
	{
		test: /\.scss$/,
		loader: `style!css!postcss!sass?outputStyle=expanded&includePaths[]=${global.styleRoot}&sourceMap=${styleConfig.sourceMap}&modules=${styleConfig.modules}&importLoaders=${styleConfig.importLoaders}&localIdentName=${styleConfig.localIdentName}`
	},
	{
		test: /\.css$/,
		loaders: ['style', 'css','postcss']
	}
);

baseConfig.plugins = baseConfig
	.plugins
	.concat([
		new webpack.HotModuleReplacementPlugin()
	]);

export default baseConfig;
