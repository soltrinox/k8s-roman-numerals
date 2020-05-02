import dotenv from 'dotenv';
import Path from 'path';

const path = Path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`);
dotenv.config({ path });

export default {
	port: parseInt(process.env.PORT),
	mongo: {
		port: process.env.MONGO_PORT,
		host: process.env.MONGO_HOST
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
