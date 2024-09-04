import React from 'react';
import './Navbar.css';

function Navbar({ toggleMobileMenu }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PayDece Cash Points</div>
      <button className="hamburger" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
