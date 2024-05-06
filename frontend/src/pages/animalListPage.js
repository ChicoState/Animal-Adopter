import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

class TimeAgo extends React.Component {
  calculateTimeAgo(date) {
    const currentDate = new Date();
    const pastDate = new Date(date);

    const timeDifference = currentDate - pastDate;

    const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    const monthsAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    return { years: yearsAgo, months: monthsAgo };
  }

  render() {
    const { date } = this.props;
    const { years, months } = this.calculateTimeAgo(date);

    if (years > 0) {
      return (
        <div>
          <p>{years} year{years !== 1 ? 's' : ''}</p>
          <p>{months} month{months !== 1 ? 's' : ''} old</p>
        </div>
      );
    } else if (months > 0) {
      return <p>{months} month{months !== 1 ? 's' : ''} old</p>;
    } else {
      return <p>&lt; 1 month old</p>;
    }
  }
}

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

  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetClick = (index) => {
    setSelectedPet(selectedPet === index ? null : index);
  };

  return (
    <div className="pet-list-container" style={{ paddingTop: '70px' }}>
      <div className="pet-box-container">
        {animals.map((item, index) => (
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
              <p>Age: <TimeAgo date={item.age} /></p>
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
                <img src={`http://127.0.0.1:8000/media/${animals[selectedPet].image}`} alt={animals[selectedPet].type} />
              </div>
              <div className="pet-info">
                <div className="name-gender">
                  <h5>{animals[selectedPet].name}</h5>
                  <div className="gender-img">
                    {animals[selectedPet].gender === "male" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/male.png`} alt={animals[selectedPet].gender} />
                    ) : animals[selectedPet].gender === "female" ? (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/female.png`} alt={animals[selectedPet].gender} />
                    ) : (
                      <img src={`http://127.0.0.1:8000/media/genderSymbols/unknown.png`} alt={animals[selectedPet].gender} />
                    )}
                  </div>
                </div>
                <p>Breed: {animals[selectedPet].type}</p>
                <p>Age: <TimeAgo date={animals[selectedPet].age} /></p>
                <p>Price: ${animals[selectedPet].price}</p>
                <p>Location: {animals[selectedPet].location}</p>
                <p>Contact: {animals[selectedPet].contact}</p>
                <p>Tags: tags</p>
                <p>Description: {animals[selectedPet].about}</p>
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

export default AnimalListPage;
