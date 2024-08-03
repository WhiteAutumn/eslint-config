import type { ESLint } from 'eslint';

import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { prefixKeys } from './util/prefix-keys.js';

const typeAliasDeclareSpacing = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type:    'layout',
		docs:    { description: 'Enforce spacing for type declaration' },
		fixable: 'whitespace',
		
		schema: [
			{
				oneOf: [
					{
						type: 'string',
						enum: ['always', 'never']
					},
					{
						type:       'object',
						properties: {
							before: {
								type: 'boolean'
							},
							after: {
								type: 'boolean'
							}
						}
					}
				]
			}
		],

		messages: {
			expectedSpaceBefore:   'Expected space before =',
			expectedSpaceAfter:    'Expected space after =',
			unexpectedSpaceBefore: 'Unexpected space before =',
			unexpectedSpaceAfter:  'Unexpected space after ='
		}
	},

	defaultOptions: ['always', { before: true, after: true }],

	create: (context, options) => ({
		TSTypeAliasDeclaration: (node: TSESTree.TSTypeAliasDeclaration) => {
			const [tokenStart] = node.range;
			const [, assignStartAbsolute] = node.typeParameters?.range ?? node.id.range;
			const [assignEndAbsolute] = node.typeAnnotation.range;
			const assignStart = assignStartAbsolute - tokenStart;
			const assignEnd = assignEndAbsolute - tokenStart;

			const sourceText = context.sourceCode.getText(node);
			const assignSourceText = sourceText.substring(assignStart, assignEnd);
			const [beforeSpacing, afterSpacing] = assignSourceText.split('=');

			type Mode = ('always' | 'never') & {
				before: boolean;
				after:  boolean;
			};

			const mode = <Mode> options.at(0);
			const isAlways = mode === 'always' ? true : null;
			const isNever = mode === 'never' ? false : null;
			const config = {
				before: isAlways ?? isNever ?? mode.before,
				after:  isAlways ?? isNever ?? mode.after
			};

			if (config.before && beforeSpacing !== ' ') {
				context.report({
					node:      node,
					messageId: 'expectedSpaceBefore',

					loc: {
						start: context.sourceCode.getLocFromIndex(assignStartAbsolute),
						end:   context.sourceCode.getLocFromIndex(assignStartAbsolute + beforeSpacing.length)
					},
					
					fix: fixer => fixer.replaceTextRange([assignStartAbsolute, assignStartAbsolute + beforeSpacing.length], ' ')
				});
			}
			else if (!config.before && beforeSpacing.length > 0) {
				context.report({
					node:      node,
					messageId: 'unexpectedSpaceBefore',

					loc: {
						start: context.sourceCode.getLocFromIndex(assignStartAbsolute),
						end:   context.sourceCode.getLocFromIndex(assignStartAbsolute + beforeSpacing.length)
					},
					
					fix: fixer => fixer.replaceTextRange([assignStartAbsolute, assignStartAbsolute + beforeSpacing.length], '')
				});
			}

			if (config.after && afterSpacing !== ' ') {
				context.report({
					node:      node,
					messageId: 'expectedSpaceAfter',

					loc: {
						start: context.sourceCode.getLocFromIndex(assignEndAbsolute - afterSpacing.length),
						end:   context.sourceCode.getLocFromIndex(assignEndAbsolute)
					},
					
					fix: fixer => fixer.replaceTextRange([assignEndAbsolute - afterSpacing.length, assignEndAbsolute], ' ')
				});
			}
			else if (!config.after && afterSpacing.length > 0) {
				context.report({
					node:      node,
					messageId: 'unexpectedSpaceAfter',

					loc: {
						start: context.sourceCode.getLocFromIndex(assignEndAbsolute - afterSpacing.length),
						end:   context.sourceCode.getLocFromIndex(assignEndAbsolute)
					},
					
					fix: fixer => fixer.replaceTextRange([assignEndAbsolute - afterSpacing.length, assignEndAbsolute], '')
				});
			}
		}
	})
});

export const plugin = {
	rules: {
		'type-alias-declare-spacing': typeAliasDeclareSpacing
	}
};

export default () => ({
	plugins: {
		'@autumn.dev/ts': <ESLint.Plugin> <unknown> plugin
	},

	rules: prefixKeys('@autumn.dev/ts', {
		'type-alias-declare-spacing': ['warn']
	})
});
