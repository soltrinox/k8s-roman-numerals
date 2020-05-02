export class RedisPubSub {
	public static ConstructorSpy = jest.fn();
	public static SubscribeSpy = jest.fn();
	public static PublishSpy = jest.fn();
	public static AsyncIteratorSpy = jest.fn();
	public static MockValue = {
		arabic: 10,
		roman: '10'
	};

	public constructor(param: any) {
		RedisPubSub.ConstructorSpy(param);
	}

	public async subscribe(channel: string, callback) {
		RedisPubSub.SubscribeSpy(channel, callback);

		await callback(RedisPubSub.MockValue);
	}

	public publish(channel: string, value: any) {
		RedisPubSub.PublishSpy(channel, value);
	}

	public asyncIterator(channel: string) {
		return channel;
	}
}
