# Worker

The server responsible for doing the computation of arabic and roman numerals.

## Dependencies

This service has a dependency of Redis in order to run.

- dotenv "For loading different environmental variables"
- fastify "Web Server for exposing a simple api"
- fastify-cors "Middleware for allowing access from different origins"
- pino-pretty "A light logger"
- redis "For writing computed values and communicating with other services"

## Development

If you want to work on this service standalone you need to have a Redis running. You can either have it installed locally on your machine or you can run a docker container with Redis.

In docker-compose contained in root folder of this project you can run `docker-compose run redis`. It will start an already configured Redis container:

```yaml
redis:
  container_name: redis
  image: 'redis:4-alpine'
  command: redis-server --requirepass 123456
  ports:
    - '6379:6379'
```

If you want to debug the redis container you can get inside the container by running 
`docker exec -it redis sh` and from inside the container run the redis-cli by executing `redis-cli -a <password>`. The password for the docker-compose instance is `123456`.

From there you can run `monitor` and there you can see all the published messages.

## Configuration

Different configurations are loaded depending the environment you want to run. There are two files `.evn.dev` and `.env.prod` whose values are loaded from the `configuration.ts` and imported inside the project.


## Scripts

- `npm run test` For running Jest tests.
- `npm run tsc` For compiling typescript code the result code will be at /dist folder.
- `npm run clean` Delete /coverage and /dist folders.
- `npm run start:prod` Start server with production env.
- `npm run start:dev` Start server with development env.
