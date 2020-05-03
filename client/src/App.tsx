import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { gql } from 'apollo-boost';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Technologies from './Components/Technologies';

//TODO: this should go to a different file
//TODO: create a loader

const test = gql`
	{
		arabics {
			arabic
			_id
		}
	}
`;

function App() {
	const { loading, error, data } = useQuery(test);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="App">
			<Router>
				<Header />
				<main id="main">
					<Switch>
						<Route path="/technologies" exact component={Technologies} />
						<Route path="/home" component={Main} />
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
					</Switch>
				</main>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
