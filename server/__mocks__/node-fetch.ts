const FETCH_SPY = jest.fn();

export default function fetch(url) {
	FETCH_SPY(url);
	return Promise.resolve({ json: () => {} });
}

export { FETCH_SPY };
