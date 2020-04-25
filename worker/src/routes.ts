import { FastifyInstance } from 'fastify';
import TransformerRoutes from './Controllers';

export default (server: FastifyInstance) => {
	for (let [, register] of Object.entries(TransformerRoutes)) {
		register(server);
	}
};
