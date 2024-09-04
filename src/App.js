import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Map from './Map';
import MyPoints from './MyPoints';
import Profile from './Profile';
import './App.css';

function App() {
  const initialPoints = [
    {
      lat: -34.6037,
      lng: -58.3816,
      name: "Punto 1 - Obelisco",
      scoring: 4.5,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 725,
      usdtArsSell: 735,
      schedule: "9:00 - 18:00"
    },
    {
      lat: -34.5883,
      lng: -58.4096,
      name: "Punto 2 - Palermo",
      scoring: 4.2,
      usdtUsdBuy: 0.98,
      usdtUsdSell: 1.02,
      usdtArsBuy: 720,
      usdtArsSell: 730,
      schedule: "10:00 - 19:00"
    },
    {
      lat: -34.6084,
      lng: -58.3731,
      name: "Punto 3 - Puerto Madero",
      scoring: 4.7,
      usdtUsdBuy: 0.985,
      usdtUsdSell: 1.015,
      usdtArsBuy: 722,
      usdtArsSell: 732,
      schedule: "8:00 - 20:00"
    },
    {
      lat: -34.5876,
      lng: -58.4215,
      name: "Punto 4 - Palermo Soho",
      scoring: 4.3,
      usdtUsdBuy: 0.985,
      usdtUsdSell: 1.015,
      usdtArsBuy: 722,
      usdtArsSell: 732,
      schedule: "9:00 - 20:00"
    },
    {
      lat: -34.5820,
      lng: -58.4128,
      name: "Punto 5 - Plaza Serrano",
      scoring: 4.1,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 725,
      usdtArsSell: 735,
      schedule: "11:00 - 22:00"
    },
    {
      lat: -34.5934,
      lng: -58.4001,
      name: "Punto 6 - Alto Palermo",
      scoring: 4.4,
      usdtUsdBuy: 0.975,
      usdtUsdSell: 1.025,
      usdtArsBuy: 718,
      usdtArsSell: 728,
      schedule: "10:00 - 22:00"
    },
    {
      lat: -34.5880,
      lng: -58.3950,
      name: "Punto 7 - Recoleta Mall",
      scoring: 4.6,
      usdtUsdBuy: 0.98,
      usdtUsdSell: 1.02,
      usdtArsBuy: 723,
      usdtArsSell: 733,
      schedule: "9:00 - 21:00"
    },
    {
      lat: -34.5872,
      lng: -58.3917,
      name: "Punto 8 - Cementerio de Recoleta",
      scoring: 4.2,
      usdtUsdBuy: 0.985,
      usdtUsdSell: 1.015,
      usdtArsBuy: 721,
      usdtArsSell: 731,
      schedule: "8:00 - 18:00"
    },
    {
      lat: -34.5838,
      lng: -58.3989,
      name: "Punto 9 - Av. Pueyrredón",
      scoring: 4.0,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 724,
      usdtArsSell: 734,
      schedule: "9:30 - 19:30"
    },
    {
      lat: -34.5912,
      lng: -58.4075,
      name: "Punto 10 - Plaza Italia",
      scoring: 4.5,
      usdtUsdBuy: 0.98,
      usdtUsdSell: 1.02,
      usdtArsBuy: 726,
      usdtArsSell: 736,
      schedule: "10:00 - 20:00"
    },
    {
      lat: -34.5796,
      lng: -58.4117,
      name: "Punto 11 - Jardín Botánico",
      scoring: 4.3,
      usdtUsdBuy: 0.985,
      usdtUsdSell: 1.015,
      usdtArsBuy: 720,
      usdtArsSell: 730,
      schedule: "8:00 - 19:00"
    },
    {
      lat: -34.5865,
      lng: -58.3880,
      name: "Punto 12 - Biblioteca Nacional",
      scoring: 4.1,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 722,
      usdtArsSell: 732,
      schedule: "9:00 - 18:00"
    },
    {
      lat: -34.5940,
      lng: -58.3960,
      name: "Punto 13 - Facultad de Derecho",
      scoring: 4.4,
      usdtUsdBuy: 0.975,
      usdtUsdSell: 1.025,
      usdtArsBuy: 719,
      usdtArsSell: 729,
      schedule: "8:30 - 20:30"
    }
  ];

  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? JSON.parse(savedPoints) : initialPoints;
  });
  const [currentPage, setCurrentPage] = useState('cashPoints');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddingPoint, setIsAddingPoint] = useState(false);

  const userProfile = {
    name: "Usuario Ejemplo",
    wallet: "0x1234...5678",
    scoring: 4.5
  };

  const handleUpdateProfile = (updatedProfile) => {
    console.log('Profile updated:', updatedProfile);
    // Aquí iría la lógica para actualizar el perfil en tu estado o backend
  };

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points));
    console.log("Puntos actualizados:", points);
  }, [points]);

  const handleAddPoint = useCallback((newPoint) => {
    const pointWithDetails = {
      ...newPoint,
      name: `Punto ${points.length + 1}`,
      scoring: userProfile.scoring,
      usdtUsdBuy: 0.99,
      usdtUsdSell: 1.01,
      usdtArsBuy: 725,
      usdtArsSell: 735,
      schedule: "9:00 - 18:00"
    };
    setPoints(prevPoints => {
      const newPoints = [...prevPoints, pointWithDetails];
      console.log("Puntos después de añadir:", newPoints);
      return newPoints;
    });
    setIsAddingPoint(false);
  }, [points.length, userProfile.scoring]);

  const handleUpdatePoints = useCallback((updatedPoints) => {
    setPoints(updatedPoints);
  }, []);

  const handleDeletePoint = useCallback((index) => {
    setPoints(prevPoints => prevPoints.filter((_, i) => i !== index));
  }, []);

  const changePage = useCallback((page) => {
    console.log("Cambiando página a:", page);
    console.log("Puntos actuales:", points);
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }, [points]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar toggleMobileMenu={toggleMobileMenu} />
      <div className="main-content" style={{ flex: 1, overflow: 'hidden' }}>
        <Sidebar changePage={changePage} isMobileMenuOpen={isMobileMenuOpen} />
        <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
        <div className="content" style={{ height: '100%' }}>
          {currentPage === 'cashPoints' && (
            <div className="map-container" style={{ height: '100%' }}>
              <Map 
                points={points} 
                onAddPoint={handleAddPoint}
                userProfile={userProfile}
                isAddingPoint={isAddingPoint}
              />
            </div>
          )}
          {currentPage === 'myPoints' && (
            <MyPoints 
              points={points} 
              onUpdatePoints={handleUpdatePoints}
              onDeletePoint={handleDeletePoint}
              onAddPoint={() => {
                setIsAddingPoint(true);
                setCurrentPage('cashPoints');
              }}
            />
          )}
          {currentPage === 'profile' && (
            <Profile userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
