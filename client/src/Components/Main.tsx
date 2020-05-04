import React, { useState, useEffect } from 'react';
import {
	useLazyQuery,
	useMutation,
	useSubscription,
} from '@apollo/react-hooks';
import { ArabicList, RomanList } from '../graphql/queries';
import {
	deleteAll as deleteMutation,
	convertToArabic,
	convertToRoman,
} from '../graphql/mutations';
import { numeralSubscription } from '../graphql/subscriptions';
import Loader from '../Components/Loader';

export default function Main() {
	const [tab, setTab] = useState('arabic'),
		[romanForm, setRomanForm] = useState(''),
		[calculatedValue, setCalculatedValue] = useState(''),
		[arabicForm, setArabicForm] = useState(''),
		[list, setList] = useState({ roman: [], arabic: [] }),
		[getArabic, { loading: loadingArabic, data: Arabic }] = useLazyQuery(
			ArabicList(100)
		),
		[getRoman, { loading: loadingRoman, data: Roman }] = useLazyQuery(
			RomanList(100)
		);

	let { data: subscriptionData } = useSubscription(numeralSubscription);

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
		if (subscriptionData) {
			setList({
				roman: list.roman.concat(subscriptionData.numeralComputation),
				arabic: list.arabic.concat(subscriptionData.numeralComputation),
			});

			showCalculation();
		}
	}, [subscriptionData]);

	useEffect(() => {
		if (Roman)
			setList({
				...list,
				roman: Roman.romans,
			});
	}, [Roman]);

	useEffect(() => {
		if (Arabic)
			setList({
				...list,
				arabic: Arabic.arabics,
			});
	}, [Arabic]);

	useEffect(() => {
		getArabic();
	}, []);

	function returnData(): any[] {
		return tab === 'arabic'
			? list.arabic.map((value: any) => (
					<span className="numerals" key={value._id}>
						{value.arabic}
					</span>
			  ))
			: list.roman.map((value: any) => (
					<span className="numerals" key={value._id}>
						{value.roman}
					</span>
			  ));
	}

	function showCalculation() {
		if (subscriptionData) {
			setCalculatedValue(subscriptionData.numeralComputation.arabic);
		}

		setTimeout(() => {
			setCalculatedValue('');
		}, 2000);
	}

	function isLoading() {
		return loadingArabic || loadingRoman;
	}

	function deleteNumerals() {
		deleteAll();
		setList({
			roman: [],
			arabic: [],
		});
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
			<div className="newValue">{calculatedValue}</div>
		</div>
	);
}