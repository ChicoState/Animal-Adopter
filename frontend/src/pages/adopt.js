import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

function PetList({ pet }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePetClick = (index) => {
    setSelectedPet(selectedPet === index ? null : index);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? pet[selectedPet].images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === pet[selectedPet].images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="pet-list-container">
      <div className="pet-box-container">
        {pet.map((item, index) => (
          <div key={index} className="pet-box" onClick={() => handlePetClick(index)}>
            <div className="top">
              <div className="image-container">
                {item.images.length > 0 && (
                  <img src={`http://127.0.0.1:8000/media/${item.images[0].image}`} alt={item.type} />
                )}
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
                {/* Display the current image */}
                <img src={`http://127.0.0.1:8000/media/${pet[selectedPet].images[currentImageIndex].image}`} alt={pet[selectedPet].type} />
              </div>
              <div className="scroll">
                <button className="prev-button" onClick={handlePrevImage}>Previous</button>
                <button className="next-button" onClick={handleNextImage}>Next</button>
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
