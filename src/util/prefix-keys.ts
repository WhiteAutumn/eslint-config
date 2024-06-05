
type Mutable<T> = {
	-readonly [K in keyof T]: T[K] extends object ? Mutable<T[K]> : T[K];
};

type PrefixedRecord<P extends string, T extends Record<string, unknown>> = {
	[K in Extract<keyof T, string> as `${P}/${K}`]: T[K];
};

export const prefixKeys = <const P extends string, const T extends Record<string, unknown>> (prefix: P, target: T): PrefixedRecord<P, Mutable<T>> => {
	const result: Record<string, unknown> = {};
	for (const key in target) {
		result[`${prefix}/${key}`] = target[key];
	}

	return <PrefixedRecord<P, T>> result;
};
