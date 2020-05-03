import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
			<Header />
			<main>
				{data.arabics.map((value: any) => (
					<div key={value._id}>{value.arabic}</div>
				))}
			</main>
			<Footer />
		</div>
	);
}

export default App;
