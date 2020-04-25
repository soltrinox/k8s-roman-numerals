import fastify, { FastifyInstance } from 'fastify';
import setupRoutes from './routes';

class Server {
	private server: FastifyInstance;
	constructor() {
		this.server = fastify({
			logger: {
				prettyPrint: {
					colorize: true,
					ignore: 'pid,hostname,time'
				}
			}
		});
		this.setupServer();
	}

	private setupServer(): void {
		setupRoutes(this.server);
	}

	public start(port: number) {
		return this.server.listen(port);
	}
}

export default new Server();
