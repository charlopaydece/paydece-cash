import React from 'react';
import './MerchantCard.css';

function MerchantCard({ merchant, onClose }) {
  const handleTransaction = (type, currency) => {
    console.log(`${type} ${currency}`);
  };

  return (
    <div className="merchant-card">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{merchant.name}</h2>
      <div className="merchant-info">
        <p><i className="wallet-icon"></i> {merchant.wallet}</p>
        <p className="premium-user">Premium user</p>
        <p><i className="verified-merchant-icon"></i> Verified Merchant</p>
        <p><i className="verified-icon"></i> Miembro de Merchants Paydece</p>
        <p><i className="schedule-icon"></i> Horario: {merchant.schedule || 'No especificado'}</p>
      </div>
      <div className="merchant-stats">
        <div className="stat">
          <span className="stat-label">Total Transactions:</span>
          <span className="stat-value">{merchant.totalTransactions}</span>
        </div>
        <div className="stat">
          <span className="stat-label">First connection:</span>
          <span className="stat-value">{merchant.firstConnection}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Reviews:</span>
          <span className="stat-value">+{merchant.positiveReviews} / -{merchant.negativeReviews}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total reviews:</span>
          <span className="stat-value">{merchant.totalReviews}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Recent transactions:</span>
          <span className="stat-value">{merchant.recentTransactions}</span>
        </div>
      </div>
      <div className="exchange-rates">
        <h3>Exchange Rates</h3>
        <div className="rate-row">
          <span>USDT/USD Buy: {merchant.usdtUsdBuy}</span>
          <button onClick={() => handleTransaction('Sell', 'USDT/USD')}>Sell</button>
        </div>
        <div className="rate-row">
          <span>USDT/USD Sell: {merchant.usdtUsdSell}</span>
          <button onClick={() => handleTransaction('Buy', 'USDT/USD')}>Buy</button>
        </div>
        <div className="rate-row">
          <span>USDT/ARS Buy: {merchant.usdtArsBuy}</span>
          <button onClick={() => handleTransaction('Sell', 'USDT/ARS')}>Sell</button>
        </div>
        <div className="rate-row">
          <span>USDT/ARS Sell: {merchant.usdtArsSell}</span>
          <button onClick={() => handleTransaction('Buy', 'USDT/ARS')}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default MerchantCard;
