// src/component/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🧠 Typing Master</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/result">Results</Link>
      </div>
    </nav>
  );
};

export default Navbar;
