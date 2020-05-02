# Gateway server

This server will be responsible for communicating with react client/ worker / mongo and redis.


## Overview 

This server accepts requests for retrieving all the computed Roman / Arabic numerals, forwards requests to [Workrer](../worker/README.md) for computing a specific roman or arabic numeral and notifying the client for a new computed value through graphql subscriptions.

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


```

## Development

Not finished yet