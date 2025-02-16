import React, { useState, useEffect, useRef } from "react";
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/EditLogModal.module.css";
import TimePickerComponent from "@/components/TimePickerComponent";
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#C7BEBE', // Change this to your desired color
      },
    },
  });

export default function EditLogModal({ isOpen, onClose, log, setRefresh }) {
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (log) {
            setStartTime(dayjs(`2025-02-11T${log.start_time}`));
            setEndTime(dayjs(`2025-02-11T${log.end_time}`));
        }
    }, [isOpen, log]);

    const handleUpdate = async () => {
        const formattedStartTime = startTime.format('HH:mm');
        const formattedEndTime = endTime.format('HH:mm');
        const { error } = await supabase
            .from('logs')
            .update({ start_time: formattedStartTime, end_time: formattedEndTime })
            .eq('id', log.id);
        if (error) {
            console.log('Error updating log:', error);
        } else {
            setMessage('Log updated!');
            setTimeout(() => {
                setMessage('');
                setRefresh(prev => !prev);
                onClose();
            }, 1500);
        }
    };

    if (!isOpen) return null;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Change duration of: {log.goals.name}</h2>
                <TimePickerComponent
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <div className={Styles.buttonMessageContainer}>
                    {message && <p className={Styles.message}>{message}</p>}
                    <button className={Styles.saveButton} onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    </ThemeProvider>
    );
}