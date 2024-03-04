import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Adopt from "./pages/navbar/adopt";
import Rehome from "./pages/navbar/rehome";
import Navbar from "./components/Navbar/navbar.js";
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  useEffect(() => {
  fetch(' http://127.0.0.1:8000/').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
      setCurrentDate(data.date)
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/adopt" exact component={<Adopt />} />
          <Route path="/rehome" exact component={<Rehome />} />
        </Routes>
      </Router>
      <header className="App-header">
      <p>The date is {currentDate} and the time is {currentTime}.</p> <br/>

      </header>
    </div>
  );
}

export default App;
