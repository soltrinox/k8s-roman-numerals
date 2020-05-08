# Gateway server

This server will be responsible for communicating with react client/ worker / mongo and redis.

## Overview

This server accepts requests for retrieving all the computed Roman / Arabic numerals, forwards requests to [Workrer](../worker/README.md) for computing a specific roman or arabic numeral and notifying the client for a new computed value through graphql subscriptions.

## Dependencies

- @gkampitakis/mongo-client "For communicating with Mongodb"
- dotenv "For loading different environmental variables"
- fastify "Web Server for exposing a simple api"
- fastify-cors "Middleware for allowing access from different origins"
- pino-pretty "A light logger"
- redis "For receiving calculated values from worker"
- graphql "For setting up GraphQL api"
- graphql-redis-subscriptions "For GraphQL subscriptions"
- node-fetch "For sending requests to worker"
- subscriptions-transport-ws "For creating websockets and communicating with client"

## Configuration

Different configurations are loaded depending the environment you want to run. There are two files `.evn.dev` and `.env.prod` whose values are loaded from the `configuration.ts` and imported inside the project.

## Development

If you want to work on this service standalone you need to have Redis,Mongodb and worker running. You can either have all of them running locally or you can you use the `docker-compose.yml` file located on the root of this project and run all the needed services.

If you run in development mode you can have access on the route `/graphql` to the GraphQL playground where you can run graphql requests.

## GraphQL Schema

```javascript

type Arabic {
  _id: String!
  arabic: Int!
}

type ConvertArabicResult {
  result: Arabic
  error: Boolean
  message: String!
}

type ConvertRomanResult {
  error: Boolean
  result: Roman
  message: String!
}

type Message {
  message: String!
}

type Mutation {
  deleteAll: Message!
  convertToRoman(value: Int!): ConvertRomanResult
  convertToArabic(value: String!): ConvertArabicResult
}

type Query {
  arabics(limit: Int, skip: Int): [Arabic]
  romans(limit: Int, skip: Int): [Roman]
}

type Roman {
  _id: String!
  roman: String!
}

type Subscription {
		numeralComputation {
			arabic
			roman
			_id
		}
	}

```

## Scripts

- `npm run test` For running Jest tests.
- `npm run tsc` For compiling typescript code the result code will be at /dist folder.
- `npm run clean` Delete /coverage and /dist folders.
- `npm run start:prod` Start server with production env.
- `npm run start:dev` Start server with development env.
