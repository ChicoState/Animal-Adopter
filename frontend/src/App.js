import React, { useState, useEffect } from 'react';
import './App.css';
import Adopt from "./pages/adopt.js";
import Rehome from "./pages/rehome.js";

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
  <body>
    <div className="App">
      <header className="App-header">
      <p>The date is {currentDate} and the time is {currentTime}.</p> <br/>
      <div class="kitty">
        <img src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cq=85%2Cwidth=1200/wp-content/uploads/international-black-cat-awareness-month-e1575287719521.jpg" alt="alternatetext"></img>
        <div class="desc">
          <p>Name: Marlo</p>
          <p>Location: Chico</p>
          <p>Breed: bombay cat</p>
          <p>Sex: Male</p>
          <p>Cost: Free</p>
        </div>
      </div>
      <p>The date is {currentDate} and the time is {currentTime}.</p> <br/>

      </header>
    </div>
  </body>
  );
}

export default App;
