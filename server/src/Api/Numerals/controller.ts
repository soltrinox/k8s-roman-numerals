import { Model, Schema } from '@gkampitakis/mongo-client';
import fetch from 'node-fetch';
import configuration from '../../../configuration';
import { ROMAN_REGEX } from './constants';
import { RedisClient } from '../../Components';

class NumeralsController {
	private model: Model;

	public constructor() {
		this.setupModel();
		this.setupRedis();
	}

	public deleteAll(): Promise<any> {
		return this.model.deleteMany({});
	}

	public retrieve(type: 'arabic' | 'roman', limit = 10, skip = 0): Promise<any> {
		return this.model
			.find(
				{},
				{
					fields: {
						[type]: 1
					}
				}
			)
			.skip(skip)
			.limit(limit)
			.toArray();
	}

	public async convertToRoman(value: number): Promise<any> {
		if (!this.validArabic(value))
			return {
				message: 'Wrong input provided',
				error: true
			};

		const result = await this.model.findOne(
			{
				arabic: value
			},
			{
				lean: true,
				fields: {
					roman: 1
				}
			}
		);

		if (!result) this.sendRequest('roman', value);
		return {
			...{ result },
			message: result ? 'Value cached' : 'Converting value'
		};
	}

	public async convertToArabic(value: string): Promise<any> {
		if (!this.validRoman(value))
			return {
				message: 'Wrong input provided',
				error: true
			};

		const result = await this.model.findOne(
			{
				roman: value
			},
			{
				lean: true,
				fields: {
					arabic: 1
				}
			}
		);

		if (!result) this.sendRequest('arabic', value);
		return {
			...{ result },
			message: result ? 'Value cached' : 'Converting value'
		};
	}

	private sendRequest(type: 'roman', value: number): Promise<Response>;
	private sendRequest(type: 'arabic', value: string): Promise<Response>;
	private sendRequest(type: any, value: any) {
		return fetch(`${configuration.worker.host}/${type}/${value}`).then((res) => res.json());
	}

	private validRoman(value: string) {
		const roman = value.toUpperCase();
		return ROMAN_REGEX.test(roman);
	}

	private validArabic(value: number) {
		return Number.isInteger(value) && value < 5000 && value >= 1;
	}

	private setupModel(): void {
		this.model = Model(
			'numerals',
			new Schema({
				properties: {
					arabic: {
						type: 'number'
					},
					roman: {
						type: 'string'
					}
				},
				type: 'object'
			})
		);
	}

	private setupRedis() {
		RedisClient.subscribe('new_request', async (message: { arabic: number; roman: string }) => {
			const doc = await this.model.create(message, { lean: true });

			RedisClient.publish('new_value', { numeralComputation: doc });
		});
	}
}

export default new NumeralsController();
