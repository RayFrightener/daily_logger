import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";
import Styles from "@/styles/home.module.css";

//components
import AddGoalModal from "@/components/AddGoalModal";
import GoalsList from "@/components/GoalsList";
import Logger from "@/components/Logger"; 
import Charts from "@/components/charts/Charts"; 
import LogSummary from "@/components/LogSummary"; 
import FeedBackModal from "@/components/FeedbackModal";
import Footer from "@/components/Footer";


export default function Home() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
      }
    };

    fetchSession();
  }, [router]);

  const handleAddGoal = async (newGoal) => {
    if (newGoal.trim() === '') return;

    const { data, error } = await supabase.from('goals').insert([{ name: newGoal }]).select();
    if (error) {
      console.error('Error adding goal:', error);
    } else if (data) {
      console.log('Added goal:', data)
      setRefresh(prev => !prev);
    }
  }

  const handleFeedbackSubmit = async (name, feedback) => {
    const { data, error } = await supabase.from('suggestions').insert([{ name: name, suggestion_text: feedback}])
    if (error) {
      console.error('Error inserting feedback', error);
    } else {
      console.log('feedback submitted', data);
      setIsFeedbackModalOpen(false);
    }
  }; 

  return (
    <div className={Styles.page}>
      <div className={Styles.content}>
        <div className={Styles.buttonWrapper}>
          <button className={Styles.addGoalButton} onClick={() => setIsModalOpen(true)}>Define Goals</button>
        </div>
        <div className={Styles.gridContainer}>
          <div className={Styles.section1And4}>
            <div className={Styles.section1}>
              <GoalsList className={Styles.goalsList} refresh={refresh} setRefresh={setRefresh}/>
            </div>
            <div className={Styles.section4}>
              <Logger refresh={refresh} setRefresh={setRefresh}/>
            </div>
          </div>
          <div className={Styles.section2}>
            <Charts refresh={refresh}/>
          </div>
          <div className={Styles.section3}>
            <LogSummary refresh={refresh} setRefresh={setRefresh}/>
          </div>
        </div>
        <AddGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddGoal}
        />
        <FeedBackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          onSubmit={handleFeedbackSubmit}
        />
      </div>
      <Footer onFeedbackClick={() => setIsFeedbackModalOpen(true)} />
    </div>
  );
}