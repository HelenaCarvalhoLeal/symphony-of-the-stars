// useState is used to store the URL of the selected image
import React, { useState } from "react";
import init, { generate_music_wasm } from "../wasm/wasm.js";

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

    // function to manipulate the image selection
    const handleImageChange = (event) => {
        // access the first image selected
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please, select an image file');
                return;
            }
            setError(null);

            // object for asynchronous file reading
            const reader = new FileReader();
            
            // event triggered when reading is complete
            reader.onloadend = () => {
                setImage(reader.result);
            };

            // initiates file reading as data url 
            reader.readAsDataURL(file);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            // Inicialize o módulo WebAssembly
            await init();

            // Leia os bytes do arquivo
            const arrayBuffer = await file.arrayBuffer();
            const imageBytes = new Uint8Array(arrayBuffer);

            // Defina os parâmetros (ajuste conforme necessário)
            const format = file.type === 'image/png' ? 'png' :
                           file.type === 'image/jpeg' ? 'jpg' :
                           file.type === 'image/tiff' ? 'tif' : 'png'; // Padrão para png
            const sample_rate = 44100;
            const freq1 = 220;
            const freq2 = 880;
            const durations = [400, 1000];
            const fade_in_duration = 0.1;
            const fade_out_duration = 0.3;

            // Chame a função WebAssembly
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

            // Crie um Blob a partir dos bytes
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
        // main container that centralizes the content
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
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="file-input"
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#324A5F',
                        color: 'white',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        fontWeight: 'bold',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B2A41'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#324A5F'}
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
                            maxWidth: '100%',
                            maxHeight: '400px',
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