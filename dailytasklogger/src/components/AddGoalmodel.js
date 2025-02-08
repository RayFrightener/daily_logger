import React, { useState } from "react";
import Styles from "@/styles/AddGoalModal.module.css";


export default function AddGoalModal({ isOpen, onClose, onSave }) {
    const [newGoal, setNewGoal] = useState('');
    const [message, setMessage] = useState('');


    const handleSave = () => {
        onSave(newGoal);
        setNewGoal('');
        setMessage('Goal saved!');
        setTimeout(() => setMessage(''), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Add New Goal</h2>
                <input 
                type="text"
                placeholder="Enter new goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                />
                <button className={Styles.saveButton} onClick={handleSave}>Save</button>
                {message && <p className={Styles.message}>{message}</p>}
            </div>
        </div>
    );
}