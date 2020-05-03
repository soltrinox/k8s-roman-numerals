jest.mock('../../../configuration', () => ({
	redis: {
		port: 1000,
		host: 'mockHost',
		pass: '12345'
	}
}));
jest.mock('graphql-redis-subscriptions');
jest.mock('redis');

import RedisClient from './client';

describe('RedisClient', () => {
	RedisClient;
	const { ConstructorSpy } = jest.requireMock('redis'),
		{ RedisPubSub } = jest.requireMock('graphql-redis-subscriptions');

	beforeEach(() => {
		RedisPubSub.SubscribeSpy.mockClear();
		RedisPubSub.PublishSpy.mockClear();
		RedisPubSub.AsyncIteratorSpy.mockClear();

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
			ConstructorSpy.mockClear();
		});
	});

	describe('Subscribe', () => {
		it('Should call redisPubSub subscribe fn', () => {
			const callbackSpy = jest.fn();
			RedisClient.subscribe('mockChannel', callbackSpy);

			expect(RedisPubSub.SubscribeSpy).toHaveBeenNthCalledWith(1, 'mockChannel', expect.any(Function));
			expect(callbackSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Publish', () => {
		it('Should call redisPubSub publish fn', () => {
			RedisClient.publish('mockChannel', {});

			expect(RedisPubSub.PublishSpy).toHaveBeenNthCalledWith(1, 'mockChannel', {});
		});
	});

	describe('asyncIterator', () => {
		it('Should return asyncIterator', () => {
			expect(RedisClient.asyncIterator('channel')).toBe('channel');
		});
	});
});
