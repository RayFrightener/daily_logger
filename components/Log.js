import React, {useEffect, useState} from "react";

const Log = () => {
  const [logs, setLogs] = useState([]);

  const onLog = (log) => {
    setLogs([...logs, log]);
  }; 
  useEffect(() => {
    //perform any side effects here such as fetching initial logs
  }, []);

  return(
    <div className="log-container">
    {logs.map((log, index) => (
      <p key={index}>{log}</p>
    ))} 
    </div>
  );
};

export default Log;
