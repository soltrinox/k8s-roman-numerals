import { createClient } from 'redis';
import configuration from '../../../configuration';
import { RedisPubSub } from 'graphql-redis-subscriptions';

class RedisClient {
	private redisPubSub: RedisPubSub;
	private static instance: RedisClient;

	public static getInstance() {
		if (!RedisClient.instance) RedisClient.instance = new RedisClient();

		return RedisClient.instance;
	}

	public constructor() {
		const { port, host, pass } = configuration.redis;

		this.redisPubSub = new RedisPubSub({
			publisher: createClient({ host, port, auth_pass: pass }),
			subscriber: createClient({ host, port, auth_pass: pass }),
			connection: { host, port, password: pass }
		});
	}

	public subscribe(channel: string, callback: Function): void {
		this.redisPubSub.subscribe(channel, callback);
	}

	public publish(channel: string, message: object): void {
		this.redisPubSub.publish(channel, message);
	}

	public asyncIterator(channel: string) {
		return this.redisPubSub.asyncIterator(channel);
	}
}

export default RedisClient.getInstance();
