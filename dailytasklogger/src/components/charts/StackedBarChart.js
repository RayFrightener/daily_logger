import React, { useEffect, useState } from 'react';
import Styles from '@/styles/StackedBarChart.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import supabase from '@/utils/supabase/client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

dayjs.extend(utc);
dayjs.extend(timezone);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      min: 0,
      max: 12,
      ticks: {
        stepSize: 1,
        callback: function(value) {
            return `${value}h`;
        }
      }
    },
  },
};

export function StackedBarChart({ refresh }) {
    const [weeklyLogs, setWeeklyLogs] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    
    useEffect(() => {
      const fetchWeeklySummary = async () => {
          const now = dayjs().tz('America/New_York');
  
          // Get the most recent Monday (start of week)
          let startOfWeek = now.startOf('week').add(1, 'day').startOf('day'); // Monday 00:00
          let endOfWeek = startOfWeek.add(6, 'day').endOf('day'); // Sunday 23:59
  
          // Ensure Sunday night still shows the previous week's logs
          if (now.day() === 0 && now.hour() >= 0) {
              startOfWeek = now.subtract(1, 'week').startOf('week').add(1, 'day').startOf('day'); // Previous Monday 00:00
              endOfWeek = startOfWeek.add(6, 'day').endOf('day'); // Previous Sunday 23:59
          }
  
          console.log("Fetching logs from:", startOfWeek.format(), "to", endOfWeek.format());
  
          const { data, error } = await supabase
              .from('logs')
              .select(`
                  id,
                  goal_id,
                  start_time,
                  end_time,
                  log_date,
                  goals (name)
              `)
              .gte('log_date', startOfWeek.format('YYYY-MM-DD'))
              .lte('log_date', endOfWeek.format('YYYY-MM-DD'));
  
          if (error) {
              console.log('Error getting weekly summary', error);
          } else {
              setWeeklyLogs(data || []);
          }
      };
  
      fetchWeeklySummary();
  }, [refresh]);
  

    useEffect(() => {
        if (weeklyLogs.length > 0) {
            const aggregatedLogs = {};

            weeklyLogs.forEach(log => {
                const goalName = log.goals.name;
                const startTime = dayjs(`2025-02-11T${log.start_time}`);
                const endTime = dayjs(`2025-02-11T${log.end_time}`);
                const duration = endTime.diff(startTime, 'hour', true); // Calculate duration in hours
              
                if (!aggregatedLogs[goalName]) {
                  aggregatedLogs[goalName] = Array(7).fill(0); // Initialize array for 7 days
                }
              
                let dayOfWeek = dayjs(log.log_date).day(); // Get day of the week (0-6)
                // // Adjust dayOfWeek to start from Monday (0) to Sunday (6)
                dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                
                aggregatedLogs[goalName][dayOfWeek] += duration;
              });

``
            const labels = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const datasets = Object.keys(aggregatedLogs).map(goalName => ({
                label: goalName,
                data: aggregatedLogs[goalName],
                backgroundColor: getRandomColor(),
              }));
              
              setChartData({ labels, datasets });
        }
    }, [weeklyLogs]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

  return <Bar options={options} data={chartData} className={Styles.chartCanvas} />;
}
