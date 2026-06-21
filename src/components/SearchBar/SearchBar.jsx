import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../features/searchResultsSlice';
import './SearchBar.css';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(fetchSearchResults(searchTerm));
  }

  return (
    <div id="SearchBar">
      <input 
      type="text" 
      onSubmit={handleSubmit}
      placeholder="Search..." 
      value={searchTerm} 
      onChange={handleSearchChange} 
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} 
      />
      <button className="clear-search-button" disabled={searchTerm === ''} onClick={clearSearch}>&times;</button>
      <button className="search-button" onClick={handleSubmit} >&rarr;</button>
    </div>
  );
};

export default SearchBar;