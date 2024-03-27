import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
  position: fixed;
  background: #58728a;
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 12;
  width: 97.5%;
`;

export const WebsiteName = styled.h1`
  color: #c8bdb7; /* Change the color to your preference */
  font-size: 24px; /* Adjust the font size to your preference */
  margin-right: 20px; /* Add some right margin for spacing */
`;

export const NavLink = styled(Link)`
  color: #c8bdb7;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #f9f5e9;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #c8bdb7;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 0;
    flex-wrap: wrap;
  }
`;
