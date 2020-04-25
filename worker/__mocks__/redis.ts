export function createClient() { //TODO: extend with env variables
	return {
		set(key: string, value: any) {
			SetSpy(key, value);
			return;
		}
	};
}

export const SetSpy = jest.fn();
