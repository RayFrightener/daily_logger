// src/components/Dashboard.js
import React from 'react';
import SignOutButton from './SignOutButton';

const DashboardPage = () => {
  return (
    
    <div>
      <div className="signout-button-container">
  <SignOutButton />
      </div>
      <h1>Welcome to your Dashboard</h1>
      <p>This is the main logging area.</p>
      
    </div>
  );
};

export default DashboardPage;