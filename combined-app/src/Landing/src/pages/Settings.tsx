
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Volume2, Languages, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-app-dark-purple p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="text-white hover:text-app-pink transition-colors duration-300 flex items-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>

        <div className="space-y-6 bg-white/5 backdrop-blur-md rounded-xl p-6">
          <div className="setting-group">
            <h2 className="text-xl font-semibold text-app-pink mb-4">Display</h2>
            <div className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <Moon className="mr-3 text-app-cyan" size={20} />
                <span>Dark Mode</span>
              </div>
              <div className="w-12 h-6 bg-gray-600 rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="setting-group">
            <h2 className="text-xl font-semibold text-app-pink mb-4">Sound & Language</h2>
            <div className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <Volume2 className="mr-3 text-app-cyan" size={20} />
                <span>Sound Effects</span>
              </div>
              <div className="w-12 h-6 bg-app-cyan rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <Languages className="mr-3 text-app-cyan" size={20} />
                <span>Language</span>
              </div>
              <select className="bg-transparent border border-app-pink rounded-md px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-app-pink">
                <option value="en" className="bg-app-dark-purple">English</option>
                <option value="es" className="bg-app-dark-purple">Spanish</option>
                <option value="fr" className="bg-app-dark-purple">French</option>
              </select>
            </div>
          </div>
          
          <div className="setting-group">
            <h2 className="text-xl font-semibold text-app-pink mb-4">Notifications</h2>
            <div className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <Bell className="mr-3 text-app-cyan" size={20} />
                <span>Daily Reminders</span>
              </div>
              <div className="w-12 h-6 bg-app-cyan rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
