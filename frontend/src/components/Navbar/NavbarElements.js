import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
  position: relative;
  margin-bottom: -40px;
  background: #00524c;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 12;
  width: 97.5%;
  font-family: 'SiteFont';
  font-weight: normal;
`;

export const WebsiteName = styled.h1`
  color: #dfeeeb; /* Change the color to your preference */
  font-size: 30px; /* Adjust the font size to your preference */
  margin-top: 15px;
  margin-left: 10px;
  font-family: 'SiteFont';
  font-weight: bold;
`;

export const LogoImg = styled.img`
  height: 60px;
  width: auto;
  margin-right: 10px;
`;

export const NavLink = styled(Link)`
  color: #dfeeeb;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-family: 'SiteFont';
  font-weight: normal;
  padding: 5px 10px;
  margin: -3px;
  background: #529873;
  border: 3px solid #529873;
  border-bottom: none;
  &.active {
    color: #529873;
    background: #dfeeeb;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #aabce9c;
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
  margin-top: -14px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 0;
    flex-wrap: wrap;
  }
`;