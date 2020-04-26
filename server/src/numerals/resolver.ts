const arabics = [{ value: 10 }, { value: 12 }, { value: 14 }, { value: 15 }, { value: 16 }],
	romans = [{ value: '10' }, { value: '12' }, { value: '14' }, { value: '15' }, { value: '16' }];

export const resolvers = {
	Query: {
		arabics: () => arabics,
		romans: () => romans
	},
	Mutation: {
		deleteAll: () => ({ message: 'Everything deleted' }),
		convertToRoman(_, args, __, ___) {
			console.log(args);
			return { message: 'Value converting' };
		},
		convertToArabic: (_, args, __, ___) => {
			return { message: 'Value converting' };
		}
	}
	// Subscription: {}
};
