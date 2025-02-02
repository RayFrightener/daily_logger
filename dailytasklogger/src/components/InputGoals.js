/**Input Goals Component
 * a simple form:
 * Heading
 * input box
 * save
*/
/**
 * psuedocode for the component
 * define react component
 * a form 
 * form: save button will send the input data to the db
 * data will be displayed as a list right below the form
 * with the hoverable button option to edit and and delete 
 * editing: goal should have a separate save button,
 */

/**
 * Where do we want to stop right now?
 * input + save + display
 * in future 
 * edit + delete
 */
import React, { useState, useEffect } from 'react';
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/InputGoals.module.css";

export default function InputGoals() {
  // start with form input
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);


  useEffect(() => {
    const fetchGoals = async () => {
      const { data, error } = await supabase.from('goals').select('id','name');
      if (error) {
        console.error('Error fetching goals:', error);
      } else {
        setGoals(data);
      }
    };
    fetchGoals();
  }, []);

  const addGoal = async () => {
  // Check if goal is empty after trimming leading and trailing whitespace
    if (goal.trim() === '') return;
  // Insert the goal into the 'name' column of the 'goals' table
    const { data, error } = await supabase.from('goals').insert([{ name: goal}]);
    if (error) {
      console.error('Error adding goal:', error);
    } else {
      setGoals([...goals, ...data]); // Update the goals state with the new goal
      setGoal(''); // clear the input field after saving 
    }
  }

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) {
      console.error('Error deleting goal:', error);
    } else {
      setGoals(goals.filter(goal => goal.id !== id)); //update the goals state to remove the deleted goal
    }
  };

  return (
    <div className={Styles.goalsForm}>
      <h2>Input Goals</h2>
      <input 
      type="text"
      value={goal}
      onChange={(e) => setGoal(e.target.value)}
      placeholder="Enter a goal"
      />
      <button onClick={addGoal}>Save</button>
      <ul>
        {goals.map((goal) => {
          <li key={goal.id}>
            {goal.name}
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
            </li>
        })}
      </ul>
    </div>
  )

}