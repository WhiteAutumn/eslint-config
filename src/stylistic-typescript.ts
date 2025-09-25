import type { ESLint, Linter } from 'eslint';

import stylistic from '@stylistic/eslint-plugin';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({

	plugins: {
		'@stylistic': stylistic as ESLint.Plugin
	},

	rules: {
		...prefixKeys('@stylistic', {
			'member-delimiter-style': ['warn', {
				multiline:  { delimiter: 'semi', requireLast: true },
				singleline: { delimiter: 'comma', requireLast: false }
			}],
			'type-generic-spacing':     ['warn'],
			'type-named-tuple-spacing': ['warn']
		})
	}
} satisfies Linter.Config);
