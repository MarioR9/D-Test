import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
	const [ list, setList ] = useState([]);
	const [ disabled, setDisabled ] = useState(true);
	const [ string, setString ] = useState('');
	const [ result, setResult ] = useState('');
	useEffect(() => {
		//axios.get('https://pokeapi.co/api/v2/pokemon?limit=9').then((response) => {
		//	setList(response.data.results);
		//	});
		const fetchData = async () => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5`);
			const data = await response.json();
			setList(data.results);
		};
		fetchData();
	}, []);

	const handleString = (e) => {
		setString(e.target.value);
	};

	const handleNextPage = async () => {
		//limit10 acts as page
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
		const data = await response.json();
		setList(data.results);
	};
	const handlePreviousPage = async () => {
		//limit20 acts as page
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
		const data = await response.json();
		setList(data.results);
	};
	const handleDisabledPages = () => {
		setDisabled(!disabled);
	};
	const test = () => {
		let a = string;
		let newStr = '';
		let result = '';
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let alpbe1 = alphabet.split('');
		let letters = a.split('');
		newStr = alpbe1 = alpbe1.filter((val) => !letters.includes(val));
		const randomCharacter = newStr[Math.floor(Math.random() * newStr.length)];
		result = a.replace(/[?]/g, function() {
			return randomCharacter;
		});
		setResult(result);
	};
	return (
		<div>
			<div style={{ border: 'solid', padding: '2%' }}>
				<h4>Algo test</h4>
				<p style={{ color: 'grey', fontSize: '11px' }}>
					replace ? with a random letter that is not part of the entered string
				</p>
				<input onChange={handleString} placeholder="ex: te?s?tz?" />
				<button onClick={test}>Try!</button>
				<p>{result}</p>
			</div>
			<table style={{ padding: '2%' }}>
				<tr>
					<th>Name</th>
					<th>Url</th>
				</tr>
				{list.map((list) => (
					<tr>
						<td key={list.id}>{list.name} </td>
						<td key={list.id}>{list.url} </td>
					</tr>
				))}
			</table>
			<button onClick={handleDisabledPages}>enabled/disabled BTNS</button>
			<button disabled={disabled} onClick={handlePreviousPage}>
				previos Page
			</button>
			<button>
				<a href="/">refresh</a>
			</button>
			<button disabled={disabled} onClick={handleNextPage}>
				Next Page
			</button>
		</div>
	);
};

export default Main;
