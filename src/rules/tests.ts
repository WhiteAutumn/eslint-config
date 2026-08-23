import type { Linter } from 'eslint';
import type { Options } from '#config';
import type { Const } from '#common/const';

import noOnlyTests from 'eslint-plugin-no-only-tests';

import { prefixKeys } from '#common/prefix-keys';

export default (options: Const<Options>) => ({
	files: [
		'**/*.test.js', '**/*.test.jsx', '**/*.test.mjs', '**/*.test.cjs',
		...options.typescript !== true ? [] : [
			'**/*.test.ts', '**/*.test.tsx', '**/*.test.mts', '**/*.test.cts'
		]
	],

	plugins: {
		'no-only-tests': noOnlyTests
	},

	rules: {
		'no-unused-expressions': ['off'],

		...options.typescript !== true ? {} : {
			'@typescript-eslint/no-unused-expressions': ['off'],
		},

		...options.strict !== true ? {} : prefixKeys('no-only-tests/', {
			'no-only-tests': ['warn']
		})
	}
} satisfies Linter.Config);
