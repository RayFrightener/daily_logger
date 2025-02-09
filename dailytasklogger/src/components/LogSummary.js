import React, { useState, useEffect } from "react";
import supabase from "@/utils/supabase/client";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Styles from '@/styles/LogSummary.module.css';
import EditLogModal from '@/components/EditLogModal';
//**LogSummary.js
// fetch goalname from goal id within logs table
// alongside it display the duration for that goal during that day
// at the bottom display total duration: xy hrs 
// for example use goal_id from logs table to get the name
// from goals table and display the goalname + the duration from
// the logs table associated with that goal
// have it be for the current day*/

export default function LogSummary({ refresh, setRefresh }) {
    const [dailySummary, setDailySummary] = useState([]);
    const [isEditModalOpen, setIsEditModelOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    //use effect to fetch the logs

    useEffect(() => {
        const fetchDailySummary = async () => {
            const { data, error } = await supabase
                .from('logs')
                .select('id, goal_id, duration, goals(name)') // Reference related table
                .eq('log_date', new Date().toISOString().split('T')[0]);
    
            if (error) {
                console.log('Error fetching daily summary:', error);
            } else {
                setDailySummary(data || []);
            }
        };
        fetchDailySummary();
    }, [refresh]);
    // function delete daily log
    const deleteLog = async (id) => {
        const { error } = await supabase.from('logs').delete().eq('id', id);
        if (error) {
            console.log('Error deleting log:', error);
        } else {
            setRefresh(prev => !prev);
        }
    };
    
    const openEditLogModal = (log) => {
        setSelectedLog(log);
        setIsEditModelOpen(true);
    }

    return (
        <div className={Styles.dailySummmary}>
            <h3>Log summary for the day</h3>
            {dailySummary.map((log) => {
                <div key={log.id} className={Styles.logItem}>
                    <span>{log.goals.name}: {log.duration} hrs</span>
                    <button className={Styles.dailyLogButtons} onClick={() => openEditLogModal(log)}>
                        <FaEdit />
                    </button>
                    <button className={Styles.dailyLogButtons} onClick={() => deleteLog(log.id)}>
                        <FaTrash />
                    </button>
                </div>
            })}
            <EditLogModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModelOpen(false)}
            log={selectedLog}
            setRefresh={setRefresh}
            />
        </div>
    );
}
