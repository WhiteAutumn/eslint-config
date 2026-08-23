import type { Linter } from 'eslint';
import type { Options } from '#config';
import type { Const } from '#common/const';

/*
	It is the intent of this config to include all rules built-in to eslint,
	both enabled and disabled, and a reason for their inclusion or exclusion from the config.
*/

export default (options: Const<Options>) => ({
	rules: {
		/*
			CORRECTNESS
			Rules that help catch errors or bad practices
		*/

		// Avoid mistakes or incorrect code
		'array-callback-return':         ['error', { checkForEach: true }],
		'constructor-super':             ['error'],
		'for-direction':                 ['error'],
		'getter-return':                 ['error'],
		'no-class-assign':               ['error'],
		'no-compare-neg-zero':           ['warn'],
		'no-cond-assign':                ['warn'],
		'no-const-assign':               ['error'],
		'no-constant-binary-expression': ['warn'],
		'no-constant-condition':         ['warn', { checkLoops: false }],
		'no-dupe-args':                  ['error'],
		'no-dupe-class-members':         ['error'],
		'no-dupe-else-if':               ['warn'],
		'no-dupe-keys':                  ['error'],
		'no-duplicate-case':             ['warn'],
		'no-empty-character-class':      ['warn'],
		'no-empty-pattern':              ['warn'],
		'no-fallthrough':                ['warn'],
		'no-func-assign':                ['error'],
		'no-import-assign':              ['error'],
		'no-invalid-regexp':             ['error'],
		'no-irregular-whitespace':       ['warn'],
		'no-loss-of-precision':          ['error'],
		'no-misleading-character-class': ['warn'],
		'no-new-native-nonconstructor':  ['error'],
		'no-obj-calls':                  ['error'],
		'no-promise-executor-return':    ['warn', { allowVoid: true }],
		'no-self-assign':                ['warn'],
		'no-self-compare':               ['warn'],
		'no-setter-return':              ['error'],
		'no-this-before-super':          ['error'],
		'no-unassigned-vars':            ['warn'],
		'no-unexpected-multiline':       ['error'],
		'no-unreachable-loop':           ['warn'],
		'no-unsafe-negation':            ['warn'],
		'no-unsafe-optional-chaining':   ['error'],
		'use-isnan':                     ['error'],
		'valid-typeof':                  ['error'],
		'eqeqeq':                        ['warn', 'always', { null: 'ignore' }],
		'no-delete-var':                 ['error'],
		'no-global-assign':              ['error'],
		'no-invalid-this':               ['error'],
		'no-label-var':                  ['error'],
		'no-case-declarations':          ['warn'],
		'no-regex-spaces':               ['warn'],
		'no-return-assign':              ['warn'],
		'no-unused-expressions':         ['warn'],
		'require-unicode-regexp':        ['warn'],
		'no-throw-literal':              ['warn'],
		'prefer-promise-reject-errors':  ['warn'],

		// Hazardous or has unexpected behavior
		'no-prototype-builtins':      ['warn'],
		'no-sparse-arrays':           ['warn'],
		'no-array-constructor':       ['warn'],
		'no-eval':                    ['warn'],
		'no-extend-native':           ['error'],
		'no-implied-eval':            ['warn'],
		'no-new-func':                ['warn'],
		'no-new-wrappers':            ['warn'],
		'no-script-url':              ['warn'],
		'no-shadow-restricted-names': ['error'],
		'no-var':                     ['warn'],
		'no-with':                    ['error'],
		'no-sequences':               ['warn', { allowInParentheses: true }],

		// Deprecated features
		'no-octal-escape':            ['warn'],
		'no-proto':                   ['warn'],
		'no-caller':                  ['error'],
		'no-iterator':                ['error'],
		'no-nonoctal-decimal-escape': ['error'],
		'no-octal':                   ['warn'],

		// Only enforced in strict mode
		'no-debugger':                     ['off'],
		'no-unreachable':                  ['off'],
		'no-unused-private-class-members': ['off'],
		'no-unused-vars':                  ['off'],
		'no-empty':                        ['off'],
		'no-empty-function':               ['off'],
		'no-empty-static-block':           ['off'],
		'no-unused-labels':                ['off'],
		'require-yield':                   ['off'],

		// Not needed
		'no-inner-declarations': ['off'],
		'no-redeclare':          ['off'],

		/*
			It is my belief that there are a few legitimate cases where async promise executors are the more ergonomic solution.

			Consider the case where we fire off requests on an interval and want to resolve a single promise when the first request succeeds.
			Because the list of in-flight requests is ever changing, using Promise.race becomes unwieldy, and other alternatives are not much better.
			An async executor lets us express the intent clearly: loop using native await syntax for timing, and allow
			any attempt to resolve the outer promise via the captured resolve function.

			It is the philosophy of this eslint config to never get in the way of the more elegant solution,
			and so, if there is any valid use of async promise executor this config must allow it.
		*/
		'no-async-promise-executor':    ['off'],
		// Many tasks must be done sequential and for those tasks this rule gets in the way.
		'no-await-in-loop':             ['off'],
		// Occasionally we want to return something that is not the class instance while still keeping the class construction syntax.
		// For example, we may want to be able construct a class using the new keyword but return a proxy wrapped instance.
		'no-constructor-return':        ['off'],
		// Sometimes we intentionally want to match ASCII control characters in regexes.
		'no-control-regex':             ['off'],
		// There may be times where you want to represent the interpolation syntax within a string. Syntax highlighting should be sufficient to catch strings that should be template literals.
		'no-template-curly-in-string':  ['off'],
		// Although I can not think of a time where you would want to do this, I do not see the behavior as undesirable enough to warrant being disallowed.
		'no-unsafe-finally':            ['off'],
		// The times I have used for-in I've never had issues with iterating over unexpected keys.
		'guard-for-in':                 ['off'],
		// Use a capable LPS.
		'no-div-regex':                 ['off'],
		// The vast majority of newly written code is using strict mode where this is not a concern.
		'no-implicit-globals':          ['off'],
		// Redundant for typescript files, and for plain javascript it only works if a list of globals is declared and maintained. Too limited to be useful.
		'no-undef':                     ['off'],
		// There are times when using lables makes sense. This config must not disallow them.
		'no-labels':                    ['off'],
		// Not necessarily a mistake. Can see seen quite a lot in CDK code. The config must allow this.
		'no-new':                       ['off'],
		// I do not believe shadowing is harmful.
		'no-shadow':                    ['off'],
		'no-param-reassign':            ['off'],
		'no-ex-assign':                 ['off'],
		// Handled by the no-shadow-restricted-names rule.
		'no-undefined':                 ['off'],
		// The rule cannot distinguish callbacks discarded within an iteration from callbacks retained across iterations.
		'no-loop-func':                 ['off'],
		// A loop condition may intentionally be modified by asynchronous work outside the loop body.
		'no-unmodified-loop-condition': ['off'],
		// The rule cannot distinguish safe deferred references from genuinely unsafe use before initialization.
		'no-use-before-define':         ['off'],
		// The rule cannot distinguish intentional asynchronous state management from assignments that actually depend on stale values.
		'require-atomic-updates':       ['off'],

		...options.strict !== true ? {} : {
			// Avoid mistakes or incorrect code
			'no-unreachable':                  ['warn'],
			'no-unused-private-class-members': ['warn'],
			'no-unused-vars':                  ['warn', { args: 'none' }],
			'no-empty':                        ['warn'],
			'no-empty-function':               ['warn'],
			'no-empty-static-block':           ['warn'],
			'no-unused-labels':                ['warn'],
			'require-yield':                   ['warn'],

			// Committed code should not contain debugger statements.
			'no-debugger': ['warn']
		},


		/*
			PREFERENCES
			Rules that enforce certain preferences for the style in which code is written
		*/

		// Personal preferences
		'curly':                          ['warn'],
		'func-name-matching':             ['warn'],
		'grouped-accessor-pairs':         ['warn'],
		'no-else-return':                 ['warn'],
		'no-implicit-coercion':           ['warn'],
		'no-duplicate-imports':           ['warn', { allowSeparateTypeImports: true }],
		'default-case-last':              ['warn'],
		'no-undef-init':                  ['warn'],
		'no-underscore-dangle':           ['warn'],
		'object-shorthand':               ['warn', 'consistent-as-needed'],
		'one-var':                        ['warn', 'never'],
		'prefer-arrow-callback':          ['warn'],
		'prefer-exponentiation-operator': ['warn'],
		'prefer-named-capture-group':     ['warn'],
		'prefer-rest-params':             ['warn'],
		'yoda':                           ['warn'],
		// Sometimes I want do not want my temporary variables to pollute the function at large, and then a lone block is useful.
		'no-lone-blocks':                 ['off'],
		// Continue statements in loops are good, actually.
		'no-continue':                    ['off'],
		// Performing null checks with != null is the superior way to do it.
		'no-eq-null':                     ['off'],

		// Simplification
		'no-extra-bind':                ['warn'],
		'no-extra-boolean-cast':        ['warn'],
		'no-useless-assignment':        ['warn'],
		'no-useless-backreference':     ['warn'],
		'no-useless-call':              ['warn'],
		'no-useless-catch':             ['warn'],
		'no-useless-computed-key':      ['warn'],
		'no-useless-concat':            ['warn'],
		'no-useless-rename':            ['warn'],
		'no-useless-return':            ['warn'],
		'no-object-constructor':        ['warn'],
		'no-unneeded-ternary':          ['warn'],
		'logical-assignment-operators': ['warn'],
		'prefer-numeric-literals':      ['warn'],
		'prefer-spread':                ['warn'],
		'prefer-object-has-own':        ['warn'],
		'no-useless-escape':            ['warn'],
		'prefer-regex-literals':        ['warn'],

		// Improves experience when attempting to find the cause of errors.
		'preserve-caught-error': ['warn'],

		// Void can be useful to express intent. Some eslint rules allow opt-out by using void.
		'no-void':         ['off'],
		// I would like to encourage use of template literals but there are instances where not using them looks better. Possible candidate for a custom rule?
		'prefer-template': ['off'],
		// Handled by another rule.
		'sort-imports':    ['off'],

		// Only enforced in strict mode
		'arrow-body-style':       ['off'],
		'no-useless-constructor': ['off'],
		'prefer-const':           ['off'],

		// No opinion
		'accessor-pairs':           ['off'],
		'camelcase':                ['off'],
		'capitalized-comments':     ['off'],
		'class-methods-use-this':   ['off'],
		'complexity':               ['off'],
		'consistent-return':        ['off'],
		'consistent-this':          ['off'],
		'default-case':             ['off'],
		'default-param-last':       ['off'],
		'dot-notation':             ['off'],
		'func-names':               ['off'],
		'func-style':               ['off'],
		'id-denylist':              ['off'],
		'id-length':                ['off'],
		'id-match':                 ['off'],
		'init-declarations':        ['off'],
		'max-classes-per-file':     ['off'],
		'max-depth':                ['off'],
		'max-lines':                ['off'],
		'max-lines-per-function':   ['off'],
		'max-nested-callbacks':     ['off'],
		'max-params':               ['off'],
		'max-statements':           ['off'],
		'new-cap':                  ['off'],
		'no-extra-label':           ['off'],
		'no-inline-comments':       ['off'],
		'no-lonely-if':             ['off'],
		'no-magic-numbers':         ['off'],
		'no-multi-assign':          ['off'],
		'no-multi-str':             ['off'],
		'no-negated-condition':     ['off'],
		'no-nested-ternary':        ['off'],
		'no-plusplus':              ['off'],
		'no-restricted-exports':    ['off'],
		'no-restricted-globals':    ['off'],
		'no-restricted-imports':    ['off'],
		'no-restricted-properties': ['off'],
		'no-restricted-syntax':     ['off'],
		'no-ternary':               ['off'],
		'no-warning-comments':      ['off'],
		'operator-assignment':      ['off'],
		'prefer-destructuring':     ['off'],
		'prefer-object-spread':     ['off'],
		'radix':                    ['off'],
		'require-await':            ['off'],
		'sort-keys':                ['off'],
		'sort-vars':                ['off'],
		'strict':                   ['off'],
		'symbol-description':       ['off'],
		'vars-on-top':              ['off'],
		'unicode-bom':              ['off'],
		'no-console':               ['off'],
		'no-bitwise':               ['off'],
		'no-alert':                 ['off'],

		// Not needed
		'block-scoped-var': ['off'],

		...options.strict !== true ? {} : {
			// Personal style preference
			'prefer-const': ['warn'],

			// Simplification
			'arrow-body-style':       ['warn'],
			'no-useless-constructor': ['warn']
		}
	}
}) satisfies Linter.Config;
