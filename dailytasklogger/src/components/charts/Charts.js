import React, { useState } from "react";
import GanttDailyChart from "./GanttDailyChart";
import Styles from "@/styles/Charts.module.css";

export default function Charts({ refresh }) {
    const [selectedChart, setSelectedChart] = useState('gantt');

    const renderCharts = () => {
        switch (selectedChart) {
            case 'gantt':
                return <GanttDailyChart refresh={refresh} />;
            case 'stackedBar':
                return <div>Weekly Stacked Bar Chart Placeholder</div>;
            default:
                return null;
        }
    };

    return (
        <div className={Styles.chartsContainer}>
            <div className={Styles.chartButtons}>
                <button onClick={() => setSelectedChart('gantt')}>Daily</button>
                <button onClick={() => setSelectedChart('stackedBar')}>Weekly</button>
            </div>
            <div className={Styles.chartContent}>
                {renderCharts()}
            </div>
        </div>
    );
}