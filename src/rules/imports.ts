import type { Linter } from 'eslint';
import type { Options } from '#config';
import type { Const } from '#common/const';

import imports from 'eslint-plugin-import-x';

import { block } from '#common/block';
import { prefixKeys } from '#common/prefix-keys';

/*
	It is the intent of this config to include all rules of the eslint-plugin-import-x package,
	both enabled and disabled, and a reason for their inclusion or exclusion from the config.
*/

export type PathGroup = {
	pattern:  string;
	group:    'builtin' | 'external' | 'internal' | 'parent' | 'sibling' | 'index' | 'object' | 'type';
	position: 'after' | 'before';
};

export type ImportOptions = {
	internal?:   string[];
	pathGroups?: PathGroup[];
};

export default (options: Const<Options>) => ({

	plugins: {
		'import-x': imports
	},

	rules: prefixKeys('import-x/', {
		// Avoid mistakes or incorrect code
		'export':              ['error'],
		'no-mutable-exports':  ['warn'],
		'no-named-as-default': ['warn'],
		'default':             ['error'],
		'named':               ['error'],
		'namespace':           ['error'],
		'no-unresolved':       ['error', { commonjs: true }],

		// Personal preference
		'no-useless-path-segments':        ['warn'],
		'consistent-type-specifier-style': ['warn', 'prefer-top-level'],
		'first':                           ['warn'],
		'newline-after-import':            ['warn'],
		'no-named-default':                ['warn'],

		'order': ['warn', block(() => {
			const internal = options.imports?.internal ?? [];
			const pathGroups = [...(options.imports?.pathGroups ?? [])];

			if (internal.length > 0) {
				const internalPackages = internal.length === 1 ? internal[0] : `{${internal.join(',')}}`;

				pathGroups.push({
					pattern:  `${internalPackages}{,/**}`,
					group:    'external' as const,
					position: 'after' as const
				});
			}

			return {
				'groups':                 ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'newlines-between':       'always-and-inside-groups',
				'consolidateIslands':     'inside-groups',
				'newlines-between-types': 'never',
				'sortTypesGroup':         true,

				...(pathGroups.length === 0 ? {} : {
					pathGroups:                    pathGroups,
					pathGroupsExcludedImportTypes: []
				})
			};
		})],

		// Only enforced in strict mode
		'no-empty-named-blocks':      ['off'],
		'no-extraneous-dependencies': ['off'],
		'no-absolute-path':           ['off'],

		// Only enforced in ideal mode
		'no-deprecated':        ['off'],
		'no-relative-packages': ['off'],
		'no-self-import':       ['off'],

		// Its autofix for type imports can produce invalid imports.
		'no-duplicates': ['off'],

		// Barrel files can be intentional public entry points.
		'avoid-barrel-files':           ['off'],
		'avoid-importing-barrel-files': ['off'],

		// No opinion
		'no-named-as-default-member':  ['off'],
		'no-rename-default':           ['off'],
		'no-unused-modules':           ['off'],
		'no-amd':                      ['off'],
		'no-commonjs':                 ['off'],
		'no-import-module-exports':    ['off'],
		'no-nodejs-modules':           ['off'],
		'unambiguous':                 ['off'],
		'no-cycle':                    ['off'],
		'no-dynamic-require':          ['off'],
		'no-internal-modules':         ['off'],
		'no-relative-parent-imports':  ['off'],
		'no-restricted-paths':         ['off'],
		'no-webpack-loader-syntax':    ['off'],
		'dynamic-import-chunkname':    ['off'],
		'exports-last':                ['off'],
		'extensions':                  ['off'],
		'group-exports':               ['off'],
		'max-dependencies':            ['off'],
		'no-anonymous-default-export': ['off'],
		'no-default-export':           ['off'],
		'no-named-export':             ['off'],
		'no-namespace':                ['off'],
		'avoid-namespace-import':      ['off'],
		'avoid-re-export-all':         ['off'],
		'no-unassigned-import':        ['off'],
		'prefer-default-export':       ['off'],
		'prefer-namespace-import':     ['off'],

		...options.typescript !== true ? {} : {
			// Handled by typescript
			'export':        ['off'],
			'default':       ['off'],
			'named':         ['off'],
			'namespace':     ['off'],
			'no-unresolved': ['off'],
		},

		...options.strict !== true ? {} : {
			// Personal preference
			'no-empty-named-blocks': ['warn'],

			// Avoid accidentally depending on transient dependencies
			'no-extraneous-dependencies': ['warn'],
			// Avoid accidentally committing test code
			'no-absolute-path':           ['warn']
		},

		...options.ideal !== true ? {} : {
			// Personal preference
			'no-relative-packages': ['warn'],

			// Avoid mistakes or incorrect code
			'no-self-import': ['warn'],

			// Help move way from deprecated apis
			'no-deprecated': ['warn'],

			...options.typescript !== true ? {} : {
				// Handled by typescript eslint
				'no-deprecated': ['off'],
			}
		}
	})

}) satisfies Linter.Config;
