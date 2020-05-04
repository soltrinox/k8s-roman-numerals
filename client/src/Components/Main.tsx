import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ArabicList, RomanList } from '../graphql/queries';
import {
	deleteAll as deleteMutation,
	convertToArabic,
	convertToRoman,
} from '../graphql/mutations';
import Loader from '../Components/Loader';

export default function Main() {
	const [tab, setTab] = useState('arabic');
	const [romanForm, setRomanForm] = useState('');
	const [arabicForm, setArabicForm] = useState('');

	const [getArabic, { loading: loadingArabic, data: Arabic }] = useLazyQuery(
		ArabicList(100)
	);
	const [getRoman, { loading: loadingRoman, data: Roman }] = useLazyQuery(
		RomanList(100)
	);

	const [deleteAll] = useMutation(deleteMutation()),
		[calculateRoman] = useMutation(convertToRoman),
		[calculateArabic] = useMutation(convertToArabic);

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
					<span className="numerals" key={value._id}>
						{value.arabic}
					</span>
			  ))
			: Roman?.romans.map((value: any) => (
					<span className="numerals" key={value._id}>
						{value.roman}
					</span>
			  ));
	}

	function isLoading() {
		return loadingArabic || loadingRoman;
	}

	function deleteNumerals() {
		deleteAll();
		Arabic.arabics = [];
		if (Roman) Roman.romans = [];
	}

	function handleChange(type: string, e: any) {
		if (type === 'arabic') {
			return setArabicForm(e.target.value);
		}
		setRomanForm(e.target.value);
	}

	function submitRoman() {
		if (!romanForm) return;

		calculateRoman({ variables: { value: parseInt(romanForm) } });

		setRomanForm('');
	}

	function submitArabic() {
		if (!arabicForm) return;

		calculateArabic({ variables: { value: arabicForm } });

		setArabicForm('');
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
				<button className="delete" onClick={deleteNumerals}>
					Delete All
				</button>
			</div>
			<div className="content">{isLoading() ? <Loader /> : returnData()}</div>
			<div className="forms">
				<div className="formWrapper">
					<h3>Calculate Arabic</h3>
					<div className="form">
						<label>Roman Value</label>
						<input
							value={arabicForm}
							onChange={(e) => handleChange('arabic', e)}
							type="text"
						/>
						<button onClick={submitArabic}>Submit</button>
					</div>
				</div>
				<div className="formWrapper">
					<h3>Calculate Roman</h3>
					<div className="form">
						<label>Arabic Value</label>
						<input
							value={romanForm}
							onChange={(e) => handleChange('roman', e)}
							type="number"
						/>
						<button onClick={submitRoman}>Submit</button>
					</div>
				</div>
			</div>
			<div className="newValue">70</div>
		</div>
	);
}

//TODO: add subscription
//TODO: verify on forms
//Error handling 