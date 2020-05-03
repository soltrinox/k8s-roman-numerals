import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Header(props: any) {
	const history = useHistory();

	function goHome() {
		history.push('/home');
	}

	return (
		<header className="header">
			<h1 className="title" onClick={goHome}>
				Arabic-Roman Numerals
			</h1>
			<div className="navigation">
				<Link to="/Home" type="button">
					Home
				</Link>
				<Link to="/technologies" type="button">
					About
				</Link>
			</div>
		</header>
	);
}
