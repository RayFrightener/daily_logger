import React, { useState, useEffect } from 'react';
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/GoalsList.module.css";

export default function GoalsList({ refresh, setRefresh }) {
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

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) {
      console.error('Error deleting goal:', error);
    } else {
      setGoals(goals.filter(goal => goal.id !== id)); //update the goals state to remove the deleted goal
      setRefresh(prev => !prev); // Trigger a refresh
    }
  };

  return (
    <div className={Styles.goalsForm}>
      <h2>Always be mindful of your goals!</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <span>{goal.name}</span>
            <button onClick={() => deleteGoal(goal.id)}>×</button>
            </li>
        ))}
      </ul>
    </div>
  )
}