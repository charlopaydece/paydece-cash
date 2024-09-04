import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MerchantCard from './MerchantCard';

function Map({ points, onAddPoint, userProfile, isAddingPoint }) {
  const [map, setMap] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const mapElementsRef = useRef({ markers: [], circles: [] });

  const containerStyle = useMemo(() => ({
    width: '100%',
    height: 'calc(100vh - 100px)' // Ajusta este valor según el tamaño de tu navbar
  }), []);

  const center = useMemo(() => ({
    lat: -34.6037,
    lng: -58.3816
  }), []);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const handlePointClick = useCallback((point, circle) => {
    setSelectedMerchant(point);
    
    // Resetear colores de todos los círculos
    mapElementsRef.current.circles.forEach(c => {
      c.setOptions({
        strokeColor: '#FF0000',
        fillColor: '#FF0000'
      });
    });

    // Cambiar color del círculo seleccionado a negro
    circle.setOptions({
      strokeColor: '#000000', // Negro
      fillColor: '#000000' // Negro
    });

    // Hacer zoom al punto
    if (map) {
      map.setZoom(15);
      map.panTo({lat: point.lat, lng: point.lng});
    }
  }, [map]);

  const createMapElements = useCallback(() => {
    if (!map) return;

    // Limpiar marcadores y círculos existentes
    mapElementsRef.current.markers.forEach(marker => marker.setMap(null));
    mapElementsRef.current.circles.forEach(circle => circle.setMap(null));

    const bounds = new window.google.maps.LatLngBounds();
    const newMarkers = [];
    const newCircles = [];

    points.forEach(point => {
      bounds.extend({lat: point.lat, lng: point.lng});
      
      // Crear marcador manualmente
      const marker = new window.google.maps.Marker({
        position: {lat: point.lat, lng: point.lng},
        map: map,
        title: point.name
      });

      // Crear círculo manualmente
      const circle = new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: point.lat, lng: point.lng},
        radius: 300,
        clickable: true // Hacer el círculo clickeable
      });

      // Añadir evento de clic al marcador y al círculo
      const clickHandler = () => handlePointClick(point, circle);
      marker.addListener('click', clickHandler);
      circle.addListener('click', clickHandler);

      newMarkers.push(marker);
      newCircles.push(circle);
    });

    mapElementsRef.current = { markers: newMarkers, circles: newCircles };
    
    if (points.length > 0) {
      map.fitBounds(bounds);
    } else {
      map.setCenter(center);
      map.setZoom(13);
    }
  }, [map, points, center, handlePointClick]);

  useEffect(() => {
    createMapElements();
  }, [createMapElements]);

  const handleMapClick = useCallback((event) => {
    if (isAddingPoint) {
      const newPoint = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      onAddPoint(newPoint);
    } else {
      // Resetear colores de todos los círculos cuando se hace clic en el mapa
      mapElementsRef.current.circles.forEach(circle => {
        circle.setOptions({
          strokeColor: '#FF0000',
          fillColor: '#FF0000'
        });
      });
      setSelectedMerchant(null);
    }
  }, [isAddingPoint, onAddPoint]);

  return (
    <div className="map-container" style={{ position: 'relative', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {/* Los marcadores y círculos se crean manualmente en createMapElements */}
      </GoogleMap>
      {isAddingPoint && (
        <div className="adding-point-message" style={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          background: '#000000', // Cambiamos el fondo a negro
          color: 'white', // Cambiamos el color del texto a blanco
          padding: '10px 20px', // Mantenemos el padding
          borderRadius: '5px',
          zIndex: 1000,
          fontSize: '18px', // Mantenemos el tamaño de fuente
          fontWeight: 'bold' // Mantenemos el texto en negrita
        }}>
          Click on the map to add a new point
        </div>
      )}
      {selectedMerchant && (
        <MerchantCard 
          merchant={selectedMerchant} 
          onClose={() => {
            setSelectedMerchant(null);
            // Resetear colores de todos los círculos cuando se cierra la tarjeta
            mapElementsRef.current.circles.forEach(circle => {
              circle.setOptions({
                strokeColor: '#FF0000',
                fillColor: '#FF0000'
              });
            });
            // Ajustar el zoom para mostrar todos los puntos
            if (map && points.length > 0) {
              const bounds = new window.google.maps.LatLngBounds();
              points.forEach(point => bounds.extend({lat: point.lat, lng: point.lng}));
              map.fitBounds(bounds);
            }
          }}
        />
      )}
    </div>
  );
}

export default Map;