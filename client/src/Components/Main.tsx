import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { ArabicList, RomanList } from '../graphql/queries';
import Loader from '../Components/Loader';

export default function Main() {
	const [tab, setTab] = useState('arabic');

	const [getArabic, { loading: loadingArabic, data: Arabic }] = useLazyQuery(
		ArabicList(5)
	);
	const [getRoman, { loading: loadingRoman, data: Roman }] = useLazyQuery(
		RomanList(5)
	);

	function isActive(name: string): string {
		return tab === name ? 'active' : '';
	}

	function selectTab(name: string): void {
		setTab(name);
		name === 'arabic' ? getArabic() : getRoman();
	}

	useEffect(() => {
		getArabic();
	}, []);

	function returnData(): any[] {
		return tab === 'arabic'
			? Arabic?.arabics.map((value: any) => (
					<div className="numerals" key={value._id}>
						{value.arabic}
					</div>
			  ))
			: Roman?.romans.map((value: any) => (
					<div className="numerals" key={value._id}>
						{value.roman}
					</div>
			  ));
	}

	function isLoading() {
		return loadingArabic || loadingRoman;
	}

	return (
		<div className="home">
			<div className="tabs">
				<button
					className={`tabLink ${isActive('arabic')}`}
					onClick={() => selectTab('arabic')}
				>
					Arabic
				</button>
				<button
					className={`tabLink ${isActive('roman')}`}
					onClick={() => selectTab('roman')}
				>
					Roman
				</button>
				<button className="delete">Delete All</button>
			</div>
			<div className="content">{isLoading() ? <Loader /> : returnData()}</div>
			<div className="form"></div>
		</div>
	);
}

//TODO: make it scrollable
//TODO: add subscription
//TODO: add delete all functionality
//TODO: add forms for calculating values
