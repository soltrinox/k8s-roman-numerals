export function createClient(param) {
	ConstructorSpy(param);
	return param;
}

export const ConstructorSpy = jest.fn();
