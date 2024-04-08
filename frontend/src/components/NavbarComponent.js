// import React from "react";
// import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
// import Logo from "../logo/Logo.png";

// const Navbar = () => {
//   return (
//     <>
//       <Nav>
//         <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
//           <LogoImg src={Logo} alt="Logo" />
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <WebsiteName>Animal Adopter</WebsiteName>
//             <Bars />
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
//                 <NavLink to="/adopt" activeClassName="active" className="nav-link">Adopt</NavLink>
//                 <NavLink to="/rehome" activeClassName="active" className="nav-link">Rehome</NavLink>
//                 <NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink>
//               </NavMenu>
//             </div>
//           </div>
//         </div>
//       </Nav>
//     </>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Nav, LogoImg, NavLink, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
import Logo from "../logo/Logo.png";
import { GoogleLogin } from '@react-oauth/google';
import { FaUser } from 'react-icons/fa';
import "../App.css"
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle successful login
  const handleLoginSuccess = credentialResponse => {
    console.log(credentialResponse);
    setIsLoggedIn(true);
    setShowDropdown(false); // Close dropdown after successful login
  };

  return (
    <>
      <Nav>
        <div className="navbar-container">
          <div className="navbar-components-container">
            <div className="logo-container">
              <LogoImg src={Logo} alt="Logo" />
              <WebsiteName>Animal Adopter</WebsiteName>
            </div>
            <NavMenu>
              <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
              <NavLink to="/adopt" activeClassName="active" className="nav-link">Adopt</NavLink>
              <NavLink to="/rehome" activeClassName="active" className="nav-link">Rehome</NavLink>
            </NavMenu>
          </div>
          <div className="navbar-right">
            <div className="user-icon-button" onClick={toggleDropdown}>
              <FaUser style={{ fontSize: '32px', color: 'white' }} />
             </div>
            {showDropdown && (
              <div className="dropdown-menu">
                {!isLoggedIn && (
                  <GoogleLogin
                    clientId="301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com"
                    redirectUri="http://localhost:3000"
                    onSuccess={handleLoginSuccess}
                    onError={error => {
                      console.log('Login Failed:', error);
                    }}
                    render={({ onClick }) => <button className="nav-link" onClick={onClick}>Login with Google</button>}
                  />
                )}
                {/* Additional items can be added for logged-in users */}
              </div>
            )}
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
