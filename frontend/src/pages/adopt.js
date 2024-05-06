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

function PetList({ pet }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [validImages, setValidImages] = useState([]);

  // Handle clicking on a pet
  const handlePetClick = (index) => {
    setSelectedPet(selectedPet === index ? null : index);
    if (index !== null) {
      const filteredImages = getValidImages(index);
      setValidImages(filteredImages);
      setCurrentImageIndex(0);  // Start with the first valid image
    }
  };

  // Fetch non-null images for a specific pet
  const getValidImages = (petIndex) => {
    return [
      pet[petIndex].image,
      pet[petIndex].image2,
      pet[petIndex].image3,
      pet[petIndex].image4,
      pet[petIndex].image5
    ].filter(img => img);  // Filter out falsy values (including null, undefined, "")
  }

  // Handle the next image navigation
  const handleNextImage = () => {
    if (validImages.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % validImages.length);
    }
  };

  // Handle the previous image navigation
  const handlePrevImage = () => {
    if (validImages.length > 0) {
      setCurrentImageIndex((currentImageIndex - 1 + validImages.length) % validImages.length);
    }
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
                <img src={`http://127.0.0.1:8000/media/${validImages[currentImageIndex]}`} alt={pet[selectedPet].type} />
                <div className='image-cycle'>
                  <button className="prev-button" onClick={handlePrevImage}>{"<"}</button>
                  <label> {currentImageIndex + 1} </label>
                  <button className="next-button" onClick={handleNextImage}>{">"}</button>
                </div>
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
                <p>Age: <TimeAgo date={pet[selectedPet].age} /></p>
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