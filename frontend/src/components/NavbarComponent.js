// // import React, { useState, useEffect } from 'react';
// // import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
// // import { FaUserCircle } from 'react-icons/fa';
// // import Logo from "../logo/Logo.png";

// // const Navbar = () => {
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   useEffect(() => {
// //     const checkLogin = () => {
// //       const token = localStorage.getItem('token');
// //       setIsLoggedIn(!!token);
// //     };

// //     // Polling localStorage every 1000 milliseconds (1 second)
// //     const intervalId = setInterval(checkLogin, 1000);

// //     // Listen for changes in localStorage across tabs
// //     const handleStorageChange = (event) => {
// //       if (event.key === 'token') {
// //         checkLogin();
// //       }
// //     };

// //     window.addEventListener('storage', handleStorageChange);

// //     // Cleanup the event listener and interval when the component unmounts
// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //       clearInterval(intervalId);
// //     };
// //   }, []);

// //   const closeDropdown = () => {
// //     setShowDropdown(false);
// //   };

// //   return (
// //     <>
// //       <Nav>
// //         <div className="navbar-components-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
// //           <LogoImg src={Logo} alt="Logo" />
// //           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //             <WebsiteName>Animal Adopter</WebsiteName>
// //             <Bars onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }} />
// //             <div className="collapse navbar-collapse" id="navbarNav">
// //               <NavMenu style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                 <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={closeDropdown}>Home</NavLink>
// //                 <NavLink to="/adopt" activeClassName="active" className="nav-link" onClick={closeDropdown}>Adopt</NavLink>
// //                 <NavLink to="/rehome" activeClassName="active" className="nav-link" onClick={closeDropdown}>Rehome</NavLink>
// //                 <FaUserCircle size="4em" onClick={() => setShowDropdown(!showDropdown)} style={{ position: 'absolute', right: '1%', top: '15%', color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
// //               </NavMenu>
// //               {showDropdown && (
// //                 <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
// //                   {isLoggedIn ? (
// //                     <>
// //                       <NavLink to="/profilePage" activeClassName="active" className="nav-link" onClick={closeDropdown}>Your Profile</NavLink>
// //                       <NavLink to="/login" activeClassName="active" className="nav-link" onClick={closeDropdown}>Logout</NavLink>
// //                     </>
// //                   ) : (
// //                     <NavLink to="/login" activeClassName="active" className="nav-link" onClick={closeDropdown}>Login</NavLink>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </Nav>
// //     </>
// //   );
// // };

// // export default Navbar;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
// import { FaUserCircle } from 'react-icons/fa';
// import Logo from "../logo/Logo.png";

// const Navbar = () => {
//   const username = localStorage.getItem('username') || 'default-username';
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userImage, setUserImage] = useState(null);

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const config = {
//       headers: { Authorization: `Token ${authToken}` }
//     };

//     axios.get(`http://127.0.0.1:8000/api/user/profile/${username}`, config)
//       .then(response => {
//         if (response.status === 200) {
//           setIsLoggedIn = true;
//           setUser(response.data);
//         } else {
//           setIsLoggedIn = false;
//           console.error('Failed to fetch user profile:', response.status);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching user profile:', error.toString());
//       });
//   }, [username]);

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
//                 {userImage ?
//                   <img src={userImage} alt="User Profile" style={{ width: '4em', height: '4em', borderRadius: '50%', position: 'absolute', right: '1%', top: '15%' }} onClick={() => setShowDropdown(!showDropdown)} />
//                   :
//                   <FaUserCircle size="4em" style={{ position: 'absolute', right: '1%', top: '15%', color: 'white', cursor: 'pointer', marginLeft: '20px' }} onClick={() => setShowDropdown(!showDropdown)} />
//                 }
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
import axios from 'axios';
import { Nav, LogoImg, NavLink, Bars, NavMenu, WebsiteName } from "./Navbar/NavbarElements";
import { FaUserCircle } from 'react-icons/fa';
import Logo from "../logo/Logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: { Authorization: `Token ${authToken}` }
    };

    const username = localStorage.getItem('username') || 'default-username';
    axios.get(`http://127.0.0.1:8000/api/user/profile/${username}`, config)
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data);
          setUserImage(response.data.image);
        } else {
          setIsLoggedIn(false);
          console.error('Failed to fetch user profile:', response.status);
        }
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error('Error fetching user profile:', error.toString());
      });
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
                {userImage ?
                  <img src={userImage} alt="User Profile" style={{ width: '4em', height: '4em', borderRadius: '50%', position: 'absolute', right: '1%', top: '15%' }} onClick={() => setShowDropdown(!showDropdown)} />
                  :
                  <FaUserCircle size="4em" style={{ position: 'absolute', right: '1%', top: '15%', color: 'white', cursor: 'pointer', marginLeft: '20px' }} onClick={() => setShowDropdown(!showDropdown)} />
                }
              </NavMenu>
              {showDropdown && (
                <div style={{ position: 'absolute', right: '1%', top: '100%', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                  {isLoggedIn ? (
                    <>
                      <NavLink to="/profilePage" activeClassName="active" className="nav-link" onClick={closeDropdown}>Your Profile</NavLink>
                      <NavLink to="/logout" activeClassName="active" className="nav-link" onClick={() => {
                        localStorage.removeItem('authToken');
                        setIsLoggedIn(false);
                        closeDropdown();
                      }}>Logout</NavLink>
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
