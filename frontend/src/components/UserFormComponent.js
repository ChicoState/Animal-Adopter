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
    e.preventDefault();  // Prevent the default form submission behavior
    console.log('Submit button clicked');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`  // Retrieve the token from local storage or your state management solution
        }
    };

    try {
        console.log('Sending request...');
        const response = await axios.post('http://127.0.0.1:8000/api/user_profile/', formData, config);
        console.log('Data saved successfully:', response.data);

        // Clear form data after successful submission
        setFormData({
            name: '',
            age: '',
            gender: '',
            location: '',
            contact: '',
            isShelter: ''
        });

    } catch (error) {
        console.error('Error saving data:', error.response ? error.response.data : error);
    }
};

  return (
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
      </div>
    </div>
  );
};

export default UserFormComponent;