import React, { useState, useEffect } from 'react';
import './App.css';
import Adopt from "./pages/adopt.js";
import Rehome from "./pages/rehome.js";
import axios from  'axios'

function App() {
	const [pet, setPet] = useState([]);

	useEffect(() => { 
		axios.get('http://localhost:3000/api/animalAdopter/models').then(res => {
			console.log(res)
			setPet(res.data.pet);
		});
	}, []);

	var petDetails = "";
	petDetails = pet.map( (item, index) => {
		return (
			<tr key={index}>
			<td>{item.name}</td>
			<td>{item.loc}</td>
			<td>{item.breed}</td>
			<td>{item.sex}</td>
			<td>{item.cost}</td>
			<td>{item.contact}</td>
			</tr>
		)
	});
	return (
		<body>
		<div className="App">
		<header className="App-header">	
		<div class="kitty">
		<img src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cq=85%2Cwidth=1200/wp-content/uploads/international-black-cat-awareness-month-e1575287719521.jpg" alt="alternatetext"></img>
		<div class="desc">
		<p>Name: {petDetails.item.name}</p>
		<p>Location: {petDetails.item.loc}</p>
		<p>Breed: {petDetails.item.breed}</p>
		<p>Sex: {petDetails.item.sex}</p>
		<p>Cost: {petDetails.item.cost}</p>
		<p>Contact: {petDetails.item.contact}</p>
		</div>
		</div>

		</header>
		</div>
		</body>
	);
}

export default App;
