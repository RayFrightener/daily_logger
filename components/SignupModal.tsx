// src/components/SignupModal.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { useRouter } from 'next/router';
import ReturningUser from './ReturningUser';
import './SignupModal.css';


type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const router = useRouter(); // initialize useRouter

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  console.log("Modal isOpen:", isOpen);
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'show' : 'hidden'}`}>
      {isReturningUser ? (
        <ReturningUser onClose={onClose} />
      ) : (
        <div className="bg-white p-5 rounded-md w-11/12 max-w-sm">
          <span className="cursor-pointer absolute top-3 right-2.5 text-2xl" onClick={onClose}>&times;</span>
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required className="input w-full border border-gray-300 p-2 rounded"/>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required className="input w-full border border-gray-300 p-2 rounded" />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
          </form>
          <button type="button" className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600" id="googleSignup" onClick={handleGoogleSignUp}>Sign Up with Google</button>
          
          <button type="button" className="mt-4 w-full text-center p-2 underline" onClick={() => setIsReturningUser(true)}>Already have an account? Log in</button>
        </div>
      )}
    </div>
  );
};

export default SignupModal;
