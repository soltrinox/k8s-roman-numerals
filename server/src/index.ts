import { ApolloServer, gql } from 'apollo-server-fastify';
import fastify, { FastifyInstance } from 'fastify';
import schema from './schema';

class Server {
	private server: FastifyInstance;
	private apollo: ApolloServer;

	public constructor() {
		this.server = fastify({
			logger: {
				prettyPrint: {
					colorize: true,
					ignore: 'pid,hostname,time'
				}
			}
		});
		this.setupServer();
	}

	private setupServer() {
		this.apollo = new ApolloServer({ schema });
		this.server.register(this.apollo.createHandler());
	}

	public start(port: number) {
		return this.server.listen(port, '0.0.0.0');
	}
}

export default new Server();

// .
// ├── package.json
// └── src
//     ├── books
//     │   ├── Book.js
//     │   ├── data.js
//     │   ├── index.js
//     │   ├── resolvers.js
//     │   └── typeDef.js
//     └── index.js
