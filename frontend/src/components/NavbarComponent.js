import React from "react";
import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
import Logo from "../logo/Logo.png";

const Navbar = () => {
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
                <NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink>
              </NavMenu>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
