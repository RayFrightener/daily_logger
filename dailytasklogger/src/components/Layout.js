import React from "react";
import Header from "./Header";
import Script from "next/script";
// import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <Header />
      <main>{children}</main>
    </div>
  );
}