import { useState } from "react";
import './ImageCard.css'; // Importando o CSS

const ImageCard = ({ imageData, handleDragStart }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="image-card">
            <div className="image-card-inner" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Lado da frente com a imagem */}
                <div
                    className="image-card-front"
                    draggable
                    onDragStart={() => handleDragStart(imageData)}
                >
                    <img
                        src={imageData.location}
                        alt={imageData.details.description}
                    />
                </div>

                <div className="image-card-back">
                    <h4 className="description-title">{imageData.details.description}</h4>

                    <ul className="instrument-list">
                        {imageData.details.instruments.map((instrument, index) => (
                            <li key={index} className="instrument-item">
                                {instrument.instrument}
                            </li>
                        ))}
                    </ul>

                    <button className="button-flip" onClick={handleFlip}>
                        Flip Image
                    </button>
                </div>
            </div>
            <button className="button-show-details" onClick={handleFlip}>
                {isFlipped ? 'Flip Image' : 'See Details'}
            </button>
        </div>
    );
};

export default ImageCard;
