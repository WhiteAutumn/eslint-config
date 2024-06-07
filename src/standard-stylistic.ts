import type { ESLint, Linter } from 'eslint';

import stylisticJs from '@stylistic/eslint-plugin-js';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({

	plugins: {
		'@stylistic/js': <ESLint.Plugin> stylisticJs
	},

	rules: prefixKeys('@stylistic/js', {
		'array-bracket-spacing':     ['warn', 'never'],
		'arrow-parens':              ['warn', 'as-needed'],
		'arrow-spacing':             ['warn', { before: true, after: true }],
		'block-spacing':             ['warn', 'always'],
		'brace-style':               ['warn', 'stroustrup'],
		'comma-dangle':              ['warn', 'never'],
		'comma-spacing':             ['warn'],
		'comma-style':               ['warn'],
		'computed-property-spacing': ['warn'],
		'dot-location':              ['warn', 'property'],
		'eol-last':                  ['warn'],
		'function-call-spacing':     ['warn'],
		'generator-star-spacing':    ['warn', {
			before: false,
			after:  true,
			method: { before: true, after: false }
		}],
		'indent': ['warn', 'tab', {
			SwitchCase: 1
		}],
		'jsx-quotes':  ['warn', 'prefer-single'],
		'key-spacing': ['warn', {
			singleLine: { beforeColon: false, afterColon: true, mode: 'strict' },
			multiLine:  { beforeColon: false, afterColon: true, mode: 'strict', align: 'value' }
		}],
		'keyword-spacing':               ['warn', { before: true, after: true }],
		'linebreak-style':               ['warn', 'unix'],
		'new-parens':                    ['warn', 'always'],
		'no-extra-semi':                 ['warn'],
		'no-mixed-spaces-and-tabs':      ['warn'],
		'no-trailing-spaces':            ['warn'],
		'no-whitespace-before-property': ['warn'],
		'object-curly-newline':          ['warn', { consistent: true }],
		'object-curly-spacing':          ['warn', 'always'],
		'quote-props':                   ['warn', 'consistent-as-needed'],
		'quotes':                        ['warn', 'single', { avoidEscape: true }],
		'rest-spread-spacing':           ['warn', 'never'],
		'semi':                          ['warn', 'always'],
		'semi-spacing':                  ['warn', { before: false, after: true }],
		'semi-style':                    ['warn', 'last'],
		'space-before-blocks':           ['warn', 'always'],
		'space-before-function-paren':   ['warn', {
			anonymous:  'never',
			named:      'never',
			asyncArrow: 'always'
		}],
		'space-unary-ops':      ['warn'],
		'switch-colon-spacing': ['warn'],
		'yield-star-spacing':   ['warn', { before: false, after: true }]
	})

} satisfies Linter.FlatConfig);
