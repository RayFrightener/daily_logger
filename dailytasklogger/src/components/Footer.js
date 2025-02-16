import React from 'react';
import Styles from '@/styles/Footer.module.css';

export default function Footer({ onFeedbackClick }) {
    return (
        <div className={Styles.footer}>
            <div className={Styles.footerContent}>
                <button className={Styles.feedbackButton} onClick={onFeedbackClick}>Feedback</button>
            </div>
        </div>
    );
}