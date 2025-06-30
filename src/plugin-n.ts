import type { Linter } from 'eslint';

import nPlugin from 'eslint-plugin-n';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({
	plugins: {
		n: nPlugin
	},

	rules: {
		...prefixKeys('n', {
			'prefer-node-protocol': ['warn']
		})
	}
}) satisfies Linter.FlatConfig;
