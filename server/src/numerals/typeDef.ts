import { gql } from 'apollo-server-fastify';

export const typeDef = gql`
	type Arabic {
		_id: String!
		value: Int!
		roman: String!
	}

	type Roman {
		_id: String!
		value: String!
		arabic: Int!
	}

	type Message {
		message: String!
	}

	type Query {
		arabics: [Arabic]
		romans: [Roman]
	}

	type Mutation {
		deleteAll: Message!
		convertToRoman(value: Int!): Message!
		convertToArabic(value: String!): Message!
	}
`;
