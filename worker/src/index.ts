import fastify, { FastifyInstance } from 'fastify';
import setupRoutes from './routes';
import cors from 'fastify-cors';

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
		this.server.register(cors, { origin: '*' });
		setupRoutes(this.server);
	}

	public start(port: number) {
		return this.server.listen(port, '0.0.0.0');
	}
}

export default new Server();
