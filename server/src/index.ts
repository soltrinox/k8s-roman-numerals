import { ApolloServer } from 'apollo-server-fastify';
import fastify, { FastifyInstance } from 'fastify';
import schema from './schema';
import configuration from '../configuration';
import { MongoClient } from '@gkampitakis/mongo-client';

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
		this.setupMongo();
	}

	private setupServer() {
		this.apollo = new ApolloServer({ schema });
		this.server.register(this.apollo.createHandler());
	}

	private setupMongo() {
		const { host, port } = configuration.mongo;
		MongoClient.connect(`${host}:${port}`, 'numerals', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
			.then(() => console.log('Connected to database'))
			.catch((err) => {
				console.log(err);
				process.exit(1);
			});
	}

	public start() {
		return this.server.listen(configuration.port, '0.0.0.0');
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
