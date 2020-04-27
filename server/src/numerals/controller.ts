import { Model, Schema } from '@gkampitakis/mongo-client';
import fetch from 'node-fetch';

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

	public convertToRoman(value: number): Promise<any> {
		return this.sendRequest('roman', value);
	}

	public convertToArabic(value: string): Promise<any> {
		return this.sendRequest('arabic', value);
	}

	private sendRequest(type: 'roman', value: number): Promise<Response>;
	private sendRequest(type: 'arabic', value: string): Promise<Response>;//TODO: make the url configurable
	private sendRequest(type: any, value: any) {
		return fetch(`http://localhost:4000/${type}/${value}`).then((res) => res.json());
	}
}

export default new NumeralsController();
