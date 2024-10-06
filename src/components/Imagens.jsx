import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ImageList.css';
import ImageCard from './imagemCard';
const ImageList = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [draggedImage, setDraggedImage] = useState(null);
    const [droppedImages, setDroppedImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        proportion: '',
        duration: ''
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get(`https://api.jwstapi.com/all/type/jpg?page=${page}&perPage=10`);

                if (response.data.statusCode === 200) {
                    console.log(response.data)
                    setImages((prevImages) => [...prevImages, ...response.data.body]);
                } else {
                    console.error('Erro na resposta da API:', response.data.error);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchImages();
    }, [page]);

    const handleDragStart = (image) => {
        setDraggedImage(image);
    };

    const handleDrop = () => {
        if (draggedImage) {
            setIsModalOpen(true);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDroppedImages((prevImages) => [
            ...prevImages,
            { ...draggedImage, proportion: formData.proportion, duration: formData.duration }
        ]);
        setDraggedImage(null);
        setIsModalOpen(false);
        setFormData({ proportion: '', duration: '' });
    };

    return (
        <div className="container">
            <div className="image-list">
                <h2>JWST Images</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {images.map((image) => (
                        <ImageCard key={image.id} imageData={image} handleDragStart={handleDragStart} />

                    ))}
                </div>
                <button onClick={() => setPage((prevPage) => prevPage + 1)}>
                    Carregar mais
                </button>
            </div>

            <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
                <h2>Central Area</h2>
                {droppedImages.map((image) => (
                    <div key={image.id} className="dropped-image">
                        <img src={image.location} alt={image.details.description} width="200" />
                        <p>{`Proporção: ${image.proportion}, Duração da música: ${image.duration}`}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Configurar imagem</h3>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Proporção da imagem:
                                <input
                                    type="text"
                                    value={formData.proportion}
                                    onChange={(e) => setFormData({ ...formData, proportion: e.target.value })}
                                    placeholder="Ex: 20x20"
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Duração da música (segundos):
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="Ex: 120"
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Confirmar</button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageList;
