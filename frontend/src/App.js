import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import axios from 'axios';
import AdoptPage from './pages/adopt';
import RehomePage from './pages/rehome';
import LoginPage from './pages/login';
import Navbar from './components/NavbarComponent';
import UserFormComponent from './components/UserFormComponent';
import './home.css';

function HomePage({ animalTypes }) {
  return (
    <div className="home-page-container">
      <h1>Browse Animals</h1>
      <div className="pet-option-container">
        {animalTypes.map((type, index) => (
          <div key={index} className="browse-options">
            <div className="top">
              <div>
                <h5>{type.option}</h5>
                <img src={`http://127.0.0.1:8000/media/homeImages/${type.value}.jpeg`} alt={type.option} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const animalTypes = [
  { option: 'Dogs', value: 'dog' },
  { option: 'Cats', value: 'cat' },
  { option: 'Rodents', value: 'rodent' },
  { option: 'Fish', value: 'fish' },
  { option: 'Birds', value: 'bird' },
  { option: 'Reptile', value: 'reptile' },
  { option: 'Horse', value: 'horse' },
  { option: 'Other', value: 'other' }
];

const clientId = "301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com";

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
    // Wrap your Router component with GoogleOAuthProvider
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage animalTypes={animalTypes} />} exact />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adopt" element={<AdoptPage />} />
            <Route path="/rehome" element={<RehomePage />} />
            <Route path="/createProfile" element={<UserFormComponent />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
