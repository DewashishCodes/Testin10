
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon } from 'lucide-react';
import Logo from '@/components/Logo';
import TopicButton from '@/components/TopicButton';
import SearchBar from '@/components/SearchBar';
import InfinityGraphic from '@/components/InfinityGraphic';
import ProfileCard from '@/components/ProfileCard';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState("featured");

  const categories = [
    { id: "featured", name: "Featured" },
    { id: "programming", name: "Programming" },
    { id: "medical", name: "Medical" },
    { id: "business", name: "Business" },
  ];

  // Only show 9 topics total
  const topics = {
    featured: [
      "JavaScript", "Business Ethics", "Anatomy", "World History", 
      "Psychology", "Data Science", "Marketing", "Physics", "Literature"
    ],
    programming: [
      "JavaScript", "Python", "React", "Data Structures",
      "Algorithms", "Machine Learning", "Web Development", "DevOps", "Databases"
    ],
    medical: [
      "Anatomy", "Pharmacology", "Pathology", "Biochemistry",
      "Physiology", "Neurology", "Cardiology", "Immunology", "Pediatrics"
    ],
    business: [
      "Marketing", "Finance", "Economics", "Management",
      "Entrepreneurship", "Business Ethics", "Accounting", "Strategy", "Leadership"
    ]
  };

  const handleTopicClick = (topic: string) => {
    toast({
      title: "Topic Selected",
      description: `Preparing your "${topic}" quiz...`,
    });
    // Here you would redirect to the quiz page or set up the quiz state
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Custom Topic",
      description: `Creating a custom quiz on "${query}"...`,
    });
    // Here you would handle the custom topic search
  };

  return (
    <div className="min-h-screen bg-app-dark-purple overflow-hidden">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center">
        <Logo />
        <Link 
          to="/settings" 
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 
                     hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
        >
          <SettingsIcon size={isMobile ? 16 : 20} className="text-white" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {/* Profile Section */}
        <div className="my-6 md:my-8">
          <ProfileCard />
        </div>
        
        {/* 10 Questions = ... Section */}
        <div className="my-8 md:my-12 px-4">
          <InfinityGraphic />
        </div>

        {/* Search Bar */}
        <div className="my-8 md:my-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Preset Topics Section */}
        <div className="mt-12">
          <p className="text-white/80 text-center mb-6 md:mb-8 px-4">
            Select from our preset topics. Based on the most popularly assessed skills.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 md:px-5 md:py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-white/20 text-app-pink' 
                    : 'bg-transparent text-white/70 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Topic Buttons - 3x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics[selectedCategory as keyof typeof topics].map((topic, index) => (
              <TopicButton 
                key={`${selectedCategory}-${index}`} 
                name={topic} 
                onClick={() => handleTopicClick(topic)} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
