import Controller from './controller';

export const resolvers = {
	Query: {
		arabics: () => [],
		romans: () => []
	},
	Mutation: {
		deleteAll: () => ({ message: 'Everything deleted' }),
		convertToRoman(_, { value }, __, ___) {
			Controller.convertToRoman(value);
			return { message: 'Value converting' };
		},
		convertToArabic: (_, args, __, ___) => {
			return { message: 'Value converting' };
		}
	}
	// Subscription: {}
};
