import React, { useState, useEffect } from 'react';
import FormComponent from '../components/FormComponent';
import { NavLink } from "../components/Navbar/NavbarElements";

import './rehome.css';

const RehomeFormPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        setIsLoggedIn(!!localStorage.getItem('token'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="form-header" style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Add a Pet to be Adopted</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {isLoggedIn ? (
          <FormComponent />
        ) : (
          <NavLink to="/login" activeClassName="active" className="nav-link" style={{
            display: 'inline-block',
            padding: '10px 20px',
            margin: '20px 0',
            backgroundColor: '#52987f',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '18px',
            textAlign: 'center', // Center the text inside the button
            border: 'none', // Remove any default border
            cursor: 'pointer', // Make it look clickable
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Optional: add a shadow for better button-like appearance
            transition: 'all 0.3s' // Smooth transition for hover effects
          }}>Login to add a pet</NavLink>
        )}
      </div>
    </div>
  );
};

export default RehomeFormPage;
