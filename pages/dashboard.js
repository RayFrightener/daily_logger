// pages/DashboardPage.js
/* Your home page and all additional pages should each have a unique title. 
The contents for the document title, the text between the opening and 
closing <title> tags, are displayed in the browser tab, 
the list of open windows, the history, search results, 
and, unless redefined with <meta> tags, in social media cards. */

import React, { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';


const DashboardPage = () => {
  const [goals, setGoals] = useState([]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
    </div>
  );
};
export default DashboardPage;