import React, { useState } from 'react';
import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
import { FaUserCircle } from 'react-icons/fa';
import Logo from "../logo/Logo.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <Nav>
        <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <LogoImg src={Logo} alt="Logo" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebsiteName>Animal Adopter</WebsiteName>
            <Bars />
            <div className="collapse navbar-collapse" id="navbarNav">
              <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
                <NavLink to="/adopt" activeClassName="active" className="nav-link">Adopt</NavLink>
                <NavLink to="/rehome" activeClassName="active" className="nav-link">Rehome</NavLink>
                <FaUserCircle size="4em" onClick={() => setShowDropdown(!showDropdown)} style={{ position: 'absolute', right: '1%', top: '15%',color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
              </NavMenu>
              {showDropdown && (
              <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <NavLink to="/login" activeClassName="active" className="nav-link">Login/Logout</NavLink>
                <NavLink to="/profilePage" activeClassName="active" className="nav-link">Your Profile</NavLink>
              </div>
            )}
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
