import React from "react";
import { Nav, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <WebsiteName>Animal Adopter</WebsiteName>
        <Bars />
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <NavLink to="/" style={{ padding: '15px' }}>Home</NavLink>
            <NavLink to="/adopt" style={{ padding: '15px' }}>Adopt</NavLink>
            <NavLink to="/rehome" style={{ padding: '15px' }}>Rehome</NavLink>
          </NavMenu>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
