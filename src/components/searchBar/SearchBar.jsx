import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchSearchResults, setSearchTerm as setStateSearchTerm } from '../../features/searchResultsSlice';
import './SearchBar.css';

const SearchBar = ({searchTerm, setSearchTerm, handleSearchChange, clearSearch}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(fetchSearchResults(searchTerm));
    dispatch(setStateSearchTerm(searchTerm));
    navigate({
      pathname: '/search',
      search: `?q=${searchTerm}`
    })
    setSearchTerm('');
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