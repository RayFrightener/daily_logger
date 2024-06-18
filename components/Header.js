// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import SignOutButton from './SignOutButton';
import About from './About';
import Link from 'next/link';


const Header = () => {
  const [logs, setLogs] = useState([]);

  const onLog = (log) => {
    setLogs([...logs, log]);
  };
  useEffect(() => {
    //perform any side effects here such as fetching initial logs
  }, []);

  return (
    <div>
      <div className="signout-button-container">
        <SignOutButton />
      </div>
      <h1>Welcome to your Dashboard</h1>
      <p>This is the main logging area.</p>
    </div>
  );
};

export default Header;