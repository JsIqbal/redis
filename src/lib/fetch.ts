type Fetch = typeof fetch;
type Opts = Parameters<Fetch>[1];

export const post = async (url: string, body: any) => {
	return f(url, {
		method: 'post',
		body: JSON.stringify(body)
	});
};

export const del = async (url: string) => {
	return f(url, {
		method: 'delete'
	});
};

export const get = async (url: string) => {
	return f(url, {
		method: 'get'
	});
};

export const f = async (
	url: string,
	opts?: Opts,
	client: Fetch = fetch
): Promise<[any, string | null, Response | null]> => {
	let res: Response;
	let data: any;

	let _opts: Opts = {
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json'
		}
	};
	if (opts) {
		_opts = { ..._opts, ...opts };
	}

	try {
		res = await client(url, _opts);
		data = await res.json();
	} catch (err) {
		return [null, err, null];
	}

	if (res.status >= 400) {
		if (data && data.message) {
			return [data, data.message, res];
		} else if (typeof data === 'string') {
			return [data, data, res];
		} else {
			return [data, 'Something went wrong.', res];
		}
	}

	return [data, null, res];
};
