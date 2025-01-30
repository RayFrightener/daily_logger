"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase/client";
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
      {user ? (
        <button onClick={handleSignOut} className={styles.signInButton}>
          Sign Out
        </button>
      ) : (
        <>
          <div
            id="g_id_onload"
            data-client_id="992190689462-ts8jtjd9m7r9fd3ofl38d6ibnn9vf0s2.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_select="true"
            data-itp_support="true"
            data-use_fedcm_for_prompt="true"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </>
      )}
    </header>
  );
}