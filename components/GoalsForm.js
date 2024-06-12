import React, { useState } from 'react';

const GoalsForm = ({ onSetGoals }) => {
  const [goal1, setGoal1] = useState('');
  const [goal2, setGoal2] = useState('');
  const [goal3, setGoal3] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onSetGoals([goal1, goal2, goal3]);
  };

  return (  
    <form onSubmit={handleSubmit}>
      <h2>On what area would you like to focus on?</h2>
      <input type="text" value={goal1} onChange={(e) => setGoal1(e.target.value)} placeholder="Goal 1" />
      <input type="text" value={goal2} onChange={(e) => setGoal2(e.target.value)} placeholder="Goal 2" />
      <input type="text" value={goal3} onChange={(e) => setGoal3(e.target.value)} placeholder="Goal 3" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default GoalsForm;