/**Input Goals Component
 * a simple form:
 * Heading
 * input box
 * save
*/
/**
 * psuedocode for the component
 * import react, useState and useEffect
 * import supabase from client
 * define function(react component) 
 * it will be a form 
 * form save button will send the input data to the db
 * that data will be displayed right below the form by 
 * fetching the data from the db table
 * with the option to edit and and delete 
 * * question here? is it best practice to do this, am i thinking
 * right in having the data move this way?
 * (they can hover over their goals and then see the option
 * of editing or deleting)
 * each goal should have its separate save button, 
 * for example if there are 2 goals and a user presses edit
 * where ever the goal is that field should change into a 
 * editable element where user can enter new goal and press save 
 * right next to it. 
 * another question
 * is this implementation complex? if yes i can keep just one
 * button to delete and later add an edit button
 * db table name is goals
 */
import React, { useState, useEffect } from 'react';
import supabase from "@/utils/supabase/client";


export default function InputGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Fetch goals from the database
  useEffect(() => {
    const fetchGoals = async () => {
      const { data, error } = await supabase.from('goals').select('*'); 
      // the upper "query" would not be * but a column form inside goals
      if (error) {
        console.error('Error fetching goals:', error);
      } else {
        setGoals(data);
      }
    };
    fetchGoals();
  }, []);

  // Add a new goal to the database
  useEffect(() => {
    const addGoal = async () => {
      const { data, error } = await supabase.from('goals').insert([{ text: newGoal }]);
      if (error) {
        console.error('Error adding goal:', error);
      } else {
        setGoals([...goals, ...data]);
        setNewGoal('');
      }
    }
  return (
    <div className={Styles.goalsForm}>
      
    </div>
  )
}
