import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/`,
	options: {
		reconnect: true,
	},
});

const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	new HttpLink({
		uri: 'http://localhost:5000/graphql',
		credentials: 'same-origin',
	})
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
