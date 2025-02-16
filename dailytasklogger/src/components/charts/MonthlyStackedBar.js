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

export function MonthlyStackedBarChart({ refresh }) {
    const [monthlyLogs, setMonthlyLogs] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    
    useEffect(() => {
        const fetchMonthlySummary = async () => {
            const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');

            console.log('Fetching logs from:', startOfMonth, 'to:', endOfMonth);
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
            .gte('log_date', startOfMonth)
            .lte('log_date', endOfMonth);

            if (error) {
                console.log('Error getting monthly summary', error);
            } else {
                console.log('Fetched monthly logs', data);
                setMonthlyLogs(data || []);
            }
        };

    fetchMonthlySummary();
    }, [refresh]);
    useEffect(() => {
        if (monthlyLogs.length > 0) {
            const aggregatedLogs = {};

            monthlyLogs.forEach(log => {
                const goalName = log.goals.name;
                const startTime = dayjs(`2025-02-11T${log.start_time}`);
                const endTime = dayjs(`2025-02-11T${log.end_time}`);
                const duration = endTime.diff(startTime, 'hour', true); // Calculate duration in hours
              
                console.log('log:', log);
                console.log('Duration:', duration);
                if (!aggregatedLogs[goalName]) {
                    aggregatedLogs[goalName] = Array(dayjs().daysInMonth()).fill(0); // Initialize array for days in the month
                  }
              
                let dayOfMonth = dayjs(log.log_date).date() - 1; // Get day of the month (1-31) and adjust to 0-based index
                
                aggregatedLogs[goalName][dayOfMonth] += duration;
              });

              console.log('Aggregated Logs:', aggregatedLogs); // Debug statement
              
              const labels = Array.from({ length: dayjs().daysInMonth() }, (_, i) => i + 1); // Labels for each day of the month
              const datasets = Object.keys(aggregatedLogs).map(goalName => ({
                label: goalName,
                data: aggregatedLogs[goalName],
                backgroundColor: getRandomColor(),
              }));
              
              setChartData({ labels, datasets });
        }
    }, [monthlyLogs]);

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
