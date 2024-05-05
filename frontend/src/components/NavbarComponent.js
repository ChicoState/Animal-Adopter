// import React, { useState, useEffect } from 'react';
// import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
// import { FaUserCircle } from 'react-icons/fa';
// import Logo from "../logo/Logo.png";

// const Navbar = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('token');
//       setIsLoggedIn(!!token);
//     };

//     // Polling localStorage every 1000 milliseconds (1 second)
//     const intervalId = setInterval(checkLogin, 1000);

//     // Listen for changes in localStorage across tabs
//     const handleStorageChange = (event) => {
//       if (event.key === 'token') {
//         checkLogin();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // Cleanup the event listener and interval when the component unmounts
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(intervalId);
//     };
//   }, []);

//   const closeDropdown = () => {
//     setShowDropdown(false);
//   };

//   return (
//     <>
//       <Nav>
//         <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
//           <LogoImg src={Logo} alt="Logo" />
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <WebsiteName>Animal Adopter</WebsiteName>
//             <Bars onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }} />
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={closeDropdown}>Home</NavLink>
//                 <NavLink to="/adopt" activeClassName="active" className="nav-link" onClick={closeDropdown}>Adopt</NavLink>
//                 <NavLink to="/rehome" activeClassName="active" className="nav-link" onClick={closeDropdown}>Rehome</NavLink>
//                 <FaUserCircle size="4em" onClick={() => setShowDropdown(!showDropdown)} style={{ position: 'absolute', right: '1%', top: '15%', color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
//               </NavMenu>
//               {showDropdown && (
//                 <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                   {isLoggedIn ? (
//                     <>
//                       <NavLink to="/profilePage" activeClassName="active" className="nav-link" onClick={closeDropdown}>Your Profile</NavLink>
//                       <NavLink to="/login" activeClassName="active" className="nav-link" onClick={closeDropdown}>Logout</NavLink>
//                     </>
//                   ) : (
//                     <NavLink to="/login" activeClassName="active" className="nav-link" onClick={closeDropdown}>Login</NavLink>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Nav>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Ensure axios is imported for HTTP requests
import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
import { FaUserCircle } from 'react-icons/fa';
import Logo from "../logo/Logo.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);  // State to hold the user image URL

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      const username = localStorage.getItem('username') || 'default-username';
      if (token) {
        // Fetch user profile when token is present
        axios.get(`http://127.0.0.1:8000/api/user/profile/${username}`, {
          headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
          if (response.status === 200) {
            setUserImage(response.data.image);  // Assuming 'image' is the key for the image URL
          }
        })
        .catch(error => console.error('Error fetching user image:', error));
      }
    };

    const intervalId = setInterval(checkLogin, 1000);

    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        checkLogin();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <Nav>
        <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <LogoImg src={Logo} alt="Logo" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebsiteName>Animal Adopter</WebsiteName>
            <Bars onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }} />
            <div className="collapse navbar-collapse" id="navbarNav">
              <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={closeDropdown}>Home</NavLink>
                <NavLink to="/adopt" activeClassName="active" className="nav-link" onClick={closeDropdown}>Adopt</NavLink>
                <NavLink to="/rehome" activeClassName="active" className="nav-link" onClick={closeDropdown}>Rehome</NavLink>
                {isLoggedIn && userImage ? 
                  <img src={`http://127.0.0.1:8000${userImage}`} alt="User Profile" style={{ position: 'absolute', right: '1%', top: '15%', width: '4em', height: '4em', borderRadius: '50%', cursor: 'pointer', marginLeft: '20px' }} onClick={() => setShowDropdown(!showDropdown)} /> :
                  <FaUserCircle size="4em" style={{ position: 'absolute', right: '1%', top: '15%', color: 'white', cursor: 'pointer', marginLeft: '20px' }} onClick={() => setShowDropdown(!showDropdown)} />
                }
              </NavMenu>
              {showDropdown && (
                <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                  {isLoggedIn ? (
                    <>
                      <NavLink to="/profilePage" activeClassName="active" className="nav-link" onClick={closeDropdown}>Your Profile</NavLink>
                      <NavLink to="/login" activeClassName="active" className="nav-link" onClick = {closeDropdown }>Logout</NavLink>
                    </>
                  ) : (
                    <NavLink to="/login" activeClassName="active" className="nav-link" onClick={closeDropdown}>Login</NavLink>
                  )}
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