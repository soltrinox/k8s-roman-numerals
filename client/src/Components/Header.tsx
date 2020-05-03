import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props: any) {
	return (
		<header className="header">
			<h1 className="title">Arabic-Roman Numerals</h1>
			<div className="navigation">
				<Link to="/technologies" type="button">
					About
				</Link>
			</div>
		</header>
	);
}
