import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import GoogleButton from '@/components/GoogleButton';
import './Index.css';

const Index = () => {
  const words = [
    // Computer Science & Tech
    'PROGRAMMER', 'DEVELOPER', 'SOFTWARE ENGINEER', 'DATA SCIENTIST', 'CYBERSECURITY ANALYST', 'IT MANAGER',
  
    // Science
    'PHYSICIST', 'CHEMIST', 'BIOLOGIST', 'ASTRONOMER', 'GEOLOGIST', 'MICROBIOLOGIST',
  
    // Mathematics
    'MATHEMATICIAN', 'STATISTICIAN', 'ACTUARY', 'DATA ANALYST', 'OPERATIONS RESEARCHER',
  
    // Medicine & Health
    'DOCTOR', 'NURSE', 'SURGEON', 'PHARMACIST', 'THERAPIST', 'RADIOLOGIST', 'DENTIST',
  
    // Engineering
    'MECHANICAL ENGINEER', 'CIVIL ENGINEER', 'ELECTRICAL ENGINEER', 'AEROSPACE ENGINEER', 'ROBOTICS ENGINEER', 'AUTOMOTIVE ENGINEER',
  
    // Humanities & Social Sciences
    'HISTORIAN', 'LINGUIST', 'PSYCHOLOGIST', 'SOCIOLOGIST', 'PHILOSOPHER', 'ECONOMIST', 'POLITICAL SCIENTIST',
  
    // Arts & Literature
    'AUTHOR', 'POET', 'NOVELIST', 'SCREENWRITER', 'SCULPTOR', 'PAINTER', 'ILLUSTRATOR', 'GRAPHIC DESIGNER',
  
    // Business & Finance
    'ACCOUNTANT', 'INVESTOR', 'MARKETER', 'ENTREPRENEUR', 'ECONOMIST', 'FINANCIAL ANALYST', 'BANKER',
  
    // Law & Politics
    'LAWYER', 'JUDGE', 'SENATOR', 'DIPLOMAT', 'PROSECUTOR', 'NOTARY', 'POLICY ANALYST',
  
    // Environmental Studies
    'ECOLOGIST', 'ENVIRONMENTAL SCIENTIST', 'CONSERVATIONIST', 'WILDLIFE BIOLOGIST', 'SUSTAINABILITY CONSULTANT',
  
    // Space & Astronomy
    'ASTRONAUT', 'ASTROPHYSICIST', 'SATELLITE ENGINEER', 'PLANETARY SCIENTIST', 'SPACE RESEARCHER',
  
    // Sports & Physical Education
    'ATHLETE', 'COACH', 'GYM TRAINER', 'REFEREE', 'SPORTS ANALYST', 'PHYSICAL THERAPIST',
  
    // Media & Entertainment
    'JOURNALIST', 'NEWS ANCHOR', 'ACTOR', 'DIRECTOR', 'PRODUCER', 'RADIO HOST'
  ];
  
  
 
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Set initial random word immediately
    setCurrentWordIndex(Math.floor(Math.random() * words.length));

    const interval = setInterval(() => {
      // Pick a random word index each time
      setCurrentWordIndex(Math.floor(Math.random() * words.length));
    }, 1000); // 2000ms = 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="index-container">
      {/* Background gradient overlay */}
      <div className="background-overlay" />
      
      {/* Main content container */}
      <div className="content-container">
        {/* Left side with logo and content */}
        <div className="left-content">
          {/* Logo */}
          <div className="logo-container">
           {/*  <Logo className="text-4xl md:text-5xl" /> */}
          </div>
          
          {/* Main content */}
          <div className="glass-card">
            <div className="card-content">
              <h1 className="headline">
                Give us your 10 Minutes, become a better <br></br>
                <span className="gradient-text-wrapper">
                  <span className="gradient-text" key={currentWordIndex}>
                    {words[currentWordIndex]}
                  </span>
                </span>
              </h1>
              
              <div className="button-container">
                <button className="get-started-button">
                  <span>Get Started Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                
               
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side with illustration */}
        <div className="right-content">
          <div className="illustration-container">
            <div className="glow-effect" />
            <img 
              src="./public/greektrans-removebg.png" 
              alt="Philosopher statue" 
              className="illustration-image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;