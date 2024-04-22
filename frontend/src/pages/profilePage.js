import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

function UserProfile({ username }) {
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: { Authorization: `Token ${authToken}` }
    };

    axios.get(`http://127.0.0.1:8000/api/user/profile/${username}`, config)
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user profile:', response.status);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error.toString());
      });

    axios.get(`http://127.0.0.1:8000/api/user/animals/${username}`, config)
      .then(response => {
        if (response.status === 200 && response.data) {
          setAnimals(response.data);
        } else {
          console.error('Failed to fetch animals:', response.status);
          setAnimals([]);
        }
      })
      .catch(error => {
        console.error('Error fetching animals:', error.toString());
        setAnimals([]);
      });
  }, [username]);

  const handleAnimalClick = (index) => {
    setSelectedAnimal(selectedAnimal === index ? null : index);
  };

  return (
    <div className="profile-page">
      {user ? (
        <div className="user-info-card">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-detail"><i className="fas fa-map-marker-alt"></i> {user.location}</p>
          <p className="user-detail"><i className="fas fa-envelope"></i> {user.contact}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="pet-list-container">
        <div className="pet-box-container">
          {animals.map((animal, index) => (
            <div key={index} className="pet-box" onClick={() => handleAnimalClick(index)}>
              <div className="top">
                <div className="image-container">
                  <img src={`http://127.0.0.1:8000${animal.image}`} alt={animal.type} />
                </div>
                <div className="pet-info">
                  <div className="name-gender">
                    <h5>{animal.name}</h5>
                    <div className="gender-img">
                      {animal.gender === "male" ? (
                        <img src={`http://127.0.0.1:8000/media/genderSymbols/male.png`} alt="male" />
                      ) : animal.gender === "female" ? (
                        <img src={`http://127.0.0.1:8000/media/genderSymbols/female.png`} alt="female" />
                      ) : (
                        <img src={`http://127.0.0.1:8000/media/genderSymbols/unknown.png`} alt="unknown" />
                      )}
                    </div>
                  </div>
                  <p>Breed: {animal.type}</p>
                  <p>Age: {animal.age}</p>
                  <p>Price: ${animal.price}</p>
                  <p>Location: {animal.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedAnimal !== null && (
          <div className="pet-panel show">
            <div className="pet-panel-content">
              <div className="top">
                <div className="image-container">
                  <img src={`http://127.0.0.1:8000${animals[selectedAnimal].image}`} alt={animals[selectedAnimal].type} />
                </div>
                <div className="pet-info">
                  <h5>{animals[selectedAnimal].name}</h5>
                  <p>Breed: {animals[selectedAnimal].type}</p>
                  <p>Age: {animals[selectedAnimal].age}</p>
                  <p>Price: ${animals[selectedAnimal].price}</p>
                  <p>Location: {animals[selectedAnimal].location}</p>
                  <p>Contact: {animals[selectedAnimal].contact}</p>
                  <p>Description: {animals[selectedAnimal].about}</p>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="adopt-button">Adopt</button>
              <button className="close-button" onClick={() => setSelectedAnimal(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const username = localStorage.getItem('username') || 'default-username';

  return (
    <div className="container">
      <UserProfile username={username} />
    </div>
  );
};

export default ProfilePage;
