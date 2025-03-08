
import React, { useState } from 'react';
import { User, Edit, X, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  level: string;
  testsCompleted: number;
  averageScore: number;
}

const ProfileCard: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    level: "Intermediate",
    testsCompleted: 42,
    averageScore: 78
  });
  const [editName, setEditName] = useState(profile.name);

  const handleSave = () => {
    if (editName.trim()) {
      setProfile({...profile, name: editName});
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const handleCancel = () => {
    setEditName(profile.name);
    setIsEditing(false);
  };

  return (
    <div className="glass-effect rounded-xl p-4 md:p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-app-coral">Your Profile</h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-app-cyan hover:text-app-pink transition-colors"
          >
            <Edit size={18} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <Check size={18} />
            </button>
            <button 
              onClick={handleCancel}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-app-pink/30 flex items-center justify-center">
          <User size={32} className="text-app-pink" />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-white/10 text-white border border-app-pink/50 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:border-app-pink"
            />
          ) : (
            <h4 className="text-xl font-semibold text-white mb-1">{profile.name}</h4>
          )}
          <div className="text-sm text-white/80">Level: {profile.level}</div>
        </div>
        
        <div className="flex gap-6 mt-3 sm:mt-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-app-cyan">{profile.testsCompleted}</div>
            <div className="text-xs text-white/70">Tests Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-app-pink">{profile.averageScore}%</div>
            <div className="text-xs text-white/70">Average Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
