import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCallSites } from 'node:util';

type PackageJson = {
	name?:       string;
	workspaces?: string[];
	imports?:    Record<string, unknown>;
	engines?: {
		node?: string;
	};
};

export const discoverNodeVersion = async (): Promise<string | undefined> => {
	const caller = getCallSites(2)[1]?.scriptName;
	if (caller == null) {
		throw new Error('Could not determine the caller of function!');
	}

	const packageRoot = path.dirname(fileURLToPath(caller));
	const packageJson = JSON.parse(await fs.readFile(path.join(packageRoot, 'package.json'), 'utf8')) as PackageJson;

	return packageJson.engines?.node;
};

export const discoverWorkspacePackages = async (): Promise<string[]> => {
	const caller = getCallSites(2)[1]?.scriptName;
	if (caller == null) {
		throw new Error('Could not determine the caller of function!');
	}

	const packageRoot = path.dirname(fileURLToPath(caller));
	const rootPackage = JSON.parse(await fs.readFile(path.join(packageRoot, 'package.json'), 'utf8')) as PackageJson;
	const workspacePatterns = rootPackage.workspaces?.map(workspace => path.posix.join(workspace, 'package.json')) ?? [];

	const workspacePackages = await Array.fromAsync(
		fs.glob(workspacePatterns, { cwd: packageRoot }),
		async packageJsonPath => {
			const workspacePackageJson = await fs.readFile(path.join(packageRoot, packageJsonPath), 'utf8');

			return JSON.parse(workspacePackageJson) as PackageJson;
		}
	);

	const workspaceNames = workspacePackages
		.map(workspacePackage => workspacePackage.name)
		.filter(name => name != null);

	return new Set(workspaceNames)
		.values()
		.toArray();
};

export const discoverInternalImports = async (): Promise<string[]> => {
	const caller = getCallSites(2)[1]?.scriptName;
	if (caller == null) {
		throw new Error('Could not determine the caller of function!');
	}

	const packageRoot = path.dirname(fileURLToPath(caller));
	const packageJson = JSON.parse(await fs.readFile(path.join(packageRoot, 'package.json'), 'utf8')) as PackageJson;

	const specifiers = Object.keys(packageJson.imports ?? {})
		.map(specifier => specifier.replace(/\/\*$/u, ''));

	return new Set(specifiers)
		.values()
		.toArray();
};
