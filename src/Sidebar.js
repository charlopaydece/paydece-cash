import React from 'react';
import './Sidebar.css';

function Sidebar({ changePage, isMobileMenuOpen }) {
  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <ul>
        <li onClick={() => changePage('cashPoints')}>Cash Points</li>
        <li onClick={() => changePage('myPoints')}>My Points</li>
        <li onClick={() => changePage('profile')}>My Profile</li>
      </ul>
    </div>
  );
}

export default Sidebar;
