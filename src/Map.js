import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MerchantCard from './MerchantCard';

const containerStyle = {
  width: '100%',
  height: '600px',
};

// Centro aproximado de CABA
const center = {
  lat: -34.6037,
  lng: -58.3816
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

function Map({ points, onAddPoint, userProfile }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circles, setCircles] = useState([]);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const onLoad = useCallback(function callback(map) {
    console.log("Mapa cargado");
    setMap(map);
    
    if (points.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      points.forEach(point => bounds.extend(point));
      map.fitBounds(bounds);
      
      // Ajusta el zoom máximo a 14 para un poco más de acercamiento
      const listener = window.google.maps.event.addListener(map, 'idle', function() {
        if (map.getZoom() > 14) map.setZoom(14);
        window.google.maps.event.removeListener(listener);
      });
    } else {
      // Si no hay puntos, establece un zoom predeterminado un poco más cercano
      map.setZoom(13);
    }
  }, [points]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    console.log("Puntos recibidos en Map:", points);
    if (map && points.length > 0) {
      const newMarkers = points.map((point, index) => {
        const marker = new window.google.maps.Marker({
          position: point,
          label: (index + 1).toString(),
          map: map
        });
        marker.addListener('click', () => handleMarkerClick(point));
        return marker;
      });
      setMarkers(newMarkers);

      const newCircles = points.map((point, index) => {
        const circle = new window.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map,
          center: point,
          radius: 300
        });
        circle.addListener('click', () => handleMarkerClick(point));
        return circle;
      });
      setCircles(newCircles);
    }
  }, [map, points]);

  const handleMarkerClick = (point) => {
    if (map) {
      map.setZoom(16);
      map.panTo(point);

      setTimeout(() => {
        setSelectedMerchant({
          ...point,
          wallet: userProfile.wallet,
          totalTransactions: userProfile.totalTransactions,
          firstConnection: userProfile.firstConnection,
          positiveReviews: userProfile.positiveReviews,
          negativeReviews: userProfile.negativeReviews,
          totalReviews: userProfile.totalReviews,
          recentTransactions: userProfile.recentTransactions,
          schedule: point.schedule || '9:00 - 18:00' // Añadimos el horario aquí
        });
      }, 300);
    }
  };

  const handleMapClick = (e) => {
    if (isAddingPoint) {
      const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log("Nuevo punto añadido:", newPoint);
      onAddPoint(newPoint);
      setIsAddingPoint(false);
    } else {
      setSelectedMerchant(null);
    }
  };

  return (
    <div style={{ position: 'relative', height: '600px' }}>
      <LoadScript googleMapsApiKey="AIzaSyDupAiKTAn-Ncz9uHEbFIyyFoByePwHDek">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}  // Zoom inicial un poco más cercano
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={mapOptions}
        >
          {/* Los círculos y marcadores se crean usando la API nativa de Google Maps */}
        </GoogleMap>
      </LoadScript>
      <button 
        className="add-point-button"
        onClick={() => setIsAddingPoint(true)}
      >
        +
      </button>
      {selectedMerchant && (
        <MerchantCard 
          merchant={selectedMerchant} 
          onClose={() => setSelectedMerchant(null)}
        />
      )}
    </div>
  );
}

export default Map;