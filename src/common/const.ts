export type Const<T> =
	T extends (...parameters: readonly never[]) => unknown ? T
	: T extends abstract new (...parameters: readonly never[]) => unknown ? T
	: T extends Promise<infer Value> ? Readonly<Promise<Const<Value>>>
	: T extends ReadonlyMap<infer Key, infer Value> ? Readonly<ReadonlyMap<Const<Key>, Const<Value>>>
	: T extends ReadonlySet<infer Value> ? Readonly<ReadonlySet<Const<Value>>>
	: T extends object
		? { [Key in keyof T]: T[Key] } extends T
			? { readonly [Key in keyof T]: Const<T[Key]> }
			: T
		: T;
