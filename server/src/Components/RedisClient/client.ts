import { createClient } from 'redis';
import configuration from '../../../configuration';
import { Model, Schema } from '@gkampitakis/mongo-client';
import { RedisPubSub } from 'graphql-redis-subscriptions';

class RedisClient {
	private redisPubSub: RedisPubSub;
	private model: Model;
	private static instance: RedisClient;

	public static getInstance() {
		console.log('test');
		
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

		this.setupModel();
	}

	public initClient(): void {
		this.redisPubSub.subscribe('new_request', async (message: string) => {
			const payload: {
				arabic: number;
				roman: string;
			} = JSON.parse(message);

			const doc = await this.model.create(payload, true);

			this.redisPubSub.publish('new_value', doc);
		});
	}

	public asyncIterator(channel: string) {
		return this.redisPubSub.asyncIterator(channel);
	}

	private setupModel() {
		this.model = Model(
			'numerals',	
			new Schema({
				properties: {
					arabic: {
						type: 'number'
					},
					roman: {
						type: 'string'
					}
				},
				type: 'object'
			})
		);
	}
}

export default RedisClient.getInstance();
