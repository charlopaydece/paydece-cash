import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ changePage, isMobileMenuOpen }) {
  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
    >
      <nav>
        <ul>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => changePage('cashPoints')}>
            <FaHome className="icon" /> Cash Points
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => changePage('myPoints')}>
            <FaUser className="icon" /> My Points
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => changePage('profile')}>
            <FaCog className="icon" /> My Profile
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
}

export default Sidebar;
