import React, { useEffect, useRef, useState } from "react";
import Styles from "@/styles/AddGoalModal.module.css";


export default function AddGoalModal({ isOpen, onClose, onSave }) {
    const [newGoal, setNewGoal] = useState('');
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    },[isOpen]);

    const handleSave = () => {
        onSave(newGoal);
        setNewGoal('');
        setMessage('Goal saved!');
        setTimeout(() => setMessage(''), 2000);
    };

    if (!isOpen) return null;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleSave();
        }
    };

    return (
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Define your goals</h2>
                <input 
                type="text"
                placeholder="Type in your goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className={Styles.inputField}
                onKeyDown={handleKeyPress}
                ref={inputRef}
                />
                <div className={Styles.buttonMessageContainer}>
                {message && <p className={Styles.message}>{message}</p>}
                <button className={Styles.saveButton} onClick={handleSave}>Define</button>
                </div>
            </div>
        </div>
    );
}