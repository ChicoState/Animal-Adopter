import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AdoptPage from './pages/adopt';
import RehomePage from './pages/rehome';
import LoginPage from './pages/login';
import Navbar from './components/NavbarComponent';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';

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
