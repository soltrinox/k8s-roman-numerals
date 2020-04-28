import { createClient, RedisClient as Client } from 'redis';
import configuration from '../../../configuration';

export default class RedisClient {
	private client: Client;

	public constructor() {
		const { port, host, pass } = configuration.redis;
		this.client = createClient({ host, port, auth_pass: pass });
	}

	public publish(arabic: number, roman: string): void {
		const payload = {
			arabic,
			roman
		};

		this.client.publish('new_request', JSON.stringify(payload));
	}
}
