// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// // import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' ,
//     },
//     title: {
//       display: true,
//       text: 'Daily Goals Duration',
//     },
//   },
// };

// //have goals as labels

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// // have durations as data
// export const data = {
//   labels,
//   datasets: [
//     {
//     //   label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)', //i need a brownish color that goes will with my color scheme
//     }
//   ],
// };

// export function GanttDailyChart() {
//   return <Bar options={options} data={data} />;
// }
