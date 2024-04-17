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
    about: '',
    doesntLikeKids: '',
    doesntLikeMen: '',
    isEnergetic: '',
    isFixed: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else if(e.target.type === 'checkbox') {
      setFormData({ ...formData, [e.target.name]: e.target.checked ? "true" : "false" });
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
      <div className="form">
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Pet Information</h3>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <meta name="viewport" content="width=device-width, intitial-sacle=1.0"></meta>
            <label for="birthday">
              Animals birthday:
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
                <input type="radio" name="gender" value="unknown" checked={formData.gender === "unknown"} onChange={handleChange} /> Unknown
              </label>
            </div>
            <label>
              Price:
              <input type="text" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <label>
              Type:
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value = "" selected disabled hidden>Select Animal Type</option>
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
            <div className="special-needs">
              <label>
                Special Accommodations:
              </label> 
              <label>
                <input type="checkbox" name="doesntLikeKids" value="true" onChange={handleChange} /> Doesn't like kids.
              </label>
              <label>
                <input type="checkbox" name="doesntLikeMen" onChange={handleChange} /> Doesn't like men. 
              </label>
              <label>
                <input type="checkbox" name="isEnergetic" onChange={handleChange} /> Very Energetic.
              </label>
              <label>
                <input type="checkbox" name="isFixed" onChange={handleChange} /> Is Spayed or Nuetered.
              </label>
            </div>
            <label>
              About:
              <input type="text" name="about" value={formData.about} onChange={handleChange} />
            </label>
            <label>
              Image:
              <input type="file" name="image" onChange={handleChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </label>
            <label>
              Contact:
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </label>
          <button className="submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default YourFormComponent;
