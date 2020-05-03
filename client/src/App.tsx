import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './App.css';

//TODO: add some scss with node sas and add some UX

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
			<header className="App-header">
				{data.arabics.map((value: any) => (
					<div key={value._id}>{value.arabic}</div>
				))}
			</header>
		</div>
	);
}

export default App;
