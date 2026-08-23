type Mutable<T> = T extends object
	? { -readonly [K in keyof T]: Mutable<T[K]> }
	: T;

type PrefixedRecord<P extends string, T extends Record<string, unknown>> = {
	[K in Extract<keyof T, string> as `${P}${K}`]: T[K];
};

export const prefixKeys = <const P extends string, const T extends Record<string, unknown>> (prefix: P, target: T): PrefixedRecord<P, Mutable<T>> => {
	const result: Record<string, unknown> = {};
	for (const key in target) {
		result[`${prefix}${key}`] = target[key];
	}

	return result as PrefixedRecord<P, Mutable<T>>;
};
