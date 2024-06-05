import type { Linter } from 'eslint';

import standard from './src/standard.js';
import standardStylistic from './src/standard-stylistic.js';
import importOrder from './src/import-order.js';

import typescript from './src/typescript.js';
import typescriptStylistic from './src/typescript-stylistic.js';
import typescriptStylisticPlus from './src/typescript-stylistic-plus.js';

import jsxStylistic from './src/jsx-stylistic.js';

export type Options = {
	strict?:     boolean;
	typescript?: boolean;
	jsx?:        boolean;
};

export default (options?: Options) => {
	const config: Linter.FlatConfig[] = [
		standard(),
		standardStylistic(),
		importOrder()
	];

	if (options?.typescript ?? false) {
		config.push(
			typescript(options),
			typescriptStylistic(),
			typescriptStylisticPlus()
		);
	}

	if (options?.jsx ?? false) {
		config.push(
			jsxStylistic()
		);
	}

	return config;
};
