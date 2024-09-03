import React, { useState } from 'react';
import Navbar from './Navbar';
import Map from './Map';
import MyPoints from './MyPoints';
import Profile from './Profile';
import './App.css';

function App() {
  const initialPoints = [
    { 
      lat: -34.5883, 
      lng: -58.4096, 
      name: "Punto 1 - Palermo", 
      scoring: 4.5, 
      usdtUsdBuy: 0.99, 
      usdtUsdSell: 1.01, 
      usdtArsBuy: 725, 
      usdtArsSell: 735 
    },
    { 
      lat: -34.6037, 
      lng: -58.3816, 
      name: "Punto 2 - Recoleta", 
      scoring: 4.2, 
      usdtUsdBuy: 0.98, 
      usdtUsdSell: 1.02, 
      usdtArsBuy: 720, 
      usdtArsSell: 730 
    },
    { 
      lat: -34.6084, 
      lng: -58.3731, 
      name: "Punto 3 - Retiro", 
      scoring: 4.7, 
      usdtUsdBuy: 0.985, 
      usdtUsdSell: 1.015, 
      usdtArsBuy: 722, 
      usdtArsSell: 732 
    }
  ];

  const initialUserProfile = {
    name: "Charlo Paydece",
    wallet: "0xa1b06Dd5cA6b0...357a9928A49c67E",
    scoring: 4.5,
    totalTransactions: 696,
    firstConnection: "April 13, 2024",
    positiveReviews: 459,
    negativeReviews: 5,
    totalReviews: 464,
    recentTransactions: 286
  };

  const [myPoints, setMyPoints] = useState(initialPoints);
  const [currentPage, setCurrentPage] = useState('cashPoints');
  const [mapKey, setMapKey] = useState(0);
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  const handleAddPoint = (point) => {
    const newPoint = {
      ...point,
      name: `Punto ${myPoints.length + 1}`,
      scoring: userProfile.scoring,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 725,
      usdtArsSell: 735,
      schedule: '9:00 - 18:00' // Horario por defecto
    };
    setMyPoints(prevPoints => [...prevPoints, newPoint]);
  };

  const handleDeletePoint = (index) => {
    setMyPoints(prevPoints => prevPoints.filter((_, i) => i !== index));
  };

  const handleUpdatePoints = (updatedPoints) => {
    setMyPoints(updatedPoints);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // Actualiza el scoring en todos los puntos
    setMyPoints(prevPoints => prevPoints.map(point => ({
      ...point,
      scoring: updatedProfile.scoring
    })));
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (page === 'cashPoints') {
      setMapKey(prev => prev + 1);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <div className="sidebar">
          <h2>Menú Lateral</h2>
          <ul>
            <li onClick={() => changePage('cashPoints')}>Cash Points</li>
            <li onClick={() => changePage('myPoints')}>My Points</li>
            <li onClick={() => changePage('profile')}>My Profile</li>
          </ul>
        </div>
        <div className="main-content">
          {currentPage === 'cashPoints' && (
            <div className="map-container">
              <h2>Cash Points</h2>
              <Map 
                key={mapKey}
                points={myPoints} 
                onAddPoint={handleAddPoint}
                userProfile={userProfile}
              />
            </div>
          )}
          {currentPage === 'myPoints' && (
            <MyPoints 
              points={myPoints} 
              onUpdatePoints={handleUpdatePoints}
              onDeletePoint={handleDeletePoint}
            />
          )}
          {currentPage === 'profile' && (
            <Profile 
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
