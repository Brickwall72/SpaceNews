import { useState } from 'react';
import Result from '../result/Result.jsx';
import './Results.css';
import { useSelector } from 'react-redux';
import { selectSearchResults, selectIsLoading, selectFailedToLoad, selectErrorMessage } from '../../features/searchResultsSlice.js';

const Results = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const results = useSelector(selectSearchResults);
    const isLoading = useSelector(selectIsLoading);
    const failedToLoad = useSelector(selectFailedToLoad);
    const errorMessage = useSelector(selectErrorMessage);

    if (isLoading) return <p id="Results">Loading...</p>;
    if (failedToLoad) return <p id="Results">Failed to load results: {errorMessage}</p>;
    if (results.length === 0) return <p id="Results">No results found.</p>;

    
    if (results != null) {
        return (
            <div id="Results">
                {results.map((result, i) => (
                    <Result 
                        key={i} 
                        isModal={false} 
                        onClick={() => setSelectedItem(i)} 
                        data={result} />
                ))}
                {selectedItem!=null && (
                    <Result 
                        key={selectedItem} 
                        isModal={true} 
                        onClick={()=> setSelectedItem(null)}
                        data={results[selectedItem]} />
                )}
            </div>
        )
    }
}

export default Results;