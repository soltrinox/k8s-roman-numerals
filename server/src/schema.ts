import { makeExecutableSchema } from 'apollo-server-fastify';
import { resolvers as numeralResolver, typeDef as numeralDef } from './Numerals';

export default makeExecutableSchema({
	typeDefs: [numeralDef],
	resolvers: { ...numeralResolver }
});
