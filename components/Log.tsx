import React, { useEffect, useState } from 'react';

const Log = () => {
  const [logs, setLogs] = useState<{ message: string }[]>([]);

  const onLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Fetch initial logs and set them
    // For example:
    // fetchLogs().then((initialLogs) => setLogs(initialLogs));
  }, []);

  return (
    <div className="log-container">
      {logs.map((log, index) => (
        <p key={index}>{log.message}</p> // Assuming log is an object with a message property
      ))}
    </div>
  );
};

export default Log;