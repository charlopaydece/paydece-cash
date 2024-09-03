import React, { useState, useEffect } from 'react';
import './MyPoints.css';

function MyPoints({ points, onUpdatePoints, onDeletePoint }) {
  const [editedPoints, setEditedPoints] = useState(points);

  useEffect(() => {
    setEditedPoints(points);
  }, [points]);

  const handleInputChange = (index, field, value) => {
    const newPoints = [...editedPoints];
    newPoints[index][field] = value;
    setEditedPoints(newPoints);
  };

  const handleSaveChanges = () => {
    onUpdatePoints(editedPoints);
  };

  return (
    <div className="my-points">
      <h2>My Points</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Compra USDT/USD</th>
            <th>Venta USDT/USD</th>
            <th>Compra USDT/ARS</th>
            <th>Venta USDT/ARS</th>
            <th>Horario</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {editedPoints.map((point, index) => (
            <tr key={index}>
              <td>
                <input
                  value={point.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={point.usdtUsdBuy}
                  onChange={(e) => handleInputChange(index, 'usdtUsdBuy', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={point.usdtUsdSell}
                  onChange={(e) => handleInputChange(index, 'usdtUsdSell', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={point.usdtArsBuy}
                  onChange={(e) => handleInputChange(index, 'usdtArsBuy', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={point.usdtArsSell}
                  onChange={(e) => handleInputChange(index, 'usdtArsSell', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  value={point.schedule || '9:00 - 18:00'}
                  onChange={(e) => handleInputChange(index, 'schedule', e.target.value)}
                />
              </td>
              <td>
                <button className="delete-button" onClick={() => onDeletePoint(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-changes-button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default MyPoints;
