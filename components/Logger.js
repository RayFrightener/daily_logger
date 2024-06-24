import React, { useState } from 'react';

const Logger = () => {
  // State hooks for each input
  const [date, setDate] = useState(new Date());
  const [tag, setTag] = useState('');
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  // Function to handle adding a task (simplified for demonstration)
  const addTask = () => {
    console.log({ date, tag, task, time });
    // Here you would typically update a state or send data to a server
  };

  return (
    <div>
      {/* Date Picker */}
      <input type="date" value={date.toISOString().substring(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} />
      {/* Tag Selection */}
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Health">Health</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      {/* Task Input */}
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      {/* Time Input */}
      <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
      {/* Add Task Button */}
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Logger;