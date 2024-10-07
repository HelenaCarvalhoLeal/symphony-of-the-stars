import React, { useEffect, useState } from 'react';
import init, { generate_music_wasm } from "../wasm/wasm.js";
import './ImageList.css';
import ImageCard from './imagemCard';
import localImages from './imagesAssets';

const ImageList = () => {
    const MAX_IMAGES = 5;
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [draggedImage, setDraggedImage] = useState(null);
    const [droppedImages, setDroppedImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        proportion: '',
        duration: ''
    });
    const [audioURL, setAudioURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [sampleRate, setSampleRate] = useState(44100);
    const [frequ1, setFreq1] = useState(220);
    const [frequ2, setFreq2] = useState(880);
    const [durationsToneIn, setDurationsToneIn] = useState(400);
    const [durationsToneFinal, setDurationsToneFinal] = useState(100);
    const [fade_in, setFade_in] = useState(0.1);
    const [fade_out, setFade_out] = useState(0.3);
    const [ratio, setRatio] = useState("20x20");

    const handleFileChange = async (link) => {
        // const [ratioX, ratioY] = formData.proportion.match(/(\d+)x(\d+)/).slice(1, 3);

        setLoading(true);
        try {
            const response = await fetch(link);
            console.log(response);
            if (!response.ok) {
                throw new Error('Erro ao baixar a imagem.');
            }

            const imageArrayBuffer = await response.arrayBuffer();
            const imageBytes = new Uint8Array(imageArrayBuffer);

            await init();

            const format = response.url.endsWith('.png') ? 'png' :
                            response.url.endsWith('.jpg') || response.url.endsWith('.jpeg') ? 'jpg' :
                            response.url.endsWith('.tif') || response.url.endsWith('.tiff') ? 'tif' : 'png'; // Default para png
            // const sample_rate = 44100;
            // const freq1 = 220;
            // const freq2 = 880;
            // const durations = [400, 1000];
            // const fade_in_duration = 0.1;
            // const fade_out_duration = 0.3;
            const durations = [durationsToneIn, durationsToneFinal];
            const [ratioX, ratioY] = ratio.match(/(\d+)x(\d+)/).slice(1, 3);
            console.log(ratioX, ratioY);

            const wavBytes = generate_music_wasm(
                imageBytes,
                format,
                sampleRate,
                frequ1,
                frequ2,
                durations,
                fade_in,
                fade_out,
                ratioX,
                ratioY,
            );

            const blob = new Blob([wavBytes], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
        } catch (err) {
            console.error(err);
            setError('Falha ao gerar música.');
        } finally {
            setLoading(false);
        }
    };


    const handleDownload = () => {
        if (!audioURL) return;
        const link = document.createElement('a');
        link.href = audioURL;
        link.download = 'generated_music.wav';
        link.click();
    };

    useEffect(() => {
        setImages(localImages);
    }, []);

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
        if (droppedImages.length >= MAX_IMAGES) {
            setErrorMessage(`Você só pode adicionar até ${MAX_IMAGES} imagens.`);
            setDraggedImage(null);
            setIsModalOpen(false);
            return
        }
        setDroppedImages((prevImages) => [
            ...prevImages,
            { ...draggedImage, proportion: formData.proportion, duration: formData.duration }
        ]);
        setDraggedImage(null);
        setIsModalOpen(false);
        setErrorMessage('')
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
            </div>

            <div className="drop-zone">
                {/* <button onClick={() => {setIsModalOpen(true)}}>Open Config Sound</button> */}
                <h2>Central Area</h2>
                <div className="box-drop-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
                    {droppedImages.map((image) => {
                        return (
                            <div key={image.id} className="dropped-image">
                                <img src={image.location} alt="image" width="200" />
                                <p>{`Proporção: ${image.proportion}, Duração da música: Previsão em desenvolvimento`}</p>
                                <button onClick={() => { handleFileChange(image.location) }}>Gerar</button>
                            </div>
                        )
                    })}
                </div>

                {audioURL && (
                    <div className="audio-container">
                        {loading && <p>Generating Music...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {audioURL && (
                            <div>
                                <audio controls src={audioURL}></audio>
                                <button onClick={handleDownload}>Download Music</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mensagem de erro no modal */}
                        <h3>Configure Image</h3>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Image Proportion:
                                <input
                                    type="text"
                                    value={formData.proportion}
                                    onChange={(e) => {
                                        setFormData({ ...formData, proportion:  e.target.value});
                                        setRatio(e.target.value);
                                    }}
                                    placeholder="Ex: 20x20"
                                />
                                Quanto maior a propoção maior o arquivo, a duração e mais demorado será sua conversão.
                            </label>
                            <br />

                            <label>
                                Taxa de amostragem:
                                <input
                                    type="text"
                                    onChange={(e) => setSampleRate(e.target.value)}
                                    placeholder="Ex: 44100"
                                />
                            </label>
                            <br />

                            <label>
                                Frequência 1:
                                <input
                                    type="text"
                                    onChange={(e) => setFreq1(e.target.value)}
                                    placeholder="Ex: 220"
                                />
                            </label>
                            <br />

                            <label>
                                Frequência 2:
                                <input
                                    type="text"
                                    onChange={(e) => setFreq2(e.target.value)}
                                    placeholder="Ex: 880"
                                />
                            </label>
                            <br />

                            <label>
                                Duração do tom inicial:
                                <input
                                    type="text"
                                    onChange={(e) => setDurationsToneIn(e.target.value)}
                                    placeholder="Ex: 400"
                                />
                            </label>
                            <br />

                            <label>
                                Duração do tom final:
                                <input
                                    type="text"
                                    onChange={(e) => setDurationsToneFinal(e.target.value)}
                                    placeholder="Ex: 1000"
                                />
                            </label>
                            <br />

                            <label>
                                Duração do desbotamento inicial:
                                <input
                                    type="text"
                                    onChange={(e) => setFade_in(e.target.value)}
                                    placeholder="Ex: 0.1"
                                />
                            </label>
                            <br />

                            <label>
                                Duração do desbotamento inicial::
                                <input
                                    type="text"
                                    onChange={(e) => setFade_out(e.target.value)}
                                    placeholder="Ex: 0.3"
                                />
                            </label>
                            <br />

                            <button type="submit">Confirmar</button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageList;
