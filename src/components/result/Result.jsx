import './Result.css';
import './Modal.css';

const Result = ({ isModal, onClick, data }) => {
    const {title, summary, url, image_url, news_site} = data;
    return (
        <div className={`Result ${isModal ? 'modal' : ''}`} onClick={onClick}>
            <div className="modal-backdrop" onClick={() => isModal? onClick() : {}}>
                <div className="modal-content" onClick={(e) => isModal? e.stopPropagation() : {}}>
                    <button className="modal-close-btn" onClick={() => isModal? onClick() : {}}>
                        &times;
                    </button>
                    <h2 className="article-title"><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h2>
                    <h3 className="article-source">{news_site}</h3>
                    <img className="article-image" src={image_url} alt={title} />
                    <p className="summary">{summary}</p>
                </div>
            </div>
        </div>
    )
}

export default Result;