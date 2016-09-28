import path from 'path';
import {concat} from 'lodash';

export const getRootPath = (...args)=>{
	const basePath = [__dirname, '../../'];
	return path.join.apply(
		null,concat(basePath,args)
	)
};