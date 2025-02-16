import React, { useState } from 'react';
import Styles from '@/styles/FeedbackModal.module.css';


export default function FeedBackModal({ isOpen, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        onSubmit(name, feedback);
        setName('');
        setFeedback('');
    }

    if (!isOpen) return null;

    return (
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Submit Feedback</h2>
                <input 
                type='text'
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={Styles.inputField}
                />
                <textarea
                placeholder='Your Feedback'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={Styles.textarea}
                />
                <div className={Styles.buttonContainer}>
                    <button className={Styles.submitButton} onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}