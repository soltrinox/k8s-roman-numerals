import Controller from './controller';

jest.mock('../../Components');

describe('Transformer Controller', () => {
	const { REGEX_CONTROL, RegexSpy, Calculator, RedisClient } = jest.requireMock('../../Components'),
		LoggerSpy = jest.fn(),
		StatusSpy = jest.fn(),
		SendSpy = jest.fn();

	let mockRequest: any, mockResponse: any;

	beforeEach(() => {
		Calculator.ToRomanSpy.mockClear();
		Calculator.ToArabicSpy.mockClear();
		RedisClient.SaveSpy.mockClear();
		RegexSpy.mockClear();
		LoggerSpy.mockClear();
		StatusSpy.mockClear();
		SendSpy.mockClear();

		REGEX_CONTROL.valid = true;
		RedisClient.Error = false;

		mockRequest = {
			params: {
				number: '10'
			},
			log: {
				error(value) {
					LoggerSpy(value);
					return value;
				}
			}
		};
		mockResponse = {
			status(number) {
				StatusSpy(number);
				return {
					send(value) {
						SendSpy(value);
					}
				};
			}
		};
	});

	describe('RomanToArabic', () => {
		it('Should throw incorrect input if wrong value type', () => {
			REGEX_CONTROL.valid = false;
			Controller.RomanToArabic(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: 10');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: 10' });
			expect(RegexSpy).toHaveBeenNthCalledWith(1, '10');
			expect(Calculator.ToArabicSpy).not.toHaveBeenCalled();
		});

		it('Should throw incorrect input if no value', () => {
			mockRequest.params.number = '';

			Controller.RomanToArabic(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: ');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: ' });
			expect(RegexSpy).not.toHaveBeenCalled();
			expect(Calculator.ToArabicSpy).not.toHaveBeenCalled();
		});

		it('Should call the request send method', () => {
			Controller.RomanToArabic(mockRequest, mockResponse);

			expect(StatusSpy).toHaveBeenNthCalledWith(1, 200);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Success' });
			expect(RegexSpy).toHaveBeenNthCalledWith(1, '10');
			expect(Calculator.ToArabicSpy).toHaveBeenNthCalledWith(1, '10');
			expect(RedisClient.SaveSpy).toHaveBeenNthCalledWith(1, 'arabic', '10', '10');
		});
	});

	describe('ArabicToRoman', () => {
		it('Should throw incorrect input if wrong value type', () => {
			mockRequest.params.number = 'test';

			Controller.ArabicToRoman(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: test');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: test' });
			expect(Calculator.ToRomanSpy).not.toHaveBeenCalled();
		});

		it('Should throw incorrect input if wrong value >=5000', () => {
			mockRequest.params.number = '6000';

			Controller.ArabicToRoman(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: 6000');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: 6000' });
			expect(Calculator.ToRomanSpy).not.toHaveBeenCalled();
		});

		it('Should throw incorrect input if wrong value <1', () => {
			mockRequest.params.number = '-10';

			Controller.ArabicToRoman(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: -10');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: -10' });
			expect(Calculator.ToRomanSpy).not.toHaveBeenCalled();
		});

		it('Should throw incorrect input if no value', () => {
			mockRequest.params.number = '';

			Controller.ArabicToRoman(mockRequest, mockResponse);

			expect(LoggerSpy).toHaveBeenNthCalledWith(1, 'Incorrect Input: ');
			expect(StatusSpy).toHaveBeenNthCalledWith(1, 400);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Incorrect Input: ' });
			expect(Calculator.ToRomanSpy).not.toHaveBeenCalled();
		});

		it('Should call the request send method', () => {
			Controller.ArabicToRoman(mockRequest, mockResponse);

			expect(StatusSpy).toHaveBeenNthCalledWith(1, 200);
			expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Success' });
			expect(Calculator.ToRomanSpy).toHaveBeenNthCalledWith(1, 10);
			expect(RedisClient.SaveSpy).toHaveBeenNthCalledWith(1, 'roman', '10', 10);
		});
	});

	it('Should handle error', () => {
		RedisClient.Error = true;

		Controller.ArabicToRoman(mockRequest, mockResponse);
		expect(StatusSpy).toHaveBeenNthCalledWith(1, 500);
		expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Unexpected Error' });
	});

	it('Should handle error', () => {
		RedisClient.Error = true;

		Controller.RomanToArabic(mockRequest, mockResponse);
		expect(StatusSpy).toHaveBeenNthCalledWith(1, 500);
		expect(SendSpy).toHaveBeenNthCalledWith(1, { message: 'Unexpected Error' });
	});
});
