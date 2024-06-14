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
      return <WelcomeUser onContinue={handleContinue} />;
    case 1:
      return <GoalsForm onSetGoals={handleSetGoals} />;
    case 2:
      return <Logger goals={goals} />;
    default:
      return null;
  }
};

export default OnBoarding;
