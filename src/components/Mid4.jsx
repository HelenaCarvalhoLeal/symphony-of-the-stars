import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mid4.css'; // Certifique-se de importar o CSS

function Mid4() {
  const texto = "They cannot see the vibrant colors and cosmic formations that Webb reveals, but this does not mean they are disconnected from the vastness and wonder of the cosmos.";
  const palavras = texto.split(' '); // Divide o texto em palavras
  const [mostrarBotao, setMostrarBotao] = useState(false); // Controla a visibilidade do botão
  const palavrasPorLinha = 7; // Número de palavras por linha
  const numeroDeLinhas = 4; // Número de linhas que queremos exibir

  useEffect(() => {
    // Define um atraso para mostrar o botão após 3 segundos
    const timer = setTimeout(() => {
      setMostrarBotao(true); // Exibe o botão após a exibição do texto
    }, 3000); // Espera 3 segundos para mostrar o botão

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  const linhas = [];
  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas.push(palavras.slice(i * palavrasPorLinha, (i + 1) * palavrasPorLinha));
  }

  return (
    <div className='Intro fade-in' style={{ fontSize: '32px', fontFamily: 'Garamond' }}>
      {linhas.map((linha, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          {linha.map((palavra, j) => (
            <span key={j} style={{ margin: '0 5px' }}>
              {palavra}
            </span>
          ))}
        </div>
      ))}
      {/* Botão que aparece suavemente */}
      {mostrarBotao && (
        <Link to="/mid5">
          <button>Next</button>
        </Link>
      )}
    </div>
  );
}

export default Mid4;
