import Server from './src';
import configuration from './configuration';

Server.start(configuration.port).catch((err) => console.log(err));
