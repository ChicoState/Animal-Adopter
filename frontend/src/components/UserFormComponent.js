import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory(); // Initialize useHistory for navigation

  useEffect(() => {
    // Redirect or disable form if not authenticated
    if (!localStorage.getItem('token')) {
      setError('You must be logged in to submit this form.');
      history.push('/login'); // Redirect to login page
    }
  }, [history]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`  // Ensure token is being sent for authorization
        }
    };

    try {
        console.log('Sending request...');
        const response = await axios.post('http://127.0.0.1:8000/api/user_profile/', formData, config);
        console.log('Data saved successfully:', response.data);
        setSuccess('Profile updated successfully!');
        setFormData({
            name: '',
            age: '',
            gender: '',
            location: '',
            contact: '',
            isShelter: ''
        });
        history.push('/');
    } catch (error) {
        console.error('Error saving data:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail : "Failed to submit the form. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-header" style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Add Your Information</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="user-form-page">
          <div className="form">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              <button className="submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {success && <div className="success-message">{success}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormComponent;
