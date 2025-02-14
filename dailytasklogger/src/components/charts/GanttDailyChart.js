import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import Styles from '@/styles/GanttDailyChart.module.css'
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
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
        borderWidth: 2,
        barThickness: 1, // Adjust the bar thickness
        categoryPercentage: 0.5, // Adjust the category percentage
        barPercentage: 0.5, // Adjust the bar percentage
      },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'top',
      min: 5,
      max: 24,
      ticks: {
        callback: function(value) {
          return dayjs().startOf('day').add(value, 'hour').format('HH:mm');
        }
      }
    }
  },
  plugins: {
    title: {
      display: true,
    },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      callbacks: {
        label: function(context) {
          const startTime = dayjs().startOf('day').add(context.raw.x[0], 'hour').format('HH:mm');
          const endTime = dayjs().startOf('day').add(context.raw.x[1], 'hour').format('HH:mm');
          return `${startTime} - ${endTime}`;
        }
      }
    }
  },
  hover: {
    animationDuration: 0, // Disable animation on hover
  },
  animation: {
    duration: 0, // General animation time
  }
};


export default function GanttDailyChart() {
  const [dailyLogs, setDailyLogs] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchDailyLogs = async () => {
      const todayDate = new Date().toLocaleDateString('en-CA');
      console.log('Filtering logs for date:', todayDate);

      const { data, error } = await supabase
        .from('logs')
        .select(`
          id,
          goal_id,
          start_time,
          end_time,
          goals!inner (
            name
          )
        `)
        .eq('log_date', todayDate);

      if (error) {
        console.log('Error fetching daily summary:', error);
      } else {
        console.log('Fetched logs:', data);
        setDailyLogs(data || []);
      }
    };
    fetchDailyLogs();
  }, []);

  useEffect(() => {
    if (dailyLogs.length > 0) {
      const labels = dailyLogs.map(log => log.goals.name);
      const datasets = [{
        label: 'Duration',
        data: dailyLogs.map(log => {
          const startTime = dayjs(`2025-02-11T${log.start_time}`);
          const endTime = dayjs(`2025-02-11T${log.end_time}`);
          const duration = endTime.diff(startTime, 'hour', true);

          return {
            x: [Math.floor(startTime.hour() + startTime.minute() / 60), Math.floor(endTime.hour() + endTime.minute() / 60)],
            y: log.goals.name,
            duration: duration
          };
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }];

      setChartData({
        labels,
        datasets
      });
    }
  }, [dailyLogs]);

  return (
    <div className={Styles.chartContainer}>
      <Bar options={options} data={chartData} className={Styles.chartCanvas} />
    </div>
  );
}