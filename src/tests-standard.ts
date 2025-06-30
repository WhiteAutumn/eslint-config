import type { Linter } from 'eslint';

export default () => ({
	files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.mjs', '**/*.test.cjs'],
	rules: {
		'no-unused-expressions': 'off'
	}
} satisfies Linter.FlatConfig);
