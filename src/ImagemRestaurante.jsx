import React, { useEffect, useState } from 'react';
import './css/ImagemMenu.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ImagemRestaurante = () => {
  const [imagem, setImagem] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = 'https://localhost:7286';

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
    setErrorMessage('');
    setImagem([...imagem, ...imagemselecionada]);
  };

  const handleEleminarImagem = (index) => {
    const imagemAtualizada = [...imagem];
    imagemAtualizada.splice(index, 1);
    setImagem(imagemAtualizada);
  };

  const handleSubmit = async () => {
    if(imagem.length == 0)
    {
        return setErrorMessage("Não existe nada para submeter")
    }
    const formdata = new FormData();
    for (var i = 0; i < imagem.length; i++) {
      formdata.append('FotoRestaurante', imagem[i]);
      formdata.append("RestauranteId", Cookies.get("id"));
      formdata.append("Foto_titulo", "imagem");
  }
  try {
    const response = await fetch(`${apiUrl}/api/FotosRestaurantes/AdicionarFotos`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get("token"),
      },
      body: formdata,
    });
    
      if (response.ok) {
        console.log('Nova conta adicionada na API');
        navigate("/GerirImagens/")
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
  }

  const handleVerImagens = () => {
    navigate("/GerirImagens/");
  }

  return (
    <div>
      <h1 className='titulo-principal'>Insira algumas imagens do seu restaurante ou dos seus menus</h1>
      <h3 className='titulo-principal'>Tamanho recomendado 1500x600</h3>
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
      <button className='submeter-button' onClick={handleVerImagens}>Gerir Imagens</button>
    </div>
  );
};

export default ImagemRestaurante;