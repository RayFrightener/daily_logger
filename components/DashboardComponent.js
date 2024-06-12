// src/components/Dashboard.js
import React, { useEffect } from 'react';
import SignOutButton from './SignOutButton';

const DashboardPage = () => {
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
      {/* You can render your logs here */}
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};

export default DashboardPage;