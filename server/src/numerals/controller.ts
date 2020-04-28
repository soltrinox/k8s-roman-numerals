import { Model, Schema } from '@gkampitakis/mongo-client';
import fetch from 'node-fetch';
import configuration from '../../configuration';
import { ROMAN_REGEX } from './constants';

class NumeralsController {
	private model: Model;
	public constructor() {
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
			true
		);

		if (!result) this.sendRequest('roman', value);
		//BUG: update this when mongo client is update
		return {
			...(result && {
				result: {
					roman: result.arabic,
					_id: result._id
				}
			}),
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
			true
		);

		//BUG: update this when mongo client is update

		if (!result) this.sendRequest('arabic', value);
		return {
			...(result && {
				result: {
					arabic: result.arabic,
					_id: result._id
				}
			}),
			message: result ? 'Value cached' : 'Converting value'
		};
	}

	private sendRequest(type: 'roman', value: number): Promise<Response>;
	private sendRequest(type: 'arabic', value: string): Promise<Response>;
	private sendRequest(type: any, value: any) {
		return fetch(`${configuration.worker.host}${type}/${value}`).then((res) => res.json());
	}

	private validRoman(value: string) {
		const roman = value.toUpperCase();
		return ROMAN_REGEX.test(roman);
	}

	private validArabic(value: number) {
		return Number.isInteger(value) && value < 5000 && value >= 1;
	}
}

//TODO: add tests

export default new NumeralsController();
