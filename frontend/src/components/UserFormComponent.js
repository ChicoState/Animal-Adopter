import React, { useState } from 'react';
import axios from 'axios';

import './UserFormComponent.css';

const UserFormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    contact: '',
    isShelter: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      console.log('Sending request...');
      const response = await axios.post('http://127.0.0.1:8000/api/animalAdopter/create_animal_model', data);
      console.log('Data saved successfully. Animal ID:', response.data.id);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="rehome-form-page">
      <div className="form">
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              Name: 
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>

            <label>
              Age: 
              <input type="text" name="age" value={formData.age} onChange={handleChange} />
            </label>

            <label>
              Gender: 
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
            </label>

            <label>
              Location: 
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </label>

            <label>
              Contact: 
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </label>

            <label>
              Is Shelter?: 
              <input type="text" name="isShelter" value={formData.isShelter} onChange={handleChange} />
            </label>
          <button type="submit">Submit</button>
        </form>
=======
    <div className="form-header" style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Add Your Information</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="user-form-page">
          <div className="form">
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3>User Information</h3>
              <label>
                Name: 
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>

              <label>
                Age: 
                <input type="text" name="age" value={formData.age} onChange={handleChange} />
              </label>

              <label>
                Gender: 
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
              </label>

              <label>
                Location: 
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
              </label>

              <label>
                Contact: 
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
              </label>

              <div className="is-shelter"> 
                <label>
                  Is this a shelter account? 
                  <input type="radio" name="isShelter" value="yes" checked={formData.isShelter === "yes"} onChange={handleChange} />Yes 
                </label>
                <label>
                  <input type="radio" name="isShelter" value="no" checked={formData.isShelter === "no"} onChange={handleChange} />No
                </label>
              </div>

              <button className="submit" type="submit">Submit</button>
            </form>
          </div>
        </div>
>>>>>>> b2c27b43c2005b09cebbf7ab00f50fbe87abc164
      </div>
    </div>
  );
};

export default UserFormComponent;