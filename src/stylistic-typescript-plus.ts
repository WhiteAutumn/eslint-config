import type { ESLint, Linter } from 'eslint';

import stylisticPlus from '@stylistic/eslint-plugin-plus';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({

	plugins: {
		'@stylistic/eslint-plugin-plus': <ESLint.Plugin> stylisticPlus
	},

	rules: prefixKeys('@stylistic/eslint-plugin-plus', {
		'type-generic-spacing':     ['warn'],
		'type-named-tuple-spacing': ['warn']
	})

} satisfies Linter.FlatConfig);
