import React, { useState } from "react";
import GanttDailyChart from "./GanttDailyChart";
import { MonthlyStackedBarChart } from "./MonthlyStackedBar";
import { StackedBarChart } from "./StackedBarChart";
import Styles from "@/styles/Charts.module.css";

export default function Charts({ refresh }) {
    const [selectedChart, setSelectedChart] = useState('gantt');

    const renderCharts = () => {
        switch (selectedChart) {
            case 'gantt':
                return <GanttDailyChart refresh={refresh} />;
            case 'stackedBar':
                return <StackedBarChart refresh={refresh} />;
            case 'monthlyStackedBar':
                return <MonthlyStackedBarChart refresh={refresh} />;
            default:
                return null;
        }
    };

    return (
        <div className={Styles.chartsContainer}>
            <div className={Styles.chartButtons}>
                <button onClick={() => setSelectedChart('gantt')}>Daily</button>
                <button onClick={() => setSelectedChart('stackedBar')}>Weekly</button>
                <button onClick={() => setSelectedChart('monthlyStackedBar')}>Monthly</button>
            </div>
            <div className={Styles.chartContent}>
                {renderCharts()}
            </div>
        </div>
    );
}