import { ApolloServer } from 'apollo-server-fastify';
import fastify, { FastifyInstance } from 'fastify';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { MongoClient } from '@gkampitakis/mongo-client';
import cors from 'fastify-cors';
import schema from './schema';
import configuration from '../configuration';

class Server {
	private fastifyInstance: FastifyInstance;
	private apollo: ApolloServer;

	public constructor() {
		this.fastifyInstance = fastify({
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
		this.apollo = new ApolloServer({
			schema,
			subscriptions: {
				path: '/websocket'
			}
		});
		this.fastifyInstance.register(this.apollo.createHandler());
		this.fastifyInstance.register(cors, { origin: '*' });
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
		return this.fastifyInstance.listen(configuration.port, '0.0.0.0').then(() => {
			new SubscriptionServer(
				{
					execute,
					subscribe,
					schema
				},
				{ server: this.fastifyInstance.server }
			);
		});
	}
}

export default new Server();
