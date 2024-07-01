
import React, { useState } from 'react';
import  Link  from 'next/link';
import SignupModal from './SignupModal';  // Make sure this path is correct
import './LandingPage.css';

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
  };

  return (
    <div className="landingpage">
      <div className="video-container">
        <video controls className="demo-video">
          <source src="path_to_demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="signup-container">
        <button className="signup-button" onClick={openModal}>Sign Up or Sign in</button>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default LandingPage;

