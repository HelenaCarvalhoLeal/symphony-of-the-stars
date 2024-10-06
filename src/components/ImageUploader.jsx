// useState is used to store the URL of the selected image
import React, { useState } from "react";
import './ImageList.css';

/**
 * ImageUploader Component
 * Enables image selection from the local machine.
 *
 * @returns {JSX.Element} - component to upload and view images.
 */
const ImageUploader = () => {
    // image will store the URL of the selected image
    const [image, setImage] = useState(null); 
    const [error, setError] = useState(null); 

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

    return (
        // main container that centralizes the content
        <div style={{
                textAlign: 'center',
                marginTop: '20px'
            }}>
            <div>
                <h1 style={{ color: '#CCC9DC' }}>Select an Image</h1>
                <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    aria-label="Select image"
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '400px',
                            border: '1px solid #ccc' ,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageUploader;