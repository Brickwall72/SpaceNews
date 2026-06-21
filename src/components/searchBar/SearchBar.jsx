import { useNavigate } from 'react-router';
import './SearchBar.css';

const SearchBar = ({searchTerm, setSearchTerm, handleSearchChange, clearSearch}) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchTerm.trim()) return;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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