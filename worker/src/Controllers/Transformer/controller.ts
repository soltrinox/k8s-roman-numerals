import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { Calculator, ROMAN_REGEX } from '../../Components/';

class Controller {
	private calculator: Calculator;
	public constructor() {
		this.calculator = new Calculator();
	}

	public RomanToArabic(
		req: FastifyRequest,
		res: FastifyReply<ServerResponse>
	): any {
		const value = req.params.number.toUpperCase();
		if (!value || !ROMAN_REGEX.test(value))
			return this.handleError(req, res, 400, `Incorrect Input: ${value}`);

		res.status(200).send({ value: this.calculator.toArabic(value) });
	}

	public ArabicToRoman(req, res): any {
		const value = Number(req.params.number);
		if (!value || !Number.isInteger(value) || value >= 5000 || value < 1)
			return this.handleError(
				req,
				res,
				400,
				`Incorrect Input: ${req.params.number}`
			);

		res.status(200).send({ value: this.calculator.toRoman(value) });
	}

	private handleError(//TODO: test this later
		req: FastifyRequest,
		res: FastifyReply<ServerResponse>,
		status = 500,
		error?: any
	) {
		req.log.error(error ? error : 'Unexpected Error');
		return res.status(status).send(error);
	}
}

export default new Controller();

//TODO: Set up environment
//TODO: redis writing
//TODO: docker dev and prod
