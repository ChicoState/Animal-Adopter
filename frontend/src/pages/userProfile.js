import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // Fetch user data from the API
    axios.get('/api/get_user_data') // Replace '/api/get_user_data' with your actual endpoint
      .then(response => {
        setUserData(response.data); // Update state with user data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {userData && (
        <div className="user-details">
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>Location: {userData.location}</p>
          {/* Render other user details as needed */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
