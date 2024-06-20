export const debounce = <T extends (...args: any[]) => any>(fn: T, timeout = 1000) => {
	let timer: any;

	return (...args: Parameters<T>) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn(...args);
		}, timeout);
	};
};
