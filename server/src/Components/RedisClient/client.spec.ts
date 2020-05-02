jest.mock('../../../configuration', () => ({
	redis: {
		port: 1000,
		host: 'mockHost',
		pass: '12345'
	}
}));
jest.mock('graphql-redis-subscriptions');
jest.mock('@gkampitakis/mongo-client');
jest.mock('redis');

import RedisClient from './client';

describe('RedisClient', () => {
	RedisClient;
	const { ConstructorSpy } = jest.requireMock('redis'),
		{ RedisPubSub } = jest.requireMock('graphql-redis-subscriptions'),
		{ ModelSpy, CREATE_SPY } = jest.requireMock('@gkampitakis/mongo-client');

	beforeEach(() => {
		RedisPubSub.SubscribeSpy.mockClear();
		RedisPubSub.PublishSpy.mockClear();
		RedisPubSub.AsyncIteratorSpy.mockClear();
		ModelSpy.mockClear();
		CREATE_SPY.mockClear();

		RedisPubSub.MockValue = {
			arabic: 10,
			roman: '10'
		};
	});

	describe('Constructor', () => {
		it('Should call redis client and init RedisPubSub', () => {
			expect(ConstructorSpy).toHaveBeenCalledTimes(2);
			expect(ConstructorSpy).toHaveBeenCalledWith({ host: 'mockHost', auth_pass: '12345', port: 1000 });
			expect(ConstructorSpy).toHaveBeenCalledWith({ host: 'mockHost', auth_pass: '12345', port: 1000 });
			expect(RedisPubSub.ConstructorSpy).toHaveBeenCalledTimes(1);
			ConstructorSpy.mockClear();
			RedisPubSub.ConstructorSpy.mockClear();
		});
	});

	describe('initClient', () => {
		it('on Call it should call the create and publish method', (done) => {
			RedisClient.initClient();

			setTimeout(() => {
				expect(RedisPubSub.SubscribeSpy).toHaveBeenNthCalledWith(1, 'new_request', expect.any(Function));
				expect(CREATE_SPY).toHaveBeenNthCalledWith(1, { arabic: 10, roman: '10' }, true);
				expect(RedisPubSub.PublishSpy).toHaveBeenNthCalledWith(1, 'new_value', 'mockDoc');
				done();
			}, 100);
		});
	});

	describe('asyncIterator', () => {
		it('Should return asyncIterator', () => {
			expect(RedisClient.asyncIterator('channel')).toBe('channel');
		});
	});
});
