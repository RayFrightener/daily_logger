import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";
import InputGoals from "@/components/InputGoals";
import Styles from "@/styles/home.module.css";
import AddGoalModal from "@/components/AddGoalmodel";

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
    <div>
      <h1>Welcome to the Home Page</h1>
      {user &&  <p>Hello, {user.email}</p>}
      <button onClick={() => setIsModalOpen(true)}>Add Goal</button>
      <InputGoals refresh={refresh} />
      <AddGoalModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleAddGoal}
      />
    </div>
  );
}