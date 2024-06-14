// pages/DashboardPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import OnBoarding from '../components/OnBoarding';


const DashboardPage = () => {
  const [goals, setGoals] = useState([]);

  return (
    <div>
      <Header />
      <OnBoarding />
    </div>
  );
};
export default DashboardPage;