//SignOut component that signs out the user when the button is clicked.
//The signOut function is imported from the auth module in the firebase package.
//The auth module is also imported to access the auth object.
//The handleSignOut function calls the signOut function with the auth object.

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router'

const SignOutButton = () => {
  const router = useRouter()
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOutButton;