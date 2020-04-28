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

	it('Should call the publish method', () => {
		const client = new RedisClient(),
			payload = JSON.stringify({
				arabic: 10,
				roman: 'x'
			});

		client.publish(10, 'x');

		expect(SetSpy).toHaveBeenNthCalledWith(1, 'new_request', payload);
	});
});
