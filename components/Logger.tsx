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
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Date Picker */}
      <input type="date" className="block w-full p-2 border border-gray-300 rounded mt-2 bg-white" value={date.toISOString().substring(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} />
      {/* Tag Selection */}
      <select className="block w-full p-2 border border-gray-300 rounded mt-4 bg-white" value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Health & Fitness">Health & Fitness</option>
        <option value="Work">Work</option>
        <option value="Education & Learning">Education & Learning</option>
        <option value="Skill Development">Personal</option>
        <option value="Career & Productivity">Career & Productivity</option>
        <option value="Personal Development">Personal Development</option>
        <option value="Social & Relationships">Social & Relationships</option>
        <option value="Hobbies & Leisure">Hobbies & Leisure</option>
        <option value="Household & Errands">Household & Errands</option>
        <option value="Financial Management">Financial Management</option>
        <option value="Rest & Relaxation">Rest & Relaxation</option>
      </select>
      {/* Task Input */}
      <input type="text" className="block w-full p-2 border border-gray-300 rounded mt-4 bg-white" value={task} onChange={(e) => setTask(e.target.value)} />
      {/* Time Input */}
      <input type="number" className="block w-full p-2 border border-gray-300 rounded mt-4 bg-white" value={time} onChange={(e) => setTime(e.target.value)} />
      {/* Add Task Button */}
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4" onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Logger;