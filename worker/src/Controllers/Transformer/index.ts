import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerTransformer(server: FastifyInstance) {
	server.get('/roman/:number', (req, res) =>
		Controller.ArabicToRoman(req, res)
	);

	server.get('/arabic/:number', (req, res) =>
		Controller.RomanToArabic(req, res)
	);
}
