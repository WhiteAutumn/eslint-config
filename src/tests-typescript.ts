import type { Linter } from 'eslint';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({
	files: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.mts', '**/*.test.cts'],
	rules: prefixKeys('@typescript-eslint', {
		'no-unused-expressions': 'off'
	})
} satisfies Linter.Config);
