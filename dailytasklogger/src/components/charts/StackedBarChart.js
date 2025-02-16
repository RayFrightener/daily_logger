import React, { useEffect, useState } from 'react';
import Styles from '@/styles/StackedBarChart.module.css';
import dayjs from 'dayjs';
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
            const startOfWeek = dayjs().startOf('week').add(-6, 'day').format('YYYY-MM-DD');
            const endOfWeek = dayjs().endOf('week').add(-6, 'day').format('YYYY-MM-DD');

            const { data, error } = await supabase
            .from('logs')
            .select(`
              id,
              goal_id,
              start_time,
              end_time,
              log_date,
              goals (
                name
              )
            `)
            .gte('log_date', startOfWeek)
            .lte('log_date', endOfWeek);

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
                dayOfWeek = (dayOfWeek + 6) % 7;
                
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
