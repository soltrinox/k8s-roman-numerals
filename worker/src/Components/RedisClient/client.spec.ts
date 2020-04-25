import RedisClient from './client';

jest.mock('redis');

describe('client', () => {
	const { SetSpy } = jest.requireMock('redis');

	beforeEach(() => {
		SetSpy.mockClear();
	});

	it('Should call the set method', () => {
		const client = new RedisClient();

		client.save('arabic', '10', 10);

		expect(SetSpy).toHaveBeenNthCalledWith(1, 'arabic_10', 10);
	});

	it('Should call the set method', () => {
		const client = new RedisClient();

		client.save('roman', '10', 10);
		expect(SetSpy).toHaveBeenNthCalledWith(1, 'roman_10', 10);
	});
});
