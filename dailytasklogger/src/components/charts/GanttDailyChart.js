import React, { useEffect, useState } from 'react';
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
    },
  },
  responsive: true,
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
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Daily Logs',
    },
  },
};


//define the problem 
/**
 * we have data in the structure of id, goal_id, start_time, end_time as objects
 */
// update labels dynamically with the goals,
const labelss = dailyLogs.map((data) => 
    data.goals.name
))
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// update log data dynamically as soon as there is a new log
export const data = {
  labels,
  datasets: [
    {
      label: 'DailyLogs',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};
/** Define the problem and break it down into smaller problems
 * need a custom gantt chart created by using chart.js horizontal bar chart
 * where x-top is will have the hours of the day starting from 5:00 am till 12:00 am
 * y-left will be a list of goals and the duration has to be spread along the y-top 
 * dependent on the duration, for example if the start time: 7:00 and end time: 8:00
 * then parallel to the x-top daily timeline, plot the time duration  
 */

export function GanttDailyChart() {
    const [dailyLogs, setDailyLogs] = useState([]);
        
    useEffect(() => {
        const fetchDailyLogs = async () => {
            const todayDate = new Date().toLocaleDateString('en-CA'); //toISOString().split('T')[0]
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

  return (
    <div>
        <Bar options={options} data={data} />
    </div>
  )
}

