// /**
//  * chart component:
//  * 2 buttons on top: daily/weekly
//  * daily gantt chart
//  * weekly stacked bar chart
//  */

// import React, { useState } from "react";
// import GanttDailyChart from "./GanttDailyChart";

// export default function Charts() {
//     const [selectedChart, setSelectedChart] = useState('gantt');

//     const renderCharts = () => {
//         switch (selectedChart) {
//             case 'gantt':
//                 return <GanttDailyChart />;
//             case 'stackedBar':
//                 return;
//         }
//     };

//     return (
//         <div className={Styles.chartsContainer}>
//             <div className={Styles.chartButtons}>
//                 <button onClick={() => setSelectedChart('gantt')}>Daily</button>
//                 <button onClick={() => setSelectedChart('stackedBar')}>Weekly</button>
//             </div>
//             <div className={Styles.charContent}>
//                 {renderCharts()}
//             </div>
//         </div>
//     )
// }
