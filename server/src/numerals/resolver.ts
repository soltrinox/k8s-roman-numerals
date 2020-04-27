import Controller from './controller';

export const resolvers = {
	Query: {
		arabics: (_, { limit, skip }, __, ___) => Controller.retrieve('arabic', limit, skip),
		romans: (_, { limit, skip }, __, ___) => Controller.retrieve('roman', limit, skip)
	},
	Mutation: {
		deleteAll: async () => {
			try {
				await Controller.deleteAll();
				return { message: 'Deleting everything' };
			} catch (error) {
				return { message: error.message };
			}
		},
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
