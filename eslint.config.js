// @ts-check
/*global process*/

import config from './dist/config.js';

export default [
	...config({
		strict:     process.env.STRICT === 'true',
		typescript: true,
		jsx:        true
	}),
	{
		ignores: ['dist/*']
	}
];
