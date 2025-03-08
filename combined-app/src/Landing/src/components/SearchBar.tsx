
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter the subject you would want to take a customized test on. Bring your A game!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-app-light-gray bg-opacity-90 text-gray-800 rounded-full px-6 py-3 pr-16 
                    focus:outline-none focus:ring-2 focus:ring-app-pink transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r 
                    from-yellow-400 to-orange-500 p-2 rounded-full hover:brightness-110 
                    transition-all duration-300"
        >
          🚀
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
