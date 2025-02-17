import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import supabase from "@/utils/supabase/client";
import LandingPageContent from "../components/LandingPageContent";
import ImageSection from "../components/ImageSection";
import styles from "../styles/index.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/home");
      }
    };
    checkUser();
  }, [router]);
  
  return (
    <div className={styles.page}>
      <Head>
        <title>Daily Task Logger</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <LandingPageContent />
          </div>
          <div className={styles.right}>
            <ImageSection />
          </div>
        </div>
      </main>
    </div>
  );
}