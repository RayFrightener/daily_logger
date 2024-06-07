// src/components/SignupModal.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { useRouter } from 'next/router';
import ReturningUser from './ReturningUser';
import './SignupModal.css';

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const router = useRouter(); // initialize useRouter

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up with email and password', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up with Google', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      {isReturningUser ? (
        <ReturningUser onClose={onClose} />
      ) : (
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
          <button type="button" className="btn" id="googleSignup" onClick={handleGoogleSignUp}>Sign Up with Google</button>
          <button type="button" onClick={() => setIsReturningUser(true)}>Already have an account? Log in</button>
        </div>
      )}
    </div>
  );
};

export default SignupModal;
