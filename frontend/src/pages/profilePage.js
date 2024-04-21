import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ username }) {
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in local storage

    const config = {
      headers: { Authorization: `Token ${authToken}` }
    };

    // Fetch the user's profile
    axios.get(`http://127.0.0.1:8000/api/user/profile/${username}`, config)
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user profile:', response.status);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error.toString());
      });

    // Fetch the animals associated with the user
    axios.get(`http://127.0.0.1:8000/api/user/animals/${username}`, config)
      .then(response => {
        console.log('Animals data:', response.data); // Debugging line to check what you're actually getting
        if (response.status === 200 && response.data && Array.isArray(response.data)) {
          setAnimals(response.data);
        } else {
          console.error('Failed to fetch animals or data format incorrect:', response.status);
          setAnimals([]); // Ensure animals is always an array
        }
      })
      .catch(error => {
        console.error('Error fetching animals:', error.toString());
        setAnimals([]); // Error safe fallback
      });
  }, [username]);

  return (
    <div className="profile-page">
      {user ? (
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <p>Location: {user.location}</p>
          <p>Contact: {user.contact}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="animals-list">
        <h2>My Animals</h2>
        {animals.length > 0 ? (
          animals.map((animal, index) => (
            <div key={index} className="animal">
              <h5>{animal.name}</h5>
              <p>Type: {animal.type}</p>
              <p>Age: {animal.age}</p>
            </div>
          ))
        ) : (
          <p>No animals listed or error fetching animals.</p>
        )}
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const username = localStorage.getItem('username') || 'default-username';

  return (
    <div className="container">
      <h1>Profile Page for {username}</h1>
      <UserProfile username={username} />
    </div>
  );
};

export default ProfilePage;
