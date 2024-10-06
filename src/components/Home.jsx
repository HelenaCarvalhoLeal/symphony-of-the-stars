import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Bem-vindo à Aplicação de Imagens</h1>
            <div style={{ marginTop: '20px' }}>
                <Link to="/upload">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Selecionar Imagem do Computador</button>
                </Link>
                <Link to="/predefined">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Escolher Imagem Pré-definida</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;