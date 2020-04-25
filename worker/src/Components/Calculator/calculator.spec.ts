import Calculator from './calculator';

describe('Calculator', () => {
	const calculator = new Calculator();

	describe('From Arabic to Roman', () => {
		it('Should 10 = X', () => {
			expect(calculator.toRoman(10)).toBe('X');
		});

		it('Wrong input <0', () => {
			expect(calculator.toRoman(-10)).toBe('');
		});

		it('Wrong input >5000', () => {
			expect(calculator.toRoman(10000)).toBe('');
		});

		it('Edge Numbers Wrong Input { 0 }', () => {
			expect(calculator.toRoman(0)).toBe('');
		});

		it('Edge Numbers Wrong Input { 5000 }', () => {
			expect(calculator.toRoman(5000)).toBe('');
		});

		it('Edge Numbers Correct Input { 1 }', () => {
			expect(calculator.toRoman(1)).toBe('I');
		});

		it('Edge Numbers Correct Input { 4999 }', () => {
			expect(calculator.toRoman(4999)).toBe('MMMMCMXCIX');
		});
	});

	describe('From Roman to Arabic', function () {
		it('Should X = 10 ', () => {
			expect(calculator.toArabic('X')).toBe(10);
		});

		it('Wrong input { dasda }', () => {
			expect(calculator.toArabic('dasda')).toBeNaN;
		});

		it('Wrong input >MMMMMMM', () => {
			expect(calculator.toArabic('MMMMMMM')).toBeNaN;
		});

		it('Edge Numbers Wrong Input { 0 }', () => {
			expect(calculator.toArabic('')).toBeNaN;
		});

		it('Edge Numbers Wrong Input { 5000 }', () => {
			expect(calculator.toArabic('MMMMM')).toBeNaN;
		});

		it('Edge Numbers Correct Input { 1 }', () => {
			expect(calculator.toArabic('I')).toBe(1);
		});

		it('Edge Numbers Correct Input { MMMMCMXCIX }', () => {
			expect(calculator.toArabic('MMMMCMXCIX')).toBe(4999);
		});

		it('Random Number { CCLVI }', () => {
			expect(calculator.toArabic('CCLVI')).toBe(256);
		});
	});
});
