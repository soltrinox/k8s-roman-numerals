export function createClient(param) {
	ConstructorSpy(param);
	return {
		set(key: string, value: any) {
			SetSpy(key, value);
			return;
		}
	};
}

export const SetSpy = jest.fn(),
	ConstructorSpy = jest.fn();
