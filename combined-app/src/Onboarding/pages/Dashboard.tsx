
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-appPurple-deeper to-appPurple-dark flex flex-col items-center justify-center p-6">
      <div className="glass rounded-3xl p-8 max-w-2xl w-full text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
        <p className="text-lg mb-8 text-white/80">
          This is a blank dashboard page after successful authentication.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-appPink to-appPurple hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
