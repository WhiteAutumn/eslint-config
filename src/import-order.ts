import type { Linter } from 'eslint';

import importOrder from 'eslint-plugin-import';
import { prefixKeys } from './util/prefix-keys.js';


export default () => ({

	plugins: {
		import: importOrder
	},

	rules: prefixKeys('import', {
		'no-extraneous-dependencies': ['warn'],
		'no-mutable-exports':         ['error'],
		'order':                      ['warn', {
			groups: [
				'builtin', 'external', 'internal', 'parent', 'sibling', 'index'
			]
		}]
	})

} satisfies Linter.FlatConfig);
