import React from "react";
import styles from "../styles/LandingPageContent.module.css";

export default function LandingPageContent() {
  return (
    <div className={styles.text}>
      <h2>What?</h2>
      <p>The <strong>Daily Task Logger</strong> is a powerful yet simple tool created for lifelong learners. It helps you track and analyze the progress of the areas you care about and want to improve. By logging your daily tasks, it provides meaningful, visual insights into how you're spending your time.</p>
      
      {/* <hr /> */}

      <h2>Why?</h2>
      <ul>
        <li><strong>Mindfulness Made Simple</strong>: Stay mindful of your priorities by tracking your progress.</li>
        <li><strong>Insightful Visualizations</strong>: Get clear, easy-to-understand visual summaries of your efforts.</li>
        <li><strong>Improved Focus</strong>: Reflect on how your time is spent and align it with your goals.</li>
      </ul>
      
      {/* <hr /> */}

      <h2>How?</h2>
      <ol>
        <li><strong>Define Your Focus Areas</strong>: Start by broadly defining the areas you want to improve or track (e.g., learning, fitness, creativity).</li>
        <li><strong>Log Your Tasks</strong>: After completing a task or at the end of your day, simply log the time you spent on each activity.</li>
        <li><strong>View Your Progress</strong>: The app transforms your logs into visual reports, helping you see your efforts and identify trends over time.</li>
      </ol>
      
      {/* <hr /> */}

      <h2>When?</h2>
      <ul>
        <li><strong>Throughout Your Day</strong>: Log tasks as you complete them.</li>
        <li><strong>At Day’s End</strong>: Reflect and record all tasks completed during the day.</li>
      </ul>
    </div>
  );
}