import { useState } from 'react';
import Result from '../Result/Result.jsx';
import './Results.css';
import './Modal.css';
import { useSelector } from 'react-redux';
import { selectSearchResults, selectIsLoading, selectFailedToLoad, selectErrorMessage } from '../../features/searchResultsSlice';

const Results = () => {
    const results = useSelector(selectSearchResults);
    const isLoading = useSelector(selectIsLoading);
    const failedToLoad = useSelector(selectFailedToLoad);
    const errorMessage = useSelector(selectErrorMessage);

    if (isLoading) return <p id="Results">Loading...</p>;
    if (failedToLoad) return <p id="Results">Failed to load results: {errorMessage}</p>;
    if (results.length === 0) return <p id="Results">No results found.</p>;

    const [selectedItem, setSelectedItem] = useState(null);
    if (results != null) {
        return (
            <div id="Results">
                {Array.from({ length: 8 }, (_, i) => (
                    <Result key={i} onClick={() => setSelectedItem(i)} />
                ))}
                {selectedItem!=null && (
                    <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={() => setSelectedItem(null)}>
                                &times;
                            </button>
                            <h2>Result Title</h2>
                            <p className="detailed-view">Detailed view content goes here.</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Results;