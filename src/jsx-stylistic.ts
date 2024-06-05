import type { ESLint, Linter } from 'eslint';

import stylisticJsx from '@stylistic/eslint-plugin-jsx';

import { prefixKeys } from './util/prefix-keys.js';

export default () => ({

	plugins: {
		'@stylistic/eslint-plugin-jsx': <ESLint.Plugin> stylisticJsx
	},

	rules: {
		...prefixKeys('@stylistic/eslint-plugin-jsx', {
			'jsx-closing-bracket-location': ['warn', 'line-aligned'],
			'jsx-curly-brace-presence':     ['warn', 'never'],
			'jsx-curly-spacing':            ['warn', {
				when:       'never',
				attributes: true,
				children:   false
			}],
			'jsx-equals-spacing':        ['warn', 'never'],
			'jsx-first-prop-new-line':   ['warn', 'multiline'],
			'jsx-function-call-newline': ['warn', 'multiline'],
			'jsx-props-no-multi-spaces': ['warn'],
			'jsx-self-closing-comp':     ['warn'],
			'jsx-tag-spacing':           ['warn', {
				closingSlash:      'never',
				beforeSelfClosing: 'never',
				afterOpening:      'never',
				beforeClosing:     'never'
			}]
		})
	}

} satisfies Linter.FlatConfig);
