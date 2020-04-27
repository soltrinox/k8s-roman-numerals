import { Model, Schema } from '@gkampitakis/mongo-client';

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
		//TODO: return message and send request to worker
		return this.model.create(
			{
				arabic: value,
				roman: '0'
			},
			true
		);
	}
	// public convertToArabic(value: string): void {}
}

export default new NumeralsController();
