import type { Linter } from 'eslint';
import type { Options } from '#config';
import type { Const } from '#common/const';

import stylistic from '@stylistic/eslint-plugin';

import { prefixKeys } from '#common/prefix-keys';

/*
	It is the intent of this config to include all rules of the @stylistic/eslint-plugin package,
	both enabled and disabled, and a reason for their inclusion or exclusion from the config.
*/

export default (options: Const<Options>) => ({
	plugins: {
		'@stylistic': stylistic
	},

	rules: prefixKeys('@stylistic/', {
		// Personal preference
		'array-bracket-newline':          ['warn', 'consistent'],
		'array-bracket-spacing':          ['warn', 'never'],
		'arrow-parens':                   ['warn', 'as-needed'],
		'arrow-spacing':                  ['warn', { before: true, after: true }],
		'block-spacing':                  ['warn', 'always'],
		'brace-style':                    ['warn', 'stroustrup'],
		'comma-spacing':                  ['warn'],
		'comma-style':                    ['warn'],
		'computed-property-spacing':      ['warn'],
		'curly-newline':                  ['warn', { consistent: true }],
		'dot-location':                   ['warn', 'property'],
		'eol-last':                       ['warn'],
		'function-call-argument-newline': ['warn', 'consistent'],
		'function-call-spacing':          ['warn'],
		'function-paren-newline':         ['warn', 'consistent'],
		'generator-star-spacing':         ['warn', { before: false, after: true, method: { before: true, after: false } }],
		'implicit-arrow-linebreak':       ['warn'],
		'indent':                         ['warn', 'tab', { SwitchCase: 1, flatTernaryExpressions: true }],
		'indent-binary-ops':              ['warn', 'tab'],
		'keyword-spacing':                ['warn'],
		'linebreak-style':                ['warn'],
		'lines-between-class-members':    ['warn', 'always', { exceptAfterSingleLine: true }],
		'new-parens':                     ['warn'],
		'no-extra-semi':                  ['warn'],
		'no-multi-spaces':                ['warn', { exceptions: { Property: true, TSTypeAnnotation: true } }],
		'no-whitespace-before-property':  ['warn'],
		'object-curly-newline':           ['warn'],
		'object-curly-spacing':           ['warn', 'always'],
		'padded-blocks':                  ['warn', 'never', { allowSingleLineBlocks: true }],
		'quote-props':                    ['warn', 'consistent-as-needed'],
		'quotes':                         ['warn', 'single', { avoidEscape: true }],
		'rest-spread-spacing':            ['warn'],
		'semi':                           ['warn'],
		'semi-spacing':                   ['warn'],
		'semi-style':                     ['warn', 'last'],
		'space-before-blocks':            ['warn'],
		'space-unary-ops':                ['warn'],
		'switch-colon-spacing':           ['warn'],
		'template-curly-spacing':         ['warn'],
		'template-tag-spacing':           ['warn'],
		'type-annotation-spacing':        ['warn'],
		'type-generic-spacing':           ['warn'],
		'type-named-tuple-spacing':       ['warn'],
		'wrap-iife':                      ['warn'],
		'yield-star-spacing':             ['warn', { before: false, after: true }],

		'member-delimiter-style': ['warn', {
			multiline:  { delimiter: 'semi', requireLast: true },
			singleline: { delimiter: 'comma', requireLast: false }
		}],
		'key-spacing': ['warn', {
			singleLine: { beforeColon: false, afterColon: true, mode: 'strict' },
			multiLine:  { beforeColon: false, afterColon: true, mode: 'strict', align: 'value' }
		}],
		'space-before-function-paren': ['warn', {
			anonymous:  'never',
			named:      'never',
			asyncArrow: 'always'
		}],

		// I understand the arguments for dangling commas, but for short lists of elements I think they look a bit ugly. I have decided to allow them but not require them.
		'comma-dangle':       ['warn', 'only-multiline'],
		// Once this rules gets moved out of being experimental it should likely replaced related individual rules
		'exp-list-style':     ['off'],
		// Skill issue
		'no-confusing-arrow': ['off'],
		// Parentheses may intentionally improve clarity or delimit a multi-line expression.
		'no-extra-parens':    ['off'],

		// Only enforced in strict mode
		'no-trailing-spaces': ['off'],

		// Not needed
		'no-mixed-spaces-and-tabs':         ['off'],
		'nonblock-statement-body-position': ['off'],
		'one-var-declaration-per-line':     ['off'],

		// No opinion
		'array-element-newline':           ['off'],
		'line-comment-position':           ['off'],
		'lines-around-comment':            ['off'],
		'max-len':                         ['off'],
		'max-statements-per-line':         ['off'],
		'multiline-comment-style':         ['off'],
		'multiline-ternary':               ['off'],
		'newline-per-chained-call':        ['off'],
		'no-mixed-operators':              ['off'],
		'no-floating-decimal':             ['off'],
		'no-multiple-empty-lines':         ['off'],
		'no-tabs':                         ['off'],
		'object-property-newline':         ['off'],
		'operator-linebreak':              ['off'],
		'padding-line-between-statements': ['off'],
		'space-in-parens':                 ['off'],
		'space-infix-ops':                 ['off'],
		'spaced-comment':                  ['off'],
		'wrap-regex':                      ['warn'],

		...options.jsx !== true ? {} : {
			// Personal preference
			'jsx-child-element-spacing':    ['warn'],
			'jsx-closing-bracket-location': ['warn'],
			'jsx-closing-tag-location':     ['warn'],
			'jsx-curly-brace-presence':     ['warn', { props: 'never', children: 'never', propElementValues: 'never' }],
			'jsx-curly-newline':            ['warn'],
			'jsx-curly-spacing':            ['warn'],
			'jsx-equals-spacing':           ['warn'],
			'jsx-first-prop-new-line':      ['warn', 'multiline'],
			'jsx-function-call-newline':    ['warn'],
			'jsx-indent-props':             ['warn', 'tab'],
			'jsx-pascal-case':              ['warn', { allowNamespace: true }],
			'jsx-quotes':                   ['warn', 'prefer-single'],
			'jsx-tag-spacing':              ['warn', { beforeSelfClosing: 'never' }],

			// No opinion
			'jsx-max-props-per-line':      ['off'],
			'jsx-newline':                 ['off'],
			'jsx-one-expression-per-line': ['off'],
			'exp-jsx-props-style':         ['off'],
			'jsx-wrap-multilines':         ['off'],

			// Only enforced in strict mode
			'jsx-self-closing-comp': ['off'],

			...options.strict !== true ? {} : {
				// Personal preference
				'jsx-self-closing-comp': ['warn']
			}
		},

		...options.strict !== true ? {} : {
			// Personal preference
			'no-trailing-spaces': ['warn']
		}
	})
} satisfies Linter.Config);
