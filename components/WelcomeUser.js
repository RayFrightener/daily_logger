import React from "react";

const WelcomeUser = ({ onContinue }) => {
  return (
    <div>
      <p>Welcome! Daily task logger was designed to get an overview of what your days look like so you can better analyze what your time is being spent on, and then make changes to your routine (add habits/etc) based on your goals and aspirations.</p>
      <button onClick={onContinue}>Continue</button>
    </div>
  )
};  

export default WelcomeUser;