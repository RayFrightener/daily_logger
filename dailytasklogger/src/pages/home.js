import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";
import GoalsList from "@/components/GoalsList";
import Styles from "@/styles/home.module.css";
import AddGoalModal from "@/components/AddGoalmodel";
// import Logger from "@/components/Logger"; // Placeholder for Logger component
// import Chart from "@/components/Chart"; // Placeholder for Chart component
// import DailySummary from "@/components/DailySummary"; // Placeholder for DailySummary component


export default function Home() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className={Styles.page}>
      {user &&  <p>Hello, {user.email}</p>}
      <div className={Styles.section1}>
        <button className={Styles.addGoalButton} onClick={() => setIsModalOpen(true)}>Define Goals</button>
        <GoalsList refresh={refresh} />
      </div>
      <div className={Styles.section2}>
        {/* <Chart /> */}
      </div>
      <div className={Styles.section3}>
        {/* <DailySummary /> */}
      </div>
      <div className={Styles.section4}>
        {/* <Logger /> */}
      </div>
      <AddGoalModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleAddGoal}
      />
    </div>
  );
}