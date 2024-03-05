import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FormComponent from './components/FormComponent';

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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Pet List</h4>
            </div>
            <div className="card-body">
            <FormComponent />
              {pet.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Price</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.map((item, index) => (
                      <tr key={index}>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.price}</td>
                        <td>{item.type}</td>
                        <td>{item.location}</td>
                        <td>
                          {item.image ? (
                          <img src={`/api/${item.image}`} alt={item.type} style={{ maxWidth: '200px' }} />
                          ) : (<p>No image available</p>
                          )}
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No pets available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
