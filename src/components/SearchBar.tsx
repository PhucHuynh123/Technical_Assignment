import React from 'react';

import '../styles/SearchBar.css';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;