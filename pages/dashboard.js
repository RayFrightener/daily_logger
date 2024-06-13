// pages/DashboardPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import GoalsForm from './GoalsForm';
import Logger from './Logger';


const DashboardPage = () => {
  const [goals, setGoals] = useState([]);

  return (
    <div>
      <Header />
      <GoalsForm onSetGoals={setGoals} />
      <Logger goals={goals} />
    </div>
  );
};
export default DashboardPage;