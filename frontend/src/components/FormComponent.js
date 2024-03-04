// YourFormComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const YourFormComponent = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    price: '',
    type: '',
    location: '',
    contact: '',
    image: null, // Initialize the image field as null
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Age:
        <input type="text" name="age" value={formData.age} onChange={handleChange} />
      </label>

      <label>
        Gender:
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
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
         <input type="text" name="contact" value={formData.contact} onChang    e={handleChange} />
      </label>

      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
