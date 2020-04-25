import { createClient, RedisClient as Client } from 'redis';
import configuration from '../../../configuration';

export default class RedisClient {
	private client: Client;

	public constructor() {
		const { port, host, pass } = configuration.redis;
		this.client = createClient({ host, port, auth_pass: pass });
	}

	public save(type: 'arabic' | 'roman', key: string, value: any): void {
		this.client.set(`${type}_${key}`, value);
	}
}
