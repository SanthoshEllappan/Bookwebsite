import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landingpage.css';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><Link to="/landing">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
