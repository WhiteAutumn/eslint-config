import type { Linter } from 'eslint';
import type { Const } from './src/common/const.js';
import type { ImportOptions } from './src/rules/imports.js';
import type { NodeOptions } from './src/rules/node.js';

import eslintRules from './src/rules/eslint.js';
import stylisticRules from './src/rules/stylistic.js';
import typescriptRules from './src/rules/typescript.js';
import testRules from './src/rules/tests.js';
import importsRules from './src/rules/imports.js';
import nodeRules from './src/rules/node.js';

export { discoverNodeVersion, discoverWorkspacePackages, discoverInternalImports } from './src/common/project.js';
export type { ImportOptions, PathGroup } from './src/rules/imports.js';
export type { NodeOptions } from './src/rules/node.js';

export type Options = {
	strict?: boolean;
	ideal?:  boolean;

	typescript?: boolean;
	jsx?:        boolean;

	imports?: ImportOptions;
	node?:    NodeOptions;
};

export default ({ ...options }: Const<Options> = {}) => {
	options.ideal ??= true;

	const config: Linter.Config[] = [
		{
			linterOptions: {
				reportUnusedDisableDirectives: options.strict === true ? 'warn' : 'off'
			}
		},

		eslintRules(options),
		stylisticRules(options),
		importsRules(options),
		nodeRules(options)
	];

	if (options?.typescript ?? false) {
		config.push(
			typescriptRules(options)
		);
	}

	config.push(
		testRules(options)
	);

	return config;
};
