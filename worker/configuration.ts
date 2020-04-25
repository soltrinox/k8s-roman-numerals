import dotenv from 'dotenv';
import Path from 'path';

const path = Path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`);
dotenv.config({ path });

export default {
	port: parseInt(process.env.PORT),
	redis: {
		port: parseInt(process.env.REDIS_PORT),
		host: process.env.REDIS_HOST,
		pass: process.env.PASS
	}
};
