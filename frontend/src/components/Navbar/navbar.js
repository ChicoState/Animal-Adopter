import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () =>{
return(
    <div>
    <li>
      <Link to="/adopt">Adopt</Link>
    </li>
    <li>
      <Link to="/rehome">Rehome</Link>
    </li>
  </div>
  );
}
export default navbar;