// useState is used to store the URL of the selected image
import React, { useState } from "react";

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
                <h1>Select an Image</h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: '20px' }}
                    aria-label="Select image"
                />
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