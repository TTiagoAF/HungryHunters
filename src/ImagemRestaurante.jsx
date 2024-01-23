import React, { useEffect, useState } from 'react';
import './css/ImagemMenu.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ImagemRestaurante = () => {
  const [imagem, setImagem] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
  }, []);

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
        return setErrorMessage("Não existe nada para submeter")
    }
    console.log("Submetido", imagem)
  }

  const handleSeguinte = () => {
    console.log("Submetido", imagem)
  }

  return (
    <div>
      <h1 className='titulo-principal'>Insira algumas fotos do seu restaurante</h1>
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
      <button className='submeter-button' onClick={handleSeguinte}>Criar conta</button>
    </div>
  );
};

export default ImagemRestaurante;