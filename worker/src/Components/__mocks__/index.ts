export const REGEX_CONTROL = {
	valid: true,
};

export const RegexSpy = jest.fn();

export const ROMAN_REGEX = {
	test(value) {
		RegexSpy(value);
		return REGEX_CONTROL.valid;
	},
};

export class Calculator {
	public static ToRomanSpy = jest.fn();
	public static ToArabicSpy = jest.fn();

	public toRoman(value) {
		Calculator.ToRomanSpy(value);
		return value;
	}

	public toArabic(value) {
		Calculator.ToArabicSpy(value);
		return value;
	}
}

export class RedisClient {
	public static SaveSpy = jest.fn();
	public static Error = false;

	public save(type: string, key: string, value: any) {
        if (RedisClient.Error) throw new Error('Unexpected Error');
        
		RedisClient.SaveSpy(type, key, value);
		return;
	}
}
