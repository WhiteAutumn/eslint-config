// @ts-check

import config from './dist/config.js';

export default [
	...config({
		strict:     process.env.STRICT === 'true',
		typescript: true
	}),
	{
		ignores: ['dist/*']
	}
];
