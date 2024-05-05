import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnimalListPage({ animalType }) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/animals/${animalType}`)
      .then(response => {
        console.log('Axios Response:', response);

        if (response.status === 200) {
          console.log('Data from the server:', response.data);
          setAnimals(response.data.animals);
        } else {
          console.error('Request failed with status code:', response.status);
        }
      })
      .catch(error => {
        console.error('Axios error:', error.response ? error.response.data : error.message);
      });
  }, [animalType]);

  console.log('Animals:', animals); // Log animals

  return (
    <div>
      <h2>{animalType}</h2>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnimalListPage;
