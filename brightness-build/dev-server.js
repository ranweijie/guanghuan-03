import config from './webpack.dev.config.babel';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import {getRootPath} from './tool/path';

const env = process.env.NODE_ENV || 'dev';
const envConfig = require(getRootPath('brightness-frontend', 'env', env));
const compiler = webpack(config);

const server = new webpackDevServer(compiler, {
	hot: true,
	quiet: false,
	noInfo: false,
	stats: { colors: true },
	proxy: envConfig.server ? {
		'/api/*': {
			target: envConfig.server
		},
		'/wechat/*': {
			target: envConfig.server
		}
	} : null
});

server.listen(3000);