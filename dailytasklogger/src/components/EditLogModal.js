import React, { useState, useEffect, useRef } from "react";
import supabase from "@/utils/supabase/client";
import Styles from "@/styles/EditLogModal.module.css";

export default function EditLogModal({ isOpen, onClose, log, setRefresh }) {
    const [newDuration, setNewDuration] = useState('');
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleUpdate = async () => {
        const { error } = await supabase
            .from('logs')
            .update({ duration: parseFloat(newDuration) })
            .eq('id', log.id);
        if (error) {
            console.log('Error updating log:', error);
        } else {
            setMessage('Log updated!');
            setNewDuration('');
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
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Edit Log for {log.goals.name}</h2>
                <input
                type="text"
                placeholder="Type in new duration for the goal"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className={Styles.inputField}
                onKeyDown={handleKeyPress}
                ref={inputRef}
                />
                <div className={Styles.buttonMessageContainer}>
                    {message && <p className={Styles.message}>{message}</p>}
                    <button className={Styles.saveButton} onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}