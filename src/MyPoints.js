import React, { useState } from 'react';
import './MyPoints.css'; // Asegúrate de crear este archivo CSS

function MyPoints({ points, onUpdatePoints, onDeletePoint, onAddPoint }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPoint, setEditedPoint] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedPoint({ ...points[index] });
  };

  const handleSave = () => {
    const newPoints = [...points];
    newPoints[editingIndex] = editedPoint;
    onUpdatePoints(newPoints);
    setEditingIndex(null);
    setEditedPoint(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedPoint(null);
  };

  const handleChange = (field, value) => {
    setEditedPoint({ ...editedPoint, [field]: value });
  };

  const renderPointCard = (point, index) => (
    <div key={index} className="point-card">
      {editingIndex === index ? (
        <>
          <input 
            value={editedPoint.name} 
            onChange={(e) => handleChange('name', e.target.value)}
            className="point-input"
          />
          <div className="point-coordinates">
            <span>Lat: {point.lat.toFixed(6)}</span>
            <span>Lng: {point.lng.toFixed(6)}</span>
          </div>
          <div className="point-rates">
            <input 
              type="number" 
              value={editedPoint.usdtUsdBuy} 
              onChange={(e) => handleChange('usdtUsdBuy', parseFloat(e.target.value))}
              className="point-input"
              placeholder="USDT/USD Buy"
            />
            <input 
              type="number" 
              value={editedPoint.usdtUsdSell} 
              onChange={(e) => handleChange('usdtUsdSell', parseFloat(e.target.value))}
              className="point-input"
              placeholder="USDT/USD Sell"
            />
            <input 
              type="number" 
              value={editedPoint.usdtArsBuy} 
              onChange={(e) => handleChange('usdtArsBuy', parseFloat(e.target.value))}
              className="point-input"
              placeholder="USDT/ARS Buy"
            />
            <input 
              type="number" 
              value={editedPoint.usdtArsSell} 
              onChange={(e) => handleChange('usdtArsSell', parseFloat(e.target.value))}
              className="point-input"
              placeholder="USDT/ARS Sell"
            />
          </div>
          <div className="point-actions">
            <button onClick={handleSave} className="my-points-button save-button">Save</button>
            <button onClick={handleCancel} className="my-points-button cancel-button">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{point.name}</h3>
          <div className="point-coordinates">
            <span>Lat: {point.lat.toFixed(6)}</span>
            <span>Lng: {point.lng.toFixed(6)}</span>
          </div>
          <div className="point-rates">
            <span>USDT/USD Buy: {point.usdtUsdBuy}</span>
            <span>USDT/USD Sell: {point.usdtUsdSell}</span>
            <span>USDT/ARS Buy: {point.usdtArsBuy}</span>
            <span>USDT/ARS Sell: {point.usdtArsSell}</span>
          </div>
          <div className="point-actions">
            <button onClick={() => handleEdit(index)} className="my-points-button edit-button">✏️</button>
            <button onClick={() => onDeletePoint(index)} className="my-points-button delete-button">🗑️</button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="my-points">
      <h2>My Points</h2>
      <button onClick={onAddPoint} className="my-points-button add-button">
        Add New Point
      </button>
      <div className="points-list">
        {points.map((point, index) => renderPointCard(point, index))}
      </div>
      <table className="points-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>USDT/USD Buy</th>
            <th>USDT/USD Sell</th>
            <th>USDT/ARS Buy</th>
            <th>USDT/ARS Sell</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{point.name}</td>
              <td>{point.lat.toFixed(6)}</td>
              <td>{point.lng.toFixed(6)}</td>
              <td>{point.usdtUsdBuy}</td>
              <td>{point.usdtUsdSell}</td>
              <td>{point.usdtArsBuy}</td>
              <td>{point.usdtArsSell}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="my-points-button edit-button">✏️</button>
                <button onClick={() => onDeletePoint(index)} className="my-points-button delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPoints;
