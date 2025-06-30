import type { Linter } from 'eslint';
import type { PathGroup } from './src/plugin-import.js';

import standard from './src/standard.js';
import standardStylistic from './src/stylistic-standard.js';
import importOrder from './src/plugin-import.js';
import tests from './src/tests.js';
import typescript from './src/typescript.js';
import typescriptStylistic from './src/typescript-stylistic.js';
import typescriptStylisticPlus from './src/typescript-stylistic-plus.js';
import typescriptTests from './src/typescript-tests.js';
import autumnTs from './src/plugin-autumn.js';
import jsxStylistic from './src/stylistic-jsx.js';

export type Options = {
	strict?:     boolean;
	typescript?: boolean;
	jsx?:        boolean;

	importOrder?: {
		pathGroups?: PathGroup[];
	};
};

export default (options?: Options) => {
	const config: Linter.FlatConfig[] = [
		standard(),
		standardStylistic(options),
		importOrder(options),
		tests()
	];

	if (options?.typescript ?? false) {
		config.push(
			typescript(options),
			typescriptStylistic(),
			typescriptStylisticPlus(),
			autumnTs(),
			typescriptTests()
		);
	}

	if (options?.jsx ?? false) {
		config.push(
			jsxStylistic()
		);
	}

	return config;
};
