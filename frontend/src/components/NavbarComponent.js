import React, { useState } from 'react';
import { Nav, LogoImg, NavLink, NavMenu, WebsiteName } from './Navbar/NavbarElements';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing an example user icon
import Logo from '../logo/Logo.png';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const isUserNew = true; // Placeholder logic
    if (isUserNew) {
      navigate('/createProfile');
    } else {
      navigate('/');
    }
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <>
      <Nav>
        <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <LogoImg src={Logo} alt="Logo" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebsiteName>Animal Adopter</WebsiteName>
            <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
              <NavLink to="/adopt" activeClassName="active" className="nav-link">Adopt</NavLink>
              <NavLink to="/rehome" activeClassName="active" className="nav-link">Rehome</NavLink>
              <NavLink to="/createProfile" activeClassName="active" className="nav-link">Create Profile</NavLink>
              <FaUserCircle size="4em" onClick={() => setShowDropdown(!showDropdown)} style={{ position: 'absolute', right: '1%', top: '15%',color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
            </NavMenu>
            {showDropdown && (
              <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <GoogleLogin
                  clientId="301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com"
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                />
              </div>
            )}
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;