// pages/home.js
import React from 'react';
import Home from '../components/Home';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Home />
    </div>
  );
}