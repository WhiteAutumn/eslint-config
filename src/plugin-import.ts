import type { Linter } from 'eslint';
import type { Options } from '../config.js';

import importOrder from 'eslint-plugin-import';

import { prefixKeys } from './util/prefix-keys.js';

export type PathGroup = {
	pattern:  string;
	group:    'builtin' | 'external' | 'internal' | 'parent' | 'sibling' | 'index' | 'object' | 'type';
	position: 'after' | 'before';
};

export default (options?: Options) => ({

	plugins: {
		import: importOrder
	},

	rules: {
		...prefixKeys('import', {
			'no-mutable-exports': ['error'],
			'order':              ['warn', {
				'newlines-between': 'always',
				'groups':           [
					'type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'
				],

				...(options?.importOrder?.pathGroups != null && options.importOrder.pathGroups.length > 0 ? {
					pathGroupsExcludedImportTypes: ['type'],
					pathGroups:                    options.importOrder.pathGroups
				} : {})
			}]
		}),

		...(options?.strict !== true ? {} : prefixKeys('import', {
			'no-extraneous-dependencies': ['warn']
		}))
	}

} satisfies Linter.FlatConfig);
