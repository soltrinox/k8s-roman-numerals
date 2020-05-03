export const SubscribeSpy = jest.fn(),
	PublishSpy = jest.fn();

export const RedisClient = {
	subscribe(channel: any, callback: any) {
		SubscribeSpy(channel, callback);
		callback({ arabic: 10, roman: '10' });
	},
	publish(channel: string, message: any) {
		PublishSpy(channel, message);
	}
};
