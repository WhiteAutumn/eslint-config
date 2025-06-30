import type { Linter } from 'eslint';

import n from 'eslint-plugin-n';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({
	plugins: {
		n
	},

	rules: {
		...prefixKeys('n', {
			'prefer-node-protocol': ['warn']
		})
	}
}) satisfies Linter.FlatConfig;
