import React from "react";
import { Link } from 'react-router-dom';
import './ImageList.css'

function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '52px' }}>Close Your Eyes And Listen</h1>
            <h3 style={{ fontSize: '18px' }}>A new way of exploring the universe</h3>
            <div style={{ marginTop: '20px' }}>
                <Link to="/upload">
                    <button style={{ margin: '10px', padding: '130px 150px' }}>Build Your Own Symphony</button>
                </Link>
                <Link to="/predefined">
                    <button style={{ margin: '10px', padding: '130px 150px' }}>Escolher Imagem Pré-definida</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;