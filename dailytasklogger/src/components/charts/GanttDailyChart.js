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
        stepSize: 1,
        callback: function(value) {
          return dayjs().startOf('day').add(value, 'hour').format('hh:mm A');
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
          const startTime = dayjs().startOf('day').add(context.raw.x[0], 'hour').format('hh:mm A');
          const endTime = dayjs().startOf('day').add(context.raw.x[1], 'hour').format('hh:mm A');
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


export default function GanttDailyChart({ refresh }) {
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
  }, [refresh]);

  useEffect(() => {
    console.log('Daily Logs', dailyLogs);
    if (dailyLogs.length > 0) {
      // step 1; initialize an empty object to store aggregate log by goal
      const aggregatedLogs = {};
      // step 2: iterate over dailyLogs
      dailyLogs.forEach(log => {
        const goalName = log.goals.name;
        const startTime = dayjs(`2025-02-11T${log.start_time}`);
        const endTime = dayjs(`2025-02-11T${log.end_time}`);

        // step 3: aggregate logs
        if(!aggregatedLogs[goalName]) {
          aggregatedLogs[goalName] = [];
        } 
        aggregatedLogs[goalName].push({ startTime, endTime });
      });

      // step 4 convert object back to array for plotting
      const labels = Object.keys(aggregatedLogs);
      const datasets = [{
        label: 'Duration',
        data: labels.flatMap(goalName => {
          return aggregatedLogs[goalName].map(({ startTime, endTime }) => {
            const startHour = startTime.hour();
            const startMinute = startTime.minute();
            const endHour = endTime.hour();
            const endMinute = endTime.minute();

            return {
              x: [startHour + startMinute / 60, endHour + endMinute / 60],
              y: goalName,
              duration: `${endHour - startHour}h ${endMinute - startMinute}m`
            };
          });
        }),
        backgroundColor: 'rgba(166, 157, 157, 0.5)', // Darker Shade of Background
        borderColor: 'rgba(166, 157, 157, 1)', // Darker Shade of Background
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