import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchSearchResults, setSearchTerm} from '../../features/searchResultsSlice.js';
import Results from '../../components/results/Results.jsx';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const dispatch = useDispatch();

  useEffect(() => {
    if (q) {
      dispatch(fetchSearchResults(q));
      dispatch(setSearchTerm(q));
    }
  }, [q, dispatch]);

  return (
    <div id="SearchResultsPage">
      <Results />
    </div>
  )
}

export default SearchResultsPage