// Logger.js
import React, { useState } from 'react';

const Logger = ({ goals = [], onLog }) => {
  const [activities, setActivities] = useState(Array(goals.length).fill(''));
  const [times, setTimes] = useState(Array(goals.length).fill(''));

  const handleSubmit = (index) => (event) => {
    event.preventDefault();
    onLog({ goal: goals[index], activity: activities[index], time: times[index] });
    setActivities(prev => { const copy = [...prev]; copy[index] = ''; return copy; });
    setTimes(prev => { const copy = [...prev]; copy[index] = ''; return copy; });
  };

  const handleActivityChange = (index) => (event) => {
    setActivities(prev => { const copy = [...prev]; copy[index] = event.target.value; return copy; });
  };

  const handleTimeChange = (index) => (event) => {
    setTimes(prev => { const copy = [...prev]; copy[index] = event.target.value; return copy; });
  };

  return (
    <div>
      {goals.map((goal, index) => (
        <form key={goal} onSubmit={handleSubmit(index)}>
          <label>{goal}</label>
          <input type="text" value={activities[index]} onChange={handleActivityChange(index)} placeholder="Activity"/>
          <input type="time" value={times[index]} onChange={handleTimeChange(index)} placeholder="Time"/>
          <button type="submit">Log</button>
        </form>
      ))}
    </div>
  );
};

export default Logger;