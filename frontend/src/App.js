import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import FormComponent from './components/FormComponent';
import AdoptPage from './pages/adopt';
import RehomePage from './pages/rehome';

function PetList({ pet }) {
  return (
    <div>
      {pet.map((item, index) => (
        <div key={index} className="pet-box">
          <h5>{item.type}</h5>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Price: {item.price}</p>
          <p>Location: {item.location}</p>
          {item.image ? (
            <img src={`http://127.0.0.1:8000/api/${item.image}`} alt={item.type} style={{ maxWidth: '200px' }} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      ))}
    </div>
  );
}

function About() {
  return <h2>About Page</h2>;
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
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Pet Adoption</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adopt">Adopt</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rehome">Rehome</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Pet List</h4>
                  </div>
                  <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                    <FormComponent />
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
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
