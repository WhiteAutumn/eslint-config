import type { ESLint, Linter } from 'eslint';

import stylisticTs from '@stylistic/eslint-plugin-ts';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({

	plugins: {
		'@stylistic/ts': <ESLint.Plugin> stylisticTs
	},

	rules: {

		...prefixKeys('@stylistic/js', {
			'block-spacing':               ['off'],
			'brace-style':                 ['off'],
			'comma-dangle':                ['off'],
			'comma-spacing':               ['off'],
			'function-call-spacing':       ['off'],
			'indent':                      ['off'],
			'key-spacing':                 ['off'],
			'keyword-spacing':             ['off'],
			'no-extra-semi':               ['off'],
			'quotes':                      ['off'],
			'semi':                        ['off'],
			'space-before-blocks':         ['off'],
			'space-before-function-paren': ['off']
		}),

		...prefixKeys('@stylistic/ts', {
			'block-spacing':         ['warn', 'always'],
			'brace-style':           ['warn', 'stroustrup'],
			'comma-dangle':          ['warn', 'never'],
			'comma-spacing':         ['warn'],
			'function-call-spacing': ['warn'],
			'indent':                ['warn', 'tab'],
			'key-spacing':           ['warn', {
				singleLine: { beforeColon: false, afterColon: true, mode: 'strict' },
				multiLine:  { beforeColon: false, afterColon: true, mode: 'strict', align: 'value' }
			}],
			'keyword-spacing':        ['warn', { before: true, after: true }],
			'member-delimiter-style': ['warn', {
				multiline:  { delimiter: 'semi', requireLast: true },
				singleline: { delimiter: 'comma', requireLast: false }
			}],
			'no-extra-semi':               ['warn'],
			'quotes':                      ['warn', 'single', { avoidEscape: true }],
			'semi':                        ['warn', 'always'],
			'space-before-blocks':         ['warn', 'always'],
			'space-before-function-paren': ['warn', {
				anonymous:  'never',
				named:      'never',
				asyncArrow: 'always'
			}]
		})
	}
} satisfies Linter.FlatConfig);
