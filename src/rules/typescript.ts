import type { Linter } from 'eslint';
import type { Options } from '#config';
import type { Const } from '#common/const';

import typescriptEslint from 'typescript-eslint';

import { prefixKeys } from '#common/prefix-keys';

/*
	It is the intent of this config to include all rules of the typescript-eslint package,
	both enabled and disabled, and a reason for their inclusion or exclusion from the config.
*/

export default (options: Const<Options>) => ({
	files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],

	languageOptions: {
		sourceType: 'module',
		parser:     typescriptEslint.parser,

		parserOptions: {
			project: true
		}
	},

	plugins: {
		'@typescript-eslint': typescriptEslint.plugin
	},

	rules: {
		// Handled by typescript
		'constructor-super':            ['off'],
		'getter-return':                ['off'],
		'no-class-assign':              ['off'],
		'no-const-assign':              ['off'],
		'no-dupe-args':                 ['off'],
		'no-dupe-class-members':        ['off'],
		'no-dupe-keys':                 ['off'],
		'no-func-assign':               ['off'],
		'no-import-assign':             ['off'],
		'no-new-native-nonconstructor': ['off'],
		'no-obj-calls':                 ['off'],
		'no-setter-return':             ['off'],
		'no-this-before-super':         ['off'],
		'no-unsafe-negation':           ['off'],
		'no-invalid-this':              ['off'],
		'no-redeclare':                 ['off'],

		// Handled by typescript eslint
		'class-methods-use-this':          ['off'],
		'consistent-return':               ['off'],
		'default-param-last':              ['off'],
		'dot-notation':                    ['off'],
		'init-declarations':               ['off'],
		'max-params':                      ['off'],
		'no-array-constructor':            ['off'],
		'no-empty-function':               ['off'],
		'no-implied-eval':                 ['off'],
		'no-magic-numbers':                ['off'],
		'no-shadow':                       ['off'],
		'no-unused-expressions':           ['off'],
		'no-unused-private-class-members': ['off'],
		'no-unused-vars':                  ['off'],
		'no-use-before-define':            ['off'],
		'no-useless-constructor':          ['off'],
		'no-throw-literal':                ['off'],
		'require-await':                   ['off'],
		'prefer-destructuring':            ['off'],
		'prefer-promise-reject-errors':    ['off'],
		'n/no-deprecated-api':             ['off'],

		// Not relevant for built projects such as typescript projects
		'n/no-unpublished-import':             ['off'],
		'n/no-unpublished-require':            ['off'],
		'n/no-unsupported-features/es-syntax': ['off'],

		...prefixKeys('@typescript-eslint/', {

			/*
				CORRECTNESS
				Rules that help catch errors or bad practices
			*/

			// Avoid mistakes or incorrect code
			'no-base-to-string':                       ['warn'],
			'no-confusing-void-expression':            ['warn', { ignoreVoidReturningFunctions: true }],
			'no-duplicate-enum-values':                ['error'],
			'no-empty-object-type':                    ['warn'],
			'no-floating-promises':                    ['warn'],
			'no-for-in-array':                         ['warn'],
			'no-invalid-void-type':                    ['error'],
			'no-misused-new':                          ['warn'],
			'no-misused-promises':                     ['warn', { checksVoidReturn: { arguments: false } }],
			'no-misused-spread':                       ['warn'],
			'no-non-null-asserted-nullish-coalescing': ['warn'],
			'no-non-null-asserted-optional-chain':     ['warn'],
			'no-unsafe-enum-comparison':               ['warn'],
			'no-unsafe-unary-minus':                   ['error'],
			'no-unused-expressions':                   ['warn'],
			'require-array-sort-compare':              ['error'],
			'restrict-plus-operands':                  ['error'],
			'return-await':                            ['warn', 'in-try-catch'],
			'switch-exhaustiveness-check':             ['warn'],
			'unbound-method':                          ['warn'],
			'only-throw-error':                        ['warn'],
			'prefer-promise-reject-errors':            ['warn', { allowThrowingUnknown: true }],
			'strict-boolean-expressions':              ['warn'],

			// Hazardous or has unexpected behavior
			'no-array-constructor':          ['warn'],
			'no-array-delete':               ['warn'],
			'no-implied-eval':               ['warn'],
			'no-mixed-enums':                ['warn'],
			'no-unsafe-declaration-merging': ['warn'],
			'no-unsafe-function-type':       ['warn'],
			'no-wrapper-object-types':       ['warn'],

			// Better to solve issue without ts directives. May disable if I ever encounter a situation not possible to solve without ts directives.
			'ban-ts-comment':                         ['warn'],
			// Angle bracket casts are not supported by node's native type stripping.
			'consistent-type-assertions':             ['warn', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }],
			// Errors implicitly being any is not good.
			'use-unknown-in-catch-callback-variable': ['warn'],

			// Handled by typescript
			'consistent-return':        ['off'],
			'no-dupe-class-members':    ['off'],
			'no-invalid-this':          ['off'],
			'no-redeclare':             ['off'],
			'no-use-before-define':     ['off'],
			'prefer-namespace-keyword': ['off'], // In 6.0

			// Only enforced in strict mode
			'no-empty-function':               ['off'],
			'no-unused-private-class-members': ['off'],
			'no-unused-vars':                  ['off'],
			'prefer-for-of':                   ['off'],

			// Only enforced in ideal mode
			'no-explicit-any': ['off'], // I do not think I am at a point where I can say I'll never use any again.

			// Awaiting non-thenables is harmless and can be useful as a way to yield to queued microtasks.
			'await-thenable':                ['off'],
			// Sometimes this is a sign you are using the wrong data structure, but sometimes it is not. The config must allow this.
			'no-dynamic-delete':             ['off'],
			// Occasionally the correct thing to do is to non-null assert, when we have null checked earlier in a way typescript does not understand.
			'no-non-null-assertion':         ['off'],
			// TypeScript incorrectly narrows variables modified by callbacks, causing false positives.
			'no-unnecessary-condition':      ['off'],
			'no-unsafe-argument':            ['off'],
			'no-unsafe-assignment':          ['off'],
			'no-unsafe-call':                ['off'],
			'no-unsafe-member-access':       ['off'],
			'no-unsafe-return':              ['off'],
			// When writing sufficiently advanced type shenanigans, sometimes you just have to cast.
			'no-unsafe-type-assertion':      ['off'],
			// Handled by another rule.
			'restrict-template-expressions': ['off'],
			// I do not believe shadowing is harmful.
			'no-shadow':                     ['off'],

			...options.strict !== true ? {} : {
				// Avoid mistakes or incorrect code
				'no-empty-function':               ['warn'],
				'no-unused-private-class-members': ['warn'],
				'no-unused-vars':                  ['warn'],
				'prefer-for-of':                   ['warn']
			},

			...options.ideal !== true ? {} : {
				// Any is a dangerous escape hatch that should be avoided
				'no-explicit-any': ['warn']
			},

			/*
				PREFERENCES
				Rules that enforce certain preferences for the style in which code is written
			*/

			// Personal preferences
			'array-type':                             ['warn', { default: 'array-simple' }],
			'consistent-generic-constructors':        ['warn'],
			'consistent-type-exports':                ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
			'consistent-type-imports':                ['warn', { disallowTypeAnnotations: false }],
			'prefer-as-const':                        ['warn'],
			'prefer-function-type':                   ['warn'],
			'prefer-readonly':                        ['warn'],
			'prefer-reduce-type-parameter':           ['warn'],
			'prefer-regexp-exec':                     ['warn'],
			'prefer-return-this-type':                ['warn'],
			'strict-void-return':                     ['off'],
			'triple-slash-reference':                 ['warn'],
			// Skill issue.
			'no-confusing-non-null-assertion':        ['off'],
			// I occasionally find explicitly comparing to boolean literals more readable, especially when the alternative is surrounding it with parenthesis and negating.
			'no-unnecessary-boolean-literal-compare': ['off'],
			// Both records and indexed object types are useful.
			'consistent-indexed-object-style':        ['off'],
			// I strongly prefer type syntax as it is the functionally superior syntax, however interfaces are useful for type merging. Possible candidate for custom rule.
			'consistent-type-definitions':            ['off'],
			// I prefer implicit function return types whenever possible.
			'explicit-function-return-type':          ['off'],
			'explicit-module-boundary-types':         ['off'],
			// I think the public, private, and protected keywords should probably be avoided.
			'explicit-member-accessibility':          ['off'],
			// Property style functions are preferred due to improve strictness, however method style is useful for function overloading. Possible candidate for custom rule.
			'method-signature-style':                 ['off'],
			// Handled by another rule.
			'no-import-type-side-effects':            ['off'],

			// Simplification
			'no-meaningless-void-operator':                 ['warn'],
			'no-unnecessary-parameter-property-assignment': ['warn'],
			'no-unnecessary-template-expression':           ['warn'],
			'no-unnecessary-type-arguments':                ['warn'],
			'no-unnecessary-type-assertion':                ['warn'],
			'no-unnecessary-type-constraint':               ['warn'],
			'no-unnecessary-type-conversion':               ['warn'],
			'no-useless-default-assignment':                ['warn'],
			'prefer-find':                                  ['warn'],
			'prefer-string-starts-ends-with':               ['warn'],
			'prefer-nullish-coalescing':                    ['warn'],
			'prefer-optional-chain':                        ['warn'],
			'no-inferrable-types':                          ['warn'],
			'no-unnecessary-qualifier':                     ['warn'],
			'non-nullable-type-assertion-style':            ['warn'],
			'prefer-includes':                              ['warn'],
			'no-extra-non-null-assertion':                  ['warn'],
			'no-duplicate-type-constituents':               ['warn'],
			// The rule does not reliably account for inferred return types and can remove generics needed to preserve literal types.
			'no-unnecessary-type-parameters':               ['off'],

			// Only enforced in strict mode
			'no-useless-constructor': ['off'],

			// Only enforced in ideal mode
			'no-deprecated':                   ['off'],
			'prefer-readonly-parameter-types': ['off'],

			// No opinion
			'adjacent-overload-signatures':   ['off'],
			'ban-tslint-comment':             ['off'],
			'class-literal-property-style':   ['off'],
			'class-methods-use-this':         ['off'],
			'default-param-last':             ['off'],
			'dot-notation':                   ['off'],
			'init-declarations':              ['off'],
			'max-params':                     ['off'],
			'member-ordering':                ['off'],
			'naming-convention':              ['off'],
			'no-extraneous-class':            ['off'],
			'no-magic-numbers':               ['off'],
			'no-namespace':                   ['off'],
			'no-redundant-type-constituents': ['off'],
			'no-require-imports':             ['off'],
			'no-restricted-types':            ['off'],
			'no-this-alias':                  ['off'],
			'no-useless-empty-export':        ['off'],
			'parameter-properties':           ['off'],
			'prefer-destructuring':           ['off'],
			'prefer-enum-initializers':       ['off'],
			'prefer-literal-enum-member':     ['off'],
			'promise-function-async':         ['off'],
			'related-getter-setter-pairs':    ['off'],
			'require-await':                  ['off'],
			'unified-signatures':             ['off'],

			...options.strict !== true ? {} : {
				// Simplification
				'no-useless-constructor': ['warn']
			},

			...options.ideal !== true ? {} : {
				// Personal preference
				'prefer-readonly-parameter-types': ['warn', {
					ignoreInferredTypes: true,

					allow: [{ from: 'file', name: 'Shared' }]
				}],

				// Help move away from deprecated apis
				'no-deprecated': ['warn']
			}
		})
	}

} satisfies Linter.Config);
