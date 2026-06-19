import { useState } from 'react';
import Result from '../Result/Result.jsx';
import './Results.css';
import './Modal.css';

const Results = () => {
    const [selectedItem, setSelectedItem] = useState(null);

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
                        <p className="detailed-view">lorem1000</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Results;