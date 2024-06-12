// pages/DashboardPage.js
import React, { useState } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import GoalsForm from './GoalsForm';
import Logger from './Logger';


const DashboardPage = () => {
  const [goals, setGoals] = useState([]);

  return (
    <div>
      <DashboardComponent />
      <GoalsForm onSetGoals={setGoals} />
      <Logger goals={goals} />
    </div>
  );
};
export default DashboardPage;