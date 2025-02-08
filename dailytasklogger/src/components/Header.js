"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";
import GoogleButton from './GoogleButton';
import styles from "../styles/Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleSignInWithGoogle = useCallback(async (response) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });
    if (error) {
      console.error("Error signing in with Google:", error);
    } else {
      console.log("Signed in with Google:", data);
      setUser(data.user);
      router.push("/home");
    }
  }, [router]);

  useEffect(() => {
    window.handleCredentialResponse = handleSignInWithGoogle;
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setUser(session?.user ?? null);
      }
    };
    fetchSession();
  }, [handleSignInWithGoogle]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {router.pathname === "/" && <h1 className={styles.headerTitle}>Welcome</h1>}
        {router.pathname === "/home" && <h1 className={styles.headerTitle}>Home</h1>}
        {user ? (
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </button>
        ) : (
        <GoogleButton />
        )}
      </div>
    </header>
  );
}