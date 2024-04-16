// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
// import AdoptPage from './pages/adopt';
// import RehomePage from './pages/rehome';
// import LoginPage from './pages/login';
// import Navbar from './components/NavbarComponent';
// import UserFormComponent from './components/UserFormComponent';

// import './home.css';

// function HomePage({ animalTypes }) {
//   return (
//     <div className="home-page-container">
//       <h1>Browse Animals</h1>
//       <div className="pet-option-container">
//         {animalTypes.map((type, index) => (
//           <div key={index} className="browse-options">
//             <div className="top">
//               <div>
//                 <h5>{type.option}</h5>
//                 <img src={`http://127.0.0.1:8000/media/homeImages/${type.value}.jpeg`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const animalTypes = [
//   { option: 'Dogs', value: 'dog' },
//   { option: 'Cats', value: 'cat' },
//   { option: 'Rodents', value: 'rodent' },
//   { option: 'Fish', value: 'fish' },
//   { option: 'Birds', value: 'bird' },
//   { option: 'Reptile', value: 'reptile' },
//   { option: 'Horse', value: 'horse' },
//   { option: 'Other', value: 'other' }
// ];

// function About() {
//   return <h2>About Page</h2>;
// }

// function App() {
//   const [pet, setPet] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/animalAdopter/models')
//       .then(response => {
//         console.log('Axios Response:', response);

//         if (response.status === 200) {
//           console.log('Data from the server:', response.data);
//           setPet(response.data.pet);
//         } else {
//           console.error('Request failed with status code:', response.status);
//         }
//       })
//       .catch(error => {
//         console.error('Axios error:', error.response ? error.response.data : error.message);
//       });
//   }, []);

//   console.log('Pet state:', pet); // Log the pet state

//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Switch>
//           <Route path="/" exact>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="card">
//                   <div className="card-body" style={{ overflow: 'auto', paddingTop: '70px' }}>
//                     <HomePage animalTypes={animalTypes} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <Route path="/adopt">
//             <AdoptPage />
//           </Route>
//           <Route path="/rehome">
//             <RehomePage />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/createProfile">
//             <UserFormComponent />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './AuthContext';  // Import AuthProvider
import AdoptPage from './pages/adopt';
import RehomePage from './pages/rehome';
import LoginPage from './pages/login';
import Navbar from './components/NavbarComponent';
import UserFormComponent from './components/UserFormComponent';

import './home.css';

function HomePage({ animalTypes }) {
  return (
    <div className="home-page-container">
      <h1>Browse Animals</h1>
      <div className="pet-option-container">
        {animalTypes.map((type, index) => (
          <div key={index} className="browse-options">
            <div className="top">
              <div>
                <h5>{type.option}</h5>
                <img src={`http://127.0.0.1:8000/media/homeImages/${type.value}.jpeg`} alt={type.option} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const animalTypes = [
  { option: 'Dogs', value: 'dog' },
  { option: 'Cats', value: 'cat' },
  { option: 'Rodents', value: 'rodent' },
  { option: 'Fish', value: 'fish' },
  { option: 'Birds', value: 'bird' },
  { option: 'Reptile', value: 'reptile' },
  { option: 'Horse', value: 'horse' },
  { option: 'Other', value: 'other' }
];

function About() {
  return <h2>About Page</h2>;
}

function App() {
  const [pet, setPet] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/animalAdopter/models')
      .then(response => {
        console.log('Axios Response:', response);

        if (response.status === 200) {
          console.log('Data from the server:', response.data);
          setPet(response.data.pet);
        } else {
          console.error('Request failed with status code:', response.status);
        }
      })
      .catch(error => {
        console.error('Axios error:', error.response ? error.response.data : error.message);
      });
  }, []);

  console.log('Pet state:', pet); // Log the pet state

  return (
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body" style={{ overflow: 'auto', paddingTop: '70px' }}>
                      <HomePage animalTypes={animalTypes} />
                    </div>
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/adopt">
              <AdoptPage />
            </Route>
            <Route path="/rehome">
              <RehomePage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/createProfile">
              <UserFormComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
