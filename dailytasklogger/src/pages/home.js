import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";


export default function Home() {
  const [user, setUser] = useState(null);
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
  
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user &&  <p>Hello, {user.email}</p>}
    </div>
  );
}