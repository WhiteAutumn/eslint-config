# TODO

- [ ] Use a built-in rule to require a separate closing parenthesis when a call wraps between arguments or after `(`, while allowing an inline callback to end with `});`.
- [ ] Remove the deprecated Stylistic rules that `@stylistic/list-style` replaced.
- [ ] Recheck `@typescript-eslint/no-unnecessary-condition` after [TypeScript#9998](https://github.com/microsoft/TypeScript/issues/9998) or a rule-level callback fix, it currently reports valid conditions as unnecessary.
- [ ] Replace `@stylistic/padded-blocks` with a rule that forbids blank lines before closing braces but allows them after opening braces.
