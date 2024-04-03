import React, { useState } from 'react';
import axios from 'axios';

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
      </div>
    </div>
  );
};

export default UserFormComponent;