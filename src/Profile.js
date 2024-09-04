import React, { useState } from 'react';
import './Profile.css';

function Profile({ userProfile, onUpdateProfile }) {
  const [name, setName] = useState(userProfile.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateProfile && typeof onUpdateProfile === 'function') {
      onUpdateProfile({ ...userProfile, name });
    } else {
      console.warn('onUpdateProfile is not provided or is not a function');
      // Aquí puedes agregar alguna lógica alternativa si onUpdateProfile no está disponible
    }
  };

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Wallet:</label>
          <span><i className="wallet-icon"></i> {userProfile.wallet}</span>
        </div>
        <div className="profile-field">
          <label>Status:</label>
          <span className="premium-user">Premium user</span>
        </div>
        <div className="profile-field">
          <label>Merchant Status:</label>
          <span><i className="verified-merchant-icon"></i> Verified Merchant</span>
        </div>
        <div className="profile-field">
          <label>Membership:</label>
          <span><i className="verified-icon"></i> Miembro de Merchants Paydece</span>
        </div>
        <div className="profile-field">
          <label>Total Transactions:</label>
          <span>{userProfile.totalTransactions}</span>
        </div>
        <div className="profile-field">
          <label>First Connection:</label>
          <span>{userProfile.firstConnection}</span>
        </div>
        <div className="profile-field">
          <label>Positive Reviews:</label>
          <span>{userProfile.positiveReviews}</span>
        </div>
        <div className="profile-field">
          <label>Negative Reviews:</label>
          <span>{userProfile.negativeReviews}</span>
        </div>
        <div className="profile-field">
          <label>Total Reviews:</label>
          <span>{userProfile.totalReviews}</span>
        </div>
        <div className="profile-field">
          <label>Recent Transactions:</label>
          <span>{userProfile.recentTransactions}</span>
        </div>
        <button type="submit" className="save-changes-button">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
