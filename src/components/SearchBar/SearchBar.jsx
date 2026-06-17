import { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div id="SearchBar">
      <input 
      type="text" 
      placeholder="Search..." 
      value={searchTerm} 
      onChange={handleSearchChange} 
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} 
      />
      <button className="clear-search-button" onClick={clearSearch}>&times;</button>
    </div>
  );
};

export default SearchBar;