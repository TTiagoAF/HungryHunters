import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ImagemPlanta.css';

const ImagemPlanta = () => {
  const navigate = useNavigate();
  const [planta, setPlanta] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = 'https://localhost:7286';

  const handleImagemChange = (event) => {
    const plantaselecionada = Array.from(event.target.files);

    if (planta.length + plantaselecionada.length > 1) {
      setErrorMessage('Limite máximo de 1 imagem');
      return;
    }

    setErrorMessage('');
    setPlanta([...planta, ...plantaselecionada]);
  };

  const handleEleminarImagem = (index) => {
    const plantaAtualizada = [...planta];
    plantaAtualizada.splice(index, 1);
    setPlanta(plantaAtualizada);
  };

  const handleSubmit = () => {
    if(planta.length == 0)
    {
        return setErrorMessage("Campo obrigatório")
    }
    try {
      const formData = new FormData();
      formData.append('arquivo', planta);

      const response = fetch(`${apiUrl}/api/Restaurantes/AdicionarRestaurante`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planta)
      });
    
      if (response.ok) {
        console.log('Nova conta adicionada na API');
      } else {
        const dataerro = response.json();
      console.error('Erro na operação:', dataerro);
      console.error('Erro ao adicionar nova conta na API', dataerro.mensagem);
      setErrorMessage(dataerro.mensagem);
      throw new Error('Erro ao adicionar nova conta na API');
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
    console.log("Submetido", planta)
    navigate("/RestauranteMenu/")
  }

  return (
    <div>
      <h1 className='titulo-principal'>Inserir imagem da planta completa com as mesas numeradas de um até ao número de mesas</h1>
      <input
        type="file"
        id="file-input"
        accept="image/png,image/jpeg"
        onChange={handleImagemChange}
        multiple
        style={{display: 'none'}}
        className='file-input'
      />
      <label htmlFor="file-input" className="adicionar-button">
        Adicionar Imagem
      </label>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div className="ver-imagem">
        {planta.map((planta, index) => (
          <div key={index} className="imagem-container">
            <img src={URL.createObjectURL(planta)} alt={`Imagem ${index + 1}`} />
            <div className="imagem-buttons">
              <button className='eliminar-button' onClick={() => handleEleminarImagem(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <button className='submeter-button' onClick={handleSubmit}>Submeter imagem</button>
    </div>
  );
};

export default ImagemPlanta;