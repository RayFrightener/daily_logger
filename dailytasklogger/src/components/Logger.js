import React, { useState, useRef, useEffect } from "react";
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/Logger.module.css";

// logger function that fetches goals in a dropdown list
// has an input with a save button that inserts the selected goal, using
// perhaps goal id or some best practice way with duration inside the input field
// 
/**
 * 
 *  CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Ensure user owns log
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE, -- Links to a goal
    duration FLOAT NOT NULL, -- Hours spent (e.g., 1.5 for 1 hour 30 min)
    log_date DATE DEFAULT CURRENT_DATE, -- Auto-fills with today’s date
    created_at TIMESTAMP DEFAULT NOW() -- Log entry timestamp
);
 */

export default function Logger( { refresh }) {
    const [log, setLog] = useState('');
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchGoals = async () => {
            const { data, error } = await supabase.from('goals').select('id, name').select();
            if (error) {
                console.log('Error fetching goals:', error);
            } else {
                console.log('Goals fetched:', data);
                setGoals(data || []);
            }
        };

        fetchGoals();
    }, [refresh]);

    const saveLog = async () => {
        const { data, error } = await supabase.from('logs').insert([{ goal_id: selectedGoal, duration: parseFloat(log) }]);
        if (error) {
            console.log('Error logging:', error);
            throw error;
        } else {
            console.log('Successfully logged', data);
            setLog(''); // clear the input field after saving the log
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveLog();
        }
    };

    const handleSelectChange = (e) => {
        setSelectedGoal(e.target.value);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={Styles.logger}>
            <h2>Logger</h2>
            <select id="goals" value={selectedGoal} onChange={handleSelectChange}>

                <option value="">Select a goal</option>
                {goals.map((goal) =>(
                    <option key={goal.id} value={goal.id}>{goal.name}</option>
                ))}
            </select>
                <div className={Styles.inputButtonContainer}>
                <input
                className={Styles.logDuration}
                placeholder="Add duration (for e.g. 1.5 for 1.5 hrs)"
                value={log}
                onChange={(e) => setLog(e.target.value)}
                onKeyDown={handleKeyPress}
                ref={inputRef}
                />
                <button className={Styles.loggerButton} onClick={saveLog}>Log</button>
            </div>
        </div>
    );
}
