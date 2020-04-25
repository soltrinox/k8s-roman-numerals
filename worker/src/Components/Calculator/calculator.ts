import { numeralMap, ROMAN_REGEX } from './constants';

export default class Calculator {
	public toRoman(number: number): string {
		let result = '';
		if (number >= 5000 || number <= 0) return result;

		numeralMap.forEach((value, key) => {
			while (number % value < number) {
				result += key;
				number -= value;
			}
		});

		return result;
	}

	public toArabic(number: string): number {
		let result = 0;
		if (!number || !ROMAN_REGEX.test(number)) return NaN;

		numeralMap.forEach((value, key) => {
			//TODO: refactor to reduce
			while (number.length > 0 && number.indexOf(key) === 0) {
				result += value;
				number = number.replace(key, '');
			}
		});

		return result;
	}
}
