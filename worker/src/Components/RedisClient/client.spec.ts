import RedisClient from './client';

jest.mock('../../../configuration', () => ({
	redis: {
		port: 1000,
		host: 'mockHost',
		pass: '12345'
	}
}));
jest.mock('redis');

describe('client', () => {
	const { SetSpy, ConstructorSpy } = jest.requireMock('redis');

	beforeEach(() => {
		SetSpy.mockClear();
		ConstructorSpy.mockClear();
	});

	it('Should call create client with correct config', () => {
		new RedisClient();

		expect(ConstructorSpy).toHaveBeenNthCalledWith(1, { host: 'mockHost', port: 1000, auth_pass: '12345' });
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
