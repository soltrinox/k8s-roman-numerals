import Controller from './controller';
import { gql } from 'apollo-server-fastify';
import RedisClient from '../../Components/RedisClient/client';

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
		convertToRoman: (_, { value }, __, ___) => Controller.convertToRoman(value),
		convertToArabic: (_, { value }, __, ___) => Controller.convertToArabic(value)
	},
	Subscription: {
		numeralComputation: {
			subscribe: () => RedisClient.asyncIterator('new_value')
		}
	}
};

export const typeDef = gql`
	type ConvertRomanResult {
		error: Boolean
		result: Roman
		message: String!
	}

	type ConvertArabicResult {
		result: Arabic
		error: Boolean
		message: String!
	}

	type Arabic {
		_id: String!
		arabic: Int!
	}

	type Roman {
		_id: String!
		roman: String!
	}

	type Message {
		message: String!
	}

	type Query {
		arabics(limit: Int, skip: Int): [Arabic]
		romans(limit: Int, skip: Int): [Roman]
	}

	type Mutation {
		deleteAll: Message!
		convertToRoman(value: Int!): ConvertRomanResult
		convertToArabic(value: String!): ConvertArabicResult
	}

	type Subscription {
		numeralComputation: subscriptionPayload
	}

	type subscriptionPayload {
		arabic: Int
		roman: String
		_id: String
	}
`;
