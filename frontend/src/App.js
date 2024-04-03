import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AdoptPage from './pages/adopt';
import RehomePage from './pages/rehome';
import Navbar from './components/NavbarComponent';


import './App.css';

function PetList({ pet }) {
  return (
    <div className="pet-box-container">
      {pet.map((item, index) => (
        <div key={index} className="pet-box">
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
            <p>Contact: {item.contact}</p>
          </div>
          <div className="pet-description">
            <p>Tags: these will be tags of the pet</p>
            <p>Description: this will be a description of the pet</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
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

  console.log('Pet state:', pet); // Log the pet state

  return (
    <GoogleOAuthProvider clientId="301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com"> {}
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body" style={{ overflow: 'auto', paddingTop: '70px' }}>
                      <PetList pet={pet} />
                    </div>
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/adopt">
              <AdoptPage />
            </Route>
            <Route path="/rehome">
              <RehomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
