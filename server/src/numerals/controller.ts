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

	// public deleteAll(): Promise<void> {}

	// public retrieve(type: 'arabic' | 'roman'): Promise<any> {} //TODO: add typess]

	public convertToRoman(value: number): Promise<any> {
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
