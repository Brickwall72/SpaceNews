import './Result.css';

const Result = ({onClick}) => {
    return (
        <div className="Result" onClick={onClick}>
            <h2>Result Title</h2>
            <p>Result description goes here...</p>
        </div>
    )
}

export default Result;