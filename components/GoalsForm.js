import React, { useState } from 'react';
import { useRouter } from 'next/router';

const GoalsForm = ({ onSetGoals }) => {
  const router = useRouter();
  const [goal1, setGoal1] = useState('');
  const [goal2, setGoal2] = useState('');
  const [goal3, setGoal3] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onSetGoals([goal1, goal2, goal3]);
  };

  const handleDefineLater = () => {
    router.push('/dashboard');
  }

  return (  
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>On what area would you like to focus on?</h2>
      <input type="text" value={goal1} onChange={(e) => setGoal1(e.target.value)} placeholder="Goal 1" />
      <input type="text" value={goal2} onChange={(e) => setGoal2(e.target.value)} placeholder="Goal 2" />
      <input type="text" value={goal3} onChange={(e) => setGoal3(e.target.value)} placeholder="Goal 3" />
      <button type="submit">Submit</button>
    </form>
    <p>If you don't have any area of focus, don't worry you can still
      log and define your area of focus later. </p>
      <button onClick={handleDefineLater}>Define Later.</button>

    </div>
  );
};

export default GoalsForm;