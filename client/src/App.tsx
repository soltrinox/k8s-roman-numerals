import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Technologies from './Components/Technologies';

function App() {
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
