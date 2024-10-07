import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Mid2() {
  const texto = "Webb launched on Dec. 25th 2021. It does not orbit around the Earth like the Hubble Space Telescope, it orbits the Sun 1.5 million kilometers (1 million miles) away from the Earth at what is called the second Lagrange point or L2.";
  const palavras = texto.split(' '); // Divide o texto em palavras
  const [mostrarBotao, setMostrarBotao] = useState(false); // Controla a visibilidade do botão
  const [indice, setIndice] = useState(0); // Indica quantas palavras devem ser exibidas por linha
  const palavrasPorLinha = 7; // Número de palavras por linha
  const numeroDeLinhas = 6; // Número de linhas que queremos exibir

  useEffect(() => {
    // Cria um intervalo para atualizar o índice a cada 166ms
    const atraso = setTimeout(() => {
      const intervalo = setInterval(() => {
        setIndice((prevIndice) => {
          if (prevIndice < palavrasPorLinha * numeroDeLinhas) {
            return prevIndice + 1; // Avança o índice até a quantidade máxima de palavras
          } else {
            clearInterval(intervalo); // Para o intervalo ao alcançar o limite
            setMostrarBotao(true); // Exibe o botão após a exibição do texto
            return prevIndice; // Retorna o último índice
          }
        });
      }, 50); // Atualiza a cada 166ms

      return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar o componente
    }, 500); // Atraso de 1 segundo (1000ms)

    return () => clearTimeout(atraso); // Limpa o timeout se o componente desmontar antes do atraso
  }, []);

  const linhas = [];
  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas.push(palavras.slice(i * palavrasPorLinha, (i + 1) * palavrasPorLinha));
  }

  return (
    <div className='Intro' style={{ fontSize: '32px', fontFamily: 'Garamond' }}>
      {linhas.map((linha, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          {linha.slice(0, indice - i * palavrasPorLinha).map((palavra, j) => (
            <span className='fade-in' key={j} style={{ margin: '0 5px' }}>
              {palavra}
            </span>
          ))}
        </div>
      ))}
      {/* Botão que aparece suavemente */}
      {mostrarBotao && (
        <Link to='/mid3'>
            <button>Next</button>
        </Link>
      )}
    </div>
  );
}

export default Mid2