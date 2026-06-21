import { useState } from 'react';
import { Outlet, Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, setSearchTerm } from '../../features/searchResultsSlice.js';
import SearchBar from '../../components/searchBar/SearchBar.jsx';
import './WelcomePage.css';

function WelcomePage() {
    const dispatch = useDispatch();

    const stateSearchTerm = useSelector(selectSearchTerm);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        dispatch(setSearchTerm(''));
    };
    
    return (
        <div id="WelcomePage" className={stateSearchTerm ? 'search-mode' : 'home-mode'}>
            <h1><Link id="SiteTitle" onClick={clearSearch} to='/'>Space News</Link></h1>
            <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearchChange={handleSearchChange}
                clearSearch={clearSearch}
            />
            {stateSearchTerm && (
                <p id="search-results-label">showing results for "{stateSearchTerm}"</p>
            )}
            <Outlet />
        </div>
    )
}

export default WelcomePage