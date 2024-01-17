import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirRestaurante.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const GerirRestuarante = () => {
  const navigate = useNavigate();
  const [nome,] = useState(Cookies.get("nome"));
  const [autorizado, setAutorizado] = useState("false");
  const [id, setId] = useState("false");
  const [, setNipc] = useState();
  const [api, setApi] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("nome") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Restaurantes/Restaurantespor${nome}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
          }
        });
        const data = await response.json();
        setApi(data);
        if (data) {
          console.log('Entrou no if', data);
          console.log(' no if', api);
          const num = Object.values(data).map(autorizado => autorizado.autorizado);
          setAutorizado(num);
          const nipc = Object.values(data).map(Nipc => Nipc.nipc);
          setNipc(nipc);
          const idRestaurante = Object.values(data).map(id => id.id_restaurante);
          setId(parseInt(idRestaurante));
        } else {
          console.log('Não entrou no if');
        }
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    fetchContas();
  }, []);

  const handleEscolherImagemMenus = () => {
    Cookies.set("id", id);
    navigate("/GerirImagemMenu/");
  }

  const handleEscolherMenus = () => {
    Cookies.set("id", id);
    navigate("/GerirMenus/");
  }

  const handleEscolherImagens = () => {
    Cookies.set("id", id);
    navigate("/GerirImagens/");
  }

  const handleEscolherDias = () => {
    Cookies.set("id", id);
    navigate("/GerirDias/");
  }

  const handleEscolherHorarios = () => {
    Cookies.set("id", id);
    navigate("/GerirHorarios/");
  }

  const handleEscolherCategorias = () => {
    Cookies.set("id", id);
    navigate("/GerirCategorias/");
  }

  const handleEscolherPlanta = () => {
    Cookies.set("id", id);
    navigate("/GerirPlanta/");
  }

  return (
    <div className="home-page">
      <HeaderEmpresas />
      <div className="restaurant-page">
        <h1 className='h1'>A gerir restaurante {nome}</h1>
        {autorizado == "false" && (
          <h2 className='h2'>Espere até o seu restaurante ser autorizado</h2>
        )}
        {autorizado == "true" && (
          <div>
            <div className="restaurant-buttons">
              <button className="restaurant-button" onClick={handleEscolherImagemMenus}>
                Imagem do Menu
              </button>
              <button className="restaurant-button" onClick={handleEscolherMenus}>
                Pratos do Restaurante
              </button>
              <button className="restaurant-button" onClick={handleEscolherImagens}>
                Imagens do Restaurante
              </button>
              <button className="restaurant-button" onClick={handleEscolherDias}>
                Dias de Funcionamento
              </button>
              <button className="restaurant-button" onClick={handleEscolherHorarios}>
                Horários
              </button>
              <button className="restaurant-button" onClick={handleEscolherCategorias}>
                Categorias do Restaurante
              </button>
              <button className="restaurant-button" onClick={handleEscolherPlanta}>
                Planta do Restaurante
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GerirRestuarante;