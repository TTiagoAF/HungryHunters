import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMenus.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const GerirImagens = () => {

  const navigate = useNavigate();
  const apiUrl = 'https://localhost:7286';
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
    const carregarImagem = async () => {  
      try {
        const response = await fetch(`${apiUrl}/api/FotosRestaurantes/ObterImagensRestaurante/${Cookies.get("id")}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
          }
        });
        const data = await response.json();
        console.log(data);
        setImagens(data.caminhosImagens);
      } catch (erro) {
        console.error('Erro ao obter o cardápio da API:', erro);
      }
    };
    carregarImagem();
  }, []);

  const handleRemoverImagem = async (nome) => {
    try {
      const response = await fetch(`${apiUrl}/api/FotosRestaurantes/DeleteFotosRestaurante/${nome}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleAddRestaurant = () => {
    navigate("/ImagemRestaurante/");
  }

  return (
    <div className="home-page">
      <HeaderRestaurantes/>
      <div className="ver-imagem">
      {imagens.map((imagem, index) => (
            <div key={index} className="imagem-container">
            <img src={"https://localhost:7286/Imagens/" + imagem} crossOrigin='anonymous' alt={`Imagem ${index + 1}`} />
            <div className="imagem-buttons">
              <button onClick={() => handleRemoverImagem(imagem)} className='eliminar-button'>Eliminar</button>
            </div>
          </div>
          ))}
          </div>
          <button onClick={handleAddRestaurant} className="add-restaurant-button"> Adicionar Imagens</button>
      <Footer/>
    </div>
  );
};

export default GerirImagens;