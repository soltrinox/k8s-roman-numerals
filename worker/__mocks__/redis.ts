export function createClient(param) {
	ConstructorSpy(param);
	return {
		publish(arabic: number, roman: string) {
			SetSpy(arabic, roman);
			return;
		}
	};
}

export const SetSpy = jest.fn(),
	ConstructorSpy = jest.fn();
