// useState is used to store the URL of the selected image
import React, { useState } from "react";
import init, { generate_music_wasm } from "../wasm/wasm.js";
//import './ImageList.css';
import '../App.css';
    
/**
 * ImageUploader Component
 * Enables image selection from the local machine.
 *
 * @returns {JSX.Element} - component to upload and view images.
 */
const ImageUploader = () => {
    const [audioURL, setAudioURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [image, setImage] = useState(null);

  const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Verifica se o arquivo é uma imagem
        if (!file.type.startsWith('image/')) {
            setError('Please, select an image file');
            return;
        }
        setError(null);

        // Cria um objeto FileReader para leitura da imagem
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);    
        };
        reader.readAsDataURL(file); // Lê a imagem como uma URL

        // Inicia o upload do arquivo
        setLoading(true);
        try {
            await init();
            const arrayBuffer = await file.arrayBuffer();
            const imageBytes = new Uint8Array(arrayBuffer);

            const format = file.type === 'image/png' ? 'png' :
                           file.type === 'image/jpeg' ? 'jpg' :
                           file.type === 'image/tiff' ? 'tif' : 'png';
            const sample_rate = 44100;
            const freq1 = 220;
            const freq2 = 880;
            const durations = [400, 1000];
            const fade_in_duration = 0.1;
            const fade_out_duration = 0.3;

            const wavBytes = generate_music_wasm(
                imageBytes,
                format,
                sample_rate,
                freq1,
                freq2,
                durations,
                fade_in_duration,
                fade_out_duration
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

    return (
        <div style={{
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <div>
                <h1 style={{ color: '#CCC9DC' }}>Select an Image</h1>
                <input 
                    id="file-input" 
                    type="file" accept="image/png, image/jpeg, image/tiff" 
                    style={{ display: 'none' }} 
                    aria-label="Select image" 
                    onChange={handleFileChange}
                />
                <label
                    htmlFor="file-input"
                    className="label-button"
                >
                    Select Image
                </label>
            </div>

            <div>
                {loading && <p>Gerando música...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        style={{
                            width: '80%',  // Imagem cobre 80% da largura da página
                            height: 'auto', // Mantém a proporção da imagem
                            border: '1px solid #ccc',
                        }}
                    />
                )}
                {audioURL && (
                    <div>
                        <audio controls src={audioURL}></audio>
                        <button onClick={handleDownload}>Baixar Música</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;