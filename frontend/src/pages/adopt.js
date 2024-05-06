import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

/*
function TagDisplay({ tags }) {
  const trueTags = Object.entries(tags).filter(([tag, value]) => value = true).map(([tag, value]) => tag);

  const tags = {
    //add tags here
    
  };

  return (
    <p>
      {trueTags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </p>
  );
}
*/

function TagDisplay({ tags }) {
  // Ensure tags is an object or default to an empty object
  const tagKeys = tags ? Object.keys(tags) : [];

  // Extract tag names where the value is true
  const trueTags = tagKeys.filter(tag => tags[tag] === true);

  return (
    <div>
      {trueTags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </div>
  );
}


function PetList({ pet }) {
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetClick = (index) => {
    setSelectedPet(selectedPet === index ? null : index);
  };

  return (
    <div className="pet-list-container">
      <div className="pet-box-container">
        {pet.map((item, index) => (
          <div key={index} className="pet-box" onClick={() => handlePetClick(index)}>
            <div className="top">
              <div className="image-container">
                <img src={`http://127.0.0.1:8000/media/${item.image}`} alt={item.type} />
              </div>
              <div className="pet-info">
                <div className="name-gender">
                  <h5>{item.name}</h5>
                  <div className="gender-img">
                    {item.gender === "male" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/male.png`} alt={item.gender} />
                    ) : item.gender === "female" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/female.png`} alt={item.gender} />
                    ) : (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/unknown.png`} alt={item.gender} />
                    )}
                  </div>
                </div>
              </div>
              <p>Breed: {item.type}</p>
              <p>Age: {item.age}</p>
              <p>Price: ${item.price}</p>
              <p>Location: {item.location}</p>

            </div>
          </div>
        ))}
      </div>
      {/* Popup panel */}
      {selectedPet !== null && (
        <div className="pet-panel show">
          <div className="pet-panel-content">
            <div className="top">
              <div className="image-container">
                <img src={`http://127.0.0.1:8000/media/${pet[selectedPet].image}`} alt={pet[selectedPet].type} />
              </div>
              <div className="pet-info">
                <div className="name-gender">
                  <h5>{pet[selectedPet].name}</h5>
                  <div className="gender-img">
                    {pet[selectedPet].gender === "male" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/male.png`} alt={pet[selectedPet].gender} />
                    ) : pet[selectedPet].gender === "female" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/female.png`} alt={pet[selectedPet].gender} />
                    ) : (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/unknown.png`} alt={pet[selectedPet].gender} />
                    )}
                  </div>
                </div>
                <p>Breed: {pet[selectedPet].type}</p>
                <p>Age: {pet[selectedPet].age}</p>
                <p>Price: ${pet[selectedPet].price}</p>
                <p>Location: {pet[selectedPet].location}</p>
                <p>Contact: {pet[selectedPet].contact}</p>
                <p>Tags: tags</p>
                <p>Description: {pet[selectedPet].about}</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="adopt-button" >Adopt</button>
            <button className="close-button" onClick={() => setSelectedPet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}



const RehomeFormPage = () => {
  const [pet, setPet] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/animalAdopter/models')
      .then(response => {
        console.log('Axios Response:', response);

        if (response.status === 200) {
          console.log('Data from the server:', response.data);
          setPet(response.data.pet);
        } else {
          console.error('Request failed with status code:', response.status);
        }
      })
      .catch(error => {
        console.error('Axios error:', error.response ? error.response.data : error.message);
      });
  }, []);

  console.log('Pet state:', pet);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body" style={{ overflow: 'auto', paddingTop: '70px' }}>
            <PetList pet={pet} /> { }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehomeFormPage;
