import type { Linter } from 'eslint';
import type { Options } from '../config.js';

export default (options?: Options) => ({

	rules: {
		'array-callback-return':           ['error', { checkForEach: true }],
		'constructor-super':               ['error'],
		'for-direction':                   ['warn'],
		'getter-return':                   ['error'],
		'no-class-assign':                 ['error'],
		'no-compare-neg-zero':             ['warn'],
		'no-cond-assign':                  ['warn'],
		'no-const-assign':                 ['error'],
		'no-constant-binary-expression':   ['warn'],
		'no-constant-condition':           ['warn', { checkLoops: false }],
		'no-debugger':                     ['warn'],
		'no-dupe-args':                    ['error'],
		'no-dupe-class-members':           ['error'],
		'no-dupe-else-if':                 ['warn'],
		'no-dupe-keys':                    ['error'],
		'no-duplicate-case':               ['warn'],
		'no-empty-character-class':        ['warn'],
		'no-empty-pattern':                ['warn'],
		'no-fallthrough':                  ['warn'],
		'no-func-assign':                  ['error'],
		'no-import-assign':                ['error'],
		'no-invalid-regexp':               ['error'],
		'no-loss-of-precision':            ['warn'],
		'no-misleading-character-class':   ['warn'],
		'no-new-native-nonconstructor':    ['error'],
		'no-obj-calls':                    ['error'],
		'no-prototype-builtins':           ['error'],
		'no-self-assign':                  ['warn'],
		'no-self-compare':                 ['warn'],
		'no-setter-return':                ['error'],
		'no-this-before-super':            ['error'],
		'no-unexpected-multiline':         ['error'],
		'no-unreachable':                  ['warn'],
		'no-unreachable-loop':             ['warn'],
		'no-unsafe-negation':              ['error'],
		'no-unsafe-optional-chaining':     ['error'],
		'no-unused-private-class-members': ['off'],
		'no-unused-vars':                  ['off'],
		'no-useless-backreference':        ['warn'],
		'use-isnan':                       ['error'],
		'valid-typeof':                    ['error'],

		'arrow-body-style':               ['warn'],
		'curly':                          ['warn'],
		'grouped-accessor-pairs':         ['warn'],
		'no-array-constructor':           ['warn'],
		'no-caller':                      ['error'],
		'no-case-declarations':           ['error'],
		'no-delete-var':                  ['error'],
		'no-else-return':                 ['warn'],
		'no-empty':                       ['warn'],
		'no-empty-static-block':          ['warn'],
		'no-extend-native':               ['error'],
		'no-extra-bind':                  ['warn'],
		'no-extra-label':                 ['warn'],
		'no-global-assign':               ['error'],
		'no-implicit-coercion':           ['warn'],
		'no-new-wrappers':                ['error'],
		'no-nonoctal-decimal-escape':     ['error'],
		'no-return-assign':               ['warn'],
		'no-sequences':                   ['warn'],
		'no-throw-literal':               ['warn'],
		'no-undef-init':                  ['warn'],
		'no-unused-expressions':          ['warn'],
		'no-unused-labels':               ['warn'],
		'no-useless-call':                ['warn'],
		'no-useless-catch':               ['warn'],
		'no-useless-constructor':         ['warn'],
		'no-useless-escape':              ['warn'],
		'no-useless-rename':              ['warn'],
		'no-useless-return':              ['warn'],
		'no-var':                         ['warn'],
		'no-with':                        ['error'],
		'object-shorthand':               ['warn', 'consistent-as-needed'],
		'prefer-arrow-callback':          ['warn'],
		'prefer-const':                   ['warn'],
		'prefer-exponentiation-operator': ['warn'],
		'prefer-named-capture-group':     ['warn'],
		'prefer-promise-reject-errors':   ['warn'],
		'prefer-rest-params':             ['error'],
		'prefer-template':                ['warn'],
		'require-yield':                  ['warn'],
		'yoda':                           ['warn'],

		...options?.strict !== true ? {} : {
			'no-unused-private-class-members': ['warn'],
			'no-unused-vars':                  ['warn', { args: 'none' }]
		}
	}

} satisfies Linter.FlatConfig);
