import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { Calculator, ROMAN_REGEX, RedisClient } from '../../Components/';

class Controller {
	private calculator: Calculator;
	private redisClient: RedisClient;
	public constructor() {
		this.calculator = new Calculator();
		this.redisClient = new RedisClient();
	}

	public RomanToArabic(req: FastifyRequest, res: FastifyReply<ServerResponse>): any {
		const value = req.params.number.toUpperCase();
		if (!value || !ROMAN_REGEX.test(value)) return this.handleError(req, res, 400, Error(`Incorrect Input: ${value}`));

		try {
			this.redisClient.publish(this.calculator.toArabic(value), value);
		} catch (error) {
			return this.handleError(req, res, 500, error);
		}

		res.status(200).send({ message: 'Success' });
	}

	public ArabicToRoman(req, res): any {
		const value = Number(req.params.number);
		if (!value || !Number.isInteger(value) || value >= 5000 || value < 1)
			return this.handleError(req, res, 400, Error(`Incorrect Input: ${req.params.number}`));

		try {
			this.redisClient.publish(value, this.calculator.toRoman(value));
		} catch (error) {
			return this.handleError(req, res, 500, error);
		}

		res.status(200).send({ message: 'Success' });
	}

	private handleError(req: FastifyRequest, res: FastifyReply<ServerResponse>, status: number, error: Error) {
		const message = error.message;
		req.log.error(message);
		return res.status(status).send({ message });
	}
}

export default new Controller();

