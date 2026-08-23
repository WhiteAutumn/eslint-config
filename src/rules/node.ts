import type { Linter } from 'eslint';
import type { Const } from '#common/const';
import type { Options } from '#config';

import node from 'eslint-plugin-n';

import { prefixKeys } from '#common/prefix-keys';

export type NodeOptions = {
	version?: string;
};

export default (options: Const<Options>) => ({

	plugins: {
		n: node
	},

	rules: prefixKeys('n/', {
		// Avoid mistakes or incorrect code
		'callback-return':             ['warn'],
		'exports-style':               ['warn'],
		'handle-callback-err':         ['warn'],
		'hashbang':                    ['warn'],
		'no-callback-literal':         ['warn'],
		'no-exports-assign':           ['error'],
		'no-new-require':              ['warn'],
		'no-unpublished-import':       ['warn'],
		'no-unpublished-require':      ['warn'],
		'prefer-import/assert-strict': ['warn'],

		// Personal preference
		'prefer-global/buffer':            ['warn'],
		'prefer-global/console':           ['warn'],
		'prefer-global/crypto':            ['warn'],
		'prefer-global/process':           ['warn'],
		'prefer-global/text-decoder':      ['warn'],
		'prefer-global/text-encoder':      ['warn'],
		'prefer-global/timers':            ['warn'],
		'prefer-global/url':               ['warn'],
		'prefer-global/url-search-params': ['warn'],
		'prefer-node-protocol':            ['warn'],
		'prefer-promises/dns':             ['warn'],
		'prefer-promises/fs':              ['warn'],

		// Eslint behavior change
		'process-exit-as-throw': ['warn'],

		// Only enforced when a node version is provided
		'no-unsupported-features/es-builtins':   ['off'],
		'no-unsupported-features/es-syntax':     ['off'],
		'no-unsupported-features/node-builtins': ['off'],

		// Only enforced in ideal mode
		'no-deprecated-api': ['off'],
		'no-sync':           ['off'],

		// Handled by imports plugin
		'no-extraneous-import':  ['off'],
		'no-extraneous-require': ['off'],
		'no-missing-require':    ['off'],
		// Handled by imports plugin and typescript
		'no-missing-import':     ['off'],

		// No opinion
		'file-extension-in-import':          ['off'],
		'global-require':                    ['off'],
		'no-mixed-requires':                 ['off'],
		'no-path-concat':                    ['off'],
		'no-process-env':                    ['off'],
		'no-process-exit':                   ['off'],
		'no-restricted-import':              ['off'],
		'no-restricted-require':             ['off'],
		'no-top-level-await':                ['off'],
		'no-unpublished-bin':                ['off'],
		'prefer-process-get-builtin-module': ['off'],

		...options.node?.version == null ? {} : {
			// Avoid runtime features unsupported by the project's node versions
			'no-unsupported-features/es-builtins':   ['warn', { version: options.node.version }],
			'no-unsupported-features/es-syntax':     ['warn', { version: options.node.version }],
			'no-unsupported-features/node-builtins': ['warn', { version: options.node.version }]
		},

		...options.ideal !== true ? {} : {
			// Personal preference
			'no-sync': ['warn'],

			// Help move away from deprecated APIs
			'no-deprecated-api': ['warn']
		}
	})

}) satisfies Linter.Config;
