import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormComponent.css';

const YourFormComponent = () => {
  const initialFormData = {
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
    username: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setFormData(prevFormData => ({ ...prevFormData, username: storedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked ? "true" : "false" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/animalAdopter/create_animal_model', data);
      console.log('Data saved successfully. Animal ID:', response.data.id);
      setFormData(initialFormData);  // Clear form data after successful save
      setSuccessMessage('Animal information saved successfully!');  // Set success message
      setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
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
                <input type="checkbox" name="specialNeeds" value="true" onChange={handleChange} /> Doesn't like kids.
              </label>
              <label>
                <input type="checkbox" name="specialOne" onChange={handleChange} /> Doesn't like men. 
              </label>
              <label>
                <input type="checkbox" name="specialTwo" onChange={handleChange} /> Very Energetic.
              </label>
              <label>
                <input type="checkbox" name="specialThree" onChange={handleChange} /> Is Spayed or Nuetered.
              </label>
            </div>
            <label>
              About:
              <input type="text" name="about" value={formData.about} onChange={handleChange} />
            </label>
            <label>
              Image:
              <input type="file" name="image" onChange={handleChange} multiple />
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
