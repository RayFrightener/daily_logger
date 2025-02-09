import React, { useState, useRef, useEffect } from "react";
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/Logger.module.css";

export default function Logger( { refresh, setRefresh }) {
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
            setRefresh(prev => !prev);
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
