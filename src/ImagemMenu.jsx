import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ImagemMenu.css';

const ImagemMenu = () => {
  const [imagem, setImagem] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleImagemChange = (event) => {
    const imagemselecionada = Array.from(event.target.files);

    if (imagem.length + imagemselecionada.length > 5) {
      setErrorMessage('Limite máximo de 5 imagens alcançado.');
      return;
    }

    setErrorMessage('');
    setImagem([...imagem, ...imagemselecionada]);
  };

  const handleEleminarImagem = (index) => {
    const imagemAtualizada = [...imagem];
    imagemAtualizada.splice(index, 1);
    setImagem(imagemAtualizada);
  };

  const handleSubmit = () => {
    if(imagem.length == 0)
    {
        return setErrorMessage("Campo obrigatório")
    }
    console.log("Submetido", imagem)
    navigate("/CategoriasRestaurante/")
  }

  return (
    <div>
      <h1 className='titulo-principal'>Insira a imagem dos menus</h1>
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
        {imagem.map((imagem, index) => (
          <div key={index} className="imagem-container">
            <img src={URL.createObjectURL(imagem)} alt={`Imagem ${index + 1}`} />
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

export default ImagemMenu;