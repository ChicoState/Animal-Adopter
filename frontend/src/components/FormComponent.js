import React, { useState } from 'react';
import axios from 'axios';

import './FormComponent.css';

const YourFormComponent = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    price: '',
    type: '',
    location: '',
    contact: '',
    name: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data" >
        <label>
          Name: 
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Birthdate: 
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </label>

        <label>
          Gender: 
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Default</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

        <label>
          Price: 
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>

        <label>
          Type: 
          <input type="text" name="type" value={formData.type} onChange={handleChange} />
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
          Image: 
          <input type="file" name="image" onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourFormComponent;
