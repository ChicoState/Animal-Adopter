import React from "react";
import { Nav, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <WebsiteName>Animal Adopter</WebsiteName>
        <Bars />
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavMenu>
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/adopt">Adopt</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rehome">Rehome</NavLink>
            </li>
          </NavMenu>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
