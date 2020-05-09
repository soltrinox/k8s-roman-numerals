import dotenv from 'dotenv';
import Path from 'path';

const path = Path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`);
dotenv.config({ path });

export default {
	port: parseInt(process.env.PORT),
	mongo: {
		port: parseInt(process.env.MONGO_PORT),
		host: process.env.MONGO_HOST,
		user: process.env.MONGO_USER,
		password: process.env.MONGO_PASS
	},
	redis: {
		port: parseInt(process.env.REDIS_PORT),
		host: process.env.REDIS_HOST,
		pass: process.env.PASS
	},
	worker: {
		host: process.env.WORKER_HOST
	}
};
