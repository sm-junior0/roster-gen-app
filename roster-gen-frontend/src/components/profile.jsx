// src/components/Page3.js
import React from 'react';
import profileImage from '../assets/logo.jpg'; 
import './profile.css'; 

function Profile() {

  const user = {
    name: 'Mom',
    email: 'ja@example.com',
    role: 'Nurse',
    department: 'Pediatrics',

  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <input type="text" value={user.name} readOnly />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input type="text" value={user.email} readOnly />
          </div>
          <div className="profile-field">
            <label>Role:</label>
            <input type="text" value={user.role} readOnly />
          </div>
          <div className="profile-field">
            <label>Department:</label>
            <input type="text" value={user.department} readOnly />
          </div>

          <button className="btn-update">Update Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
