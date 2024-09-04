import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCog, FaEnvelope } from 'react-icons/fa';

function Sidebar({ changePage, isMobileMenuOpen }) {
  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-64 h-screen bg-gray-900 text-white p-4 ${isMobileMenuOpen ? 'mobile-open' : ''}`}
    >
      <nav>
        <ul>
          <motion.li whileHover={{ scale: 1.1 }} className="mb-4">
            <a onClick={() => changePage('cashPoints')} className="flex items-center cursor-pointer">
              <FaHome className="mr-2" /> Cash Points
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} className="mb-4">
            <a onClick={() => changePage('myPoints')} className="flex items-center cursor-pointer">
              <FaUser className="mr-2" /> My Points
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} className="mb-4">
            <a onClick={() => changePage('profile')} className="flex items-center cursor-pointer">
              <FaCog className="mr-2" /> My Profile
            </a>
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
}

export default Sidebar;