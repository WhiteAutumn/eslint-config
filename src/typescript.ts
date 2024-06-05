import type { ESLint, Linter } from 'eslint';

import tseslint from 'typescript-eslint';

import type { Options } from '../config.js';
import { prefixKeys } from './util/prefix-keys.js';

export default (options?: Options) => ({
	files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],

	languageOptions: {
		sourceType: 'module',
		parser:     <Linter.ParserModule> tseslint.parser,

		parserOptions: {
			project: true
		}
	},

	plugins: {
		'@typescript-eslint': <ESLint.Plugin> tseslint.plugin
	},

	rules: {
		'constructor-super':     ['off'],
		'getter-return':         ['off'],
		'no-class-assign':       ['off'],
		'no-const-assign':       ['off'],
		'no-dupe-args':          ['off'],
		'no-dupe-class-members': ['off'],
		'no-dupe-keys':          ['off'],
		'no-func-assign':        ['off'],
		'no-import-assign':      ['off'],
		'no-obj-calls':          ['off'],
		'no-setter-return':      ['off'],
		'no-this-before-super':  ['off'],

		'no-array-constructor':         ['off'],
		'no-loss-of-precision':         ['off'],
		'no-unused-expressions':        ['off'],
		'no-unused-vars':               ['off'],
		'no-useless-constructor':       ['off'],
		'no-throw-literal':             ['off'],
		'prefer-promise-reject-errors': ['off'],

		...prefixKeys('@typescript-eslint', {
			'array-type':                              ['warn', { default: 'array-simple' }],
			'ban-ts-comment':                          ['warn'],
			'ban-types':                               ['warn'],
			'consistent-generic-constructors':         ['warn', 'constructor'],
			'consistent-type-assertions':              ['warn', { assertionStyle: 'angle-bracket', objectLiteralTypeAssertions: 'allow' }],
			'consistent-type-definitions':             ['warn', 'type'],
			'consistent-type-imports':                 ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
			'method-signature-style':                  ['warn', 'property'],
			'no-array-constructor':                    ['warn'],
			'no-array-delete':                         ['error'],
			'no-base-to-string':                       ['warn'],
			'no-confusing-void-expression':            ['warn', { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
			'no-duplicate-enum-values':                ['warn'],
			'no-duplicate-type-constituents':          ['warn'],
			'no-explicit-any':                         ['error'],
			'no-extra-non-null-assertion':             ['warn'],
			'no-floating-promises':                    ['warn'],
			'no-for-in-array':                         ['warn'],
			'no-inferrable-types':                     ['warn'],
			'no-invalid-void-type':                    ['error'],
			'no-loss-of-precision':                    ['warn'],
			'no-meaningless-void-operator':            ['warn'],
			'no-misused-new':                          ['warn'],
			'no-misused-promises':                     ['warn'],
			'no-non-null-asserted-nullish-coalescing': ['warn'],
			'no-redundant-type-constituents':          ['warn'],
			'no-unnecessary-condition':                ['warn'],
			'no-unnecessary-type-arguments':           ['warn'],
			'no-unnecessary-type-assertion':           ['warn'],
			'no-unnecessary-type-constraint':          ['warn'],
			'no-unsafe-unary-minus':                   ['error'],
			'no-unused-expressions':                   ['warn'],
			'no-unused-vars':                          ['off'],
			'no-useless-constructor':                  ['warn'],
			'no-useless-template-literals':            ['warn'],
			'no-var-requires':                         ['warn'],
			'non-nullable-type-assertion-style':       ['warn'],
			'only-throw-error':                        ['warn'],
			'prefer-as-const':                         ['warn'],
			'prefer-find':                             ['warn'],
			'prefer-for-of':                           ['warn'],
			'prefer-function-type':                    ['warn'],
			'prefer-includes':                         ['warn'],
			'prefer-nullish-coalescing':               ['warn'],
			'prefer-optional-chain':                   ['warn'],
			'prefer-promise-reject-errors':            ['warn'],
			'prefer-reduce-type-parameter':            ['warn'],
			'prefer-regexp-exec':                      ['warn'],
			'prefer-return-this-type':                 ['warn'],
			'prefer-string-starts-ends-with':          ['warn'],
			'require-array-sort-compare':              ['error'],
			'strict-boolean-expressions':              ['warn'],
			'switch-exhaustiveness-check':             ['warn'],
			'triple-slash-reference':                  ['warn'],
			'unbound-method':                          ['warn'],
			'use-unknown-in-catch-callback-variable':  ['warn']
		}),

		...options?.jsx !== true ? {} : prefixKeys('@typescript-eslint', {
			'consistent-type-assertions': ['warn', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }]
		}),

		...options?.strict !== true ? {} : prefixKeys('@typescript-eslint', {
			'no-unused-vars': ['warn', { args: 'none' }]
		})
	}

} satisfies Linter.FlatConfig);
