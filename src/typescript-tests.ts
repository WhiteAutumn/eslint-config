import type { Linter } from 'eslint';

export default () => ({
	files: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.mts', '**/*.test.cts'],
	rules: {
		'@typescript-eslint/no-unused-expressions': 'off'
	}
} satisfies Linter.FlatConfig);
