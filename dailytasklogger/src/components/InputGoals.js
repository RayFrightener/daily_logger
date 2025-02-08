import React, { useState, useEffect } from 'react';
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/InputGoals.module.css";

export default function InputGoals({ refresh }) {
  // const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const { data, error } = await supabase.from('goals').select('id, name');
    if (error) {
      console.log('Error fetching goals:', error);
    } else {
      console.log('fetched goals:', data);
      setGoals(data || []);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [refresh]);

  // const addGoal = async () => {
  //   if (goal.trim() === '') return;

  //   const { data, error } = await supabase.from('goals').insert([{ name: goal }]).select();
  //   if (error) {
  //     console.error('Error adding goal:', error);
  //   } else if (data) {
  //     console.log('Added goal:', data);
  //     setGoals((prevGoals) => [...prevGoals, data[0]])
  //     setGoal('');
  //   }
  // };

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) {
      console.error('Error deleting goal:', error);
    } else {
      setGoals(goals.filter(goal => goal.id !== id)); //update the goals state to remove the deleted goal
    }
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     addGoal();
  //   }
  // };

  return (
    <div className={Styles.goalsForm}>
      <h2>Input Goals</h2>
      {/* <input 
      type="text"
      value={goal}
      onChange={(e) => setGoal(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Enter a goal"
      /> */}
      {/* <button onClick={addGoal}>Save</button> */}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.name}
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
            </li>
        ))}
      </ul>
    </div>
  )
}