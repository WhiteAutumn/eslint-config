import type { Linter } from 'eslint';
import type { PathGroup } from './src/plugin-import.js';

import standard from './src/standard.js';
import stylisticStandard from './src/stylistic-standard.js';
import stylisticTypescript from './src/stylistic-typescript.js';
import stylisticJsx from './src/stylistic-jsx.js';
import typescript from './src/typescript.js';
import testsStandard from './src/tests-standard.js';
import testsTypescript from './src/tests-typescript.js';
import autumnPluginTypescript from './src/plugin-autumn-typescript.js';
import importPlugin from './src/plugin-import.js';
import nPlugin from './src/plugin-n.js';

export type Options = {
	strict?:     boolean;
	typescript?: boolean;
	jsx?:        boolean;

	importOrder?: {
		pathGroups?: PathGroup[];
	};
};

export default (options?: Options) => {
	const config: Linter.Config[] = [
		standard(options),
		stylisticStandard(options),
		testsStandard(),
		importPlugin(options),
		nPlugin()
	];

	if (options?.typescript ?? false) {
		config.push(
			typescript(options),
			stylisticTypescript(),
			testsTypescript(),
			autumnPluginTypescript()
		);
	}

	if (options?.jsx ?? false) {
		config.push(
			stylisticJsx()
		);
	}

	return config;
};
