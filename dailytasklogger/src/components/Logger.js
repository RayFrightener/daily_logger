import React, { useState, useRef, useEffect } from "react"; 
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/Logger.module.css";
import TimePickerComponent from "@/components/TimePickerComponent";
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#C7BEBE', 
      },
    },
  });

export default function Logger( { refresh, setRefresh }) {
    const [log, setLog] = useState('');
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());   
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchGoals = async () => {
            const { data, error } = await supabase.from('goals').select('id, name').eq('deleted', false).select();
            if (error) {
                console.log('Error fetching goals:', error);
            } else {
                setGoals(data || []);
            }
        };

        fetchGoals();
    }, [refresh]);

    const saveLog = async () => {
        if (!selectedGoal) {
            setErrorMessage('Please select a goal');
            return;
        }
        setErrorMessage('');

        const todayDate = new Date().toLocaleDateString('en-CA');
        const formattedStartTime = startTime.format('HH:mm');
        const formattedEndTime = endTime.format('HH:mm');
        const { data, error } = await supabase.from('logs').insert([{ 
            goal_id: selectedGoal, 
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            log_date: todayDate }]);
        if (error) {
            console.log('Error logging:', error);
            throw error;
        } else {
            setLog(''); 
            setRefresh(prev => !prev);
        }
    };

    const handleSelectChange = (e) => {
        setSelectedGoal(e.target.value);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={Styles.logger}>
                <h2>Logger</h2>
                <select id="goals" value={selectedGoal} onChange={handleSelectChange}>
                    <option value="">Select a goal</option>
                    {goals.map((goal) => (
                        <option key={goal.id} value={goal.id}>{goal.name}</option>
                    ))}
                </select>
                <TimePickerComponent
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <div className={Styles.inputButtonContainer}>
                    {errorMessage && <span className={Styles.errorMessage}>{errorMessage}</span>}
                    <button className={Styles.loggerButton} onClick={saveLog}>Log</button>
                </div>
            </div>
        </ThemeProvider>
    );
}