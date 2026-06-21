import { useSelector } from "react-redux";
import './SpaceImageCarousel.css';

function SpaceImageCarousel() {
    const { images, loading, error } = useSelector((state) => state.spaceImages)

    const handleImageError = (imgUrl, event) => {
        event.target.style.display = 'none';
    }

    if (loading) return <p id="space-loader">Searching the universe...</p>;
    if (error) return <p id="space-loader-error">Error: {error}</p>;

    return (
        <div id="space-image-carousel">
            <div className="image-carousel-track">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        className="carousel-img"
                        onError={(e) => handleImageError(img, e)}
                    />
                ))}
            </div>
            <p>Space Images</p>
        </div>
    )
}

export default SpaceImageCarousel;