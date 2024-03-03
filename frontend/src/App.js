import React, { useState, useEffect } from 'react';
import './App.css';
import Adopt from "./pages/adopt.js";
import Rehome from "./pages/rehome.js";
import axios from 'axios';

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
			<td>{item.age}</td>
			<td>{item.gender}</td>
			<td>{item.price}</td>
			<td>{item.type}</td>
			<td>{item.loc}</td>
			<td>{item.image}</td>	
			</tr>
		)
	});
	return (
		<div className="container">
		<div className="row">
		<div className="col-md-12">
		<div className="card">
		<div className="card-header">
		<h4>Pet List</h4>
		</div>
		<div className="card-body">
		<table className="table table-striped">
		<thead>
		<tr>
		<th>Age</th>
		<th>Gender</th>
		<th>Price</th>
		<th>Type</th>
		<th>Location</th>
		<th>Image</th>
		</tr>
		</thead>
		<tbody>
		{petDetails}
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		</div>
	);
}

export default App;
