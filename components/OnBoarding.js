import React, { useEffect, useState } from "react";
import WelcomeUser from "./WelcomeUser";
import GoalsForm from "./GoalsForm";
import Logger from "./Logger"; 
import ReturningUser from "./ReturningUser";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const OnBoarding = () => {
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const containerStyle = {
    width: '80%', // Adjust this to control the width of the Logger component
    height: '80%', // Adjust this to control the height of the Logger component
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // This will position the Logger component absolutely
    left: '50%', // This will center the Logger component horizontally
    top: '50%', // This will center the Logger component vertically
    transform: 'translate(-50%, -50%)', // This will ensure the Logger component is centered
    overflowY: 'scroll', // This will add a scrollbar if the content overflows
  };

  useEffect(() => {
    // Check if the user is returning or new here
    // and set the isReturningUser state accordingly
    // setIsReturningUser(checkIfUserIsReturning());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, so they are a returning user
        setIsReturningUser(true);
      } else {
        // No user is signed in
        setIsReturningUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleSetGoals = (newGoals) => {
    setGoals(newGoals);
    setStep(step + 1);
  };

  switch (step) {
    case 0:
      return <div style={containerStyle}><WelcomeUser onContinue={handleContinue} /></div>;
    case 1:
      return <div style={containerStyle}><GoalsForm onSetGoals={handleSetGoals} /></div>;
    case 2:
      return <div style={containerStyle}><Logger goals={goals} /></div>;
    default:
      return null;
  }
};

export default OnBoarding;
