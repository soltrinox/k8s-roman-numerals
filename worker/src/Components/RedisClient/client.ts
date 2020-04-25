import { createClient, RedisClient as Client } from 'redis';

export default class RedisClient {
	private client: Client;

	public constructor() {
		this.client = createClient(); //TODO: add validation and url from configurator
	}

	public save(type: 'arabic' | 'roman', key: string, value: any): void {
		this.client.set(`${type}_${key}`, value);
	}
}
