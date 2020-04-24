import { FastifyInstance } from 'fastify';

export function registerTransformer(server: FastifyInstance) {
	server.get('/', (req, res) => {
		res.send('Hello World');
	});
}
