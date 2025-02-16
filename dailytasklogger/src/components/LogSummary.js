import React, { useState, useEffect } from "react";
import supabase from "@/utils/supabase/client";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Styles from '@/styles/LogSummary.module.css';
import EditLogModal from '@/components/EditLogModal';
import dayjs from 'dayjs';

export default function LogSummary({ refresh, setRefresh }) {
    const [dailySummary, setDailySummary] = useState([]);
    const [isEditModalOpen, setIsEditModelOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        const fetchDailySummary = async () => {
            const todayDate = new Date().toLocaleDateString('en-CA'); //toISOString().split('T')[0]

            const { data, error } = await supabase
                .from('logs')
                .select(`
                    id,
                    goal_id,
                    start_time,
                    end_time,
                    goals (
                        name
                    )
                `)
                .eq('log_date', todayDate);
                
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
        <div className={Styles.dailySummary}>
            <h3>Daily summary</h3>
            {dailySummary.map((log) => (
                <div key={log.id} className={Styles.logItem}>
                    <span>
                        {log.goals ? log.goals.name: 'Removed'}: 
                        {dayjs(`2025-02-11T${log.start_time}`).format('hh:mm A')} - 
                        {dayjs(`2025-02-11T${log.end_time}`).format('hh:mm A')} 
                    </span>
                    <button className={Styles.dailyLogButtons} onClick={() => openEditLogModal(log)}>
                        <FaEdit />
                    </button>
                    <button className={Styles.dailyLogButtons} onClick={() => deleteLog(log.id)}>
                        <FaTrash />
                    </button>
                </div>
            ))}
            <EditLogModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModelOpen(false)}
            log={selectedLog}
            setRefresh={setRefresh}
            />
        </div>
    );
}
