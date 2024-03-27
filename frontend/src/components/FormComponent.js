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
    specialNeeds: '',
    about: '',
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
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Name: 
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <meta name="viewport" content= "width=device-width, intitial-sacle=1.0"></meta>
        <label for="birthday"> 
          Select Animals birthday:
          <input type="date" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <div>
        <label>
          Gender: 
          <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
        </label>
        <label> 
          <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
        </label>
        <label>
          <input type="radio" name="gender" value="Unknown"checked={formData.gender === "unknown"} onChange={handleChange} /> Unknown
        </label>
        </div>
          <label>
            Price: 
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </label>
          <label>
            Type: 
            <input type="text" name="type" value={formData.type} onChange={handleChange} />
          </label>
        <label>
          Type: 
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rodent">Rodent</option>
            <option value="fish">Fish</option>
            <option value="bird">Bird</option>
            <option value="reptile">Reptile</option>
            <option value="horse">Horse</option>
            <option value="other">Other</option>
          </select>
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
        <label>
          Special Accommodations:
        </label> 
        <input type="checkbox" name="specialNeeds" value={formData.specialNeeds} onChange={handleChange} />
        <label> Doesn't like kids.</label>
        <input type="checkbox" name="specialNeeds" value={formData.specialNeeds} onChange={handleChange} />
        <label> Doesn't like men.</label>
        <input type="checkbox" name="specialNeeds" value={formData.specialNeeds} onChange={handleChange} />
        <label> Very Energetic.</label>
        <label>
          About: 
          <input type="text" name="about" value={formData.about} onChange={handleChange} />
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
