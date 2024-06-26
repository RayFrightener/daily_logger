// pages/DashboardPage.js
/* Your home page and all additional pages should each have a unique title. 
The contents for the document title, the text between the opening and 
closing <title> tags, are displayed in the browser tab, 
the list of open windows, the history, search results, 
and, unless redefined with <meta> tags, in social media cards. */

import React, { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Logger from '../components/Logger';
import Log from '../components/Log';
import Visualizations from '../components/Visualizations';


const DashboardPage: React.FC = () => {
  const [goals, setGoals] = useState([]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-1/3 bg-gray-100 p-4 rounded">
          <Log />
        </div>
        <div className="w-1/3 bg-gray-100 p-4 rounded">
          <Logger />
        </div>
       <div className="w-1/3 bg-gray-100 p-4 rounded">
          <Visualizations />
        </div>    
      </div>
    </div>
  );
};
export default DashboardPage;