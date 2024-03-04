import React, { useState, useEffect } from 'react';
import './css/MainPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import HeaderPaginaPrincipal from './HeaderPaginaPrincipal';
import Footer from './Footer';
import { FaMap } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { GiMagnifyingGlass } from "react-icons/gi";

const Restaurantes = ({ onSelecionar, nome, distrito, preco, categorias }) => (
  <button className="restaurante-card" onClick={onSelecionar}>
          <h3 className="restaurante-nome"><SiCodechef/> {nome}</h3>
          <p className="restaurante-info"><FaMap/> Distrito: {distrito}</p>
          <p className="restaurante-info"><FaMoneyBillAlt/> Preço médio: {preco.toFixed(2)}€</p>
          {categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info"><MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
        </button>
);

function MainPage() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restaurantesLisboa, setRestaurantesLisboa] = useState([]);
  const [restaurantesPorto, setRestaurantesPorto] = useState([]);
  const [restaurantesFaro, setRestaurantesFaro] = useState([]);
  const [restaurantesMelhorComida, setRestaurantesMelhorComida] = useState([]);
  const [restaurantesMelhorConforto, setRestaurantesMelhorConforto] = useState([]);
  const [restaurantesMaisBonito, setRestaurantesMaisBonito] = useState([]);
  const [restaurantesMelhorAtendimento, setRestaurantesMelhorAtendimento] = useState([]);
  const [restaurantesMaisRapido, setRestaurantesMaisRapido] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();

  const carregarRestaurantes = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesComCategorias`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantes(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const carregarRestaurantesLisboa = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesComCategoriasLisboa`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesLisboa(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const carregarRestaurantesPorto = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesComCategoriasPorto`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesPorto(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const carregarRestaurantesFaro = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesComCategoriasFaro`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesFaro(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const carregarRestaurantesMelhorComida = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesMelhorComida`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesMelhorComida(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const carregarRestaurantesMelhorConforto = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesMelhorConforto`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesMelhorConforto(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };
  const carregarRestaurantesMaisBonito = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesMaisBonito`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesMaisBonito(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };
  const carregarRestaurantesMelhorAtendimento = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesMelhorAtendimento`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesMelhorAtendimento(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };
  const carregarRestaurantesMaisRapido = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesMaisRapido`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurantesMaisRapido(data);
    } catch (erro) {
      console.error('Erro ao obter restaurantes:', erro);
    }
  };

  const handleRestaurante = async (idrestaurante) => {  
    Cookies.set("id_detalhes", idrestaurante);
    navigate("/Details/" + idrestaurante)
  };

  const handleSearch = async () => {
    Cookies.set("pesquisa", pesquisa);
    navigate("/Search/");
  };

  useEffect(() => {
    window.scrollTo(0,0);
    carregarRestaurantes();
    carregarRestaurantesLisboa();
    carregarRestaurantesPorto();
    carregarRestaurantesFaro();
    carregarRestaurantesMelhorComida();
    carregarRestaurantesMelhorConforto();
    carregarRestaurantesMaisBonito();
    carregarRestaurantesMelhorAtendimento();
    carregarRestaurantesMaisRapido();
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }
  }, []);

  const changePesquisar = (e) => {
    setPesquisa(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="home-page-main">
      <HeaderPaginaPrincipal/>
      <div className="search-container">
      <input type="text" className="search-bar" placeholder={"Pesquisar"} onChange={changePesquisar} value={pesquisa} onKeyPress={handleKeyPress}/>
      <button className="search-button" onClick={handleSearch}><GiMagnifyingGlass/> Pesquisar</button>
    </div>
    <div className="app-container">
      <h1 className="app-heading">Restaurantes</h1>
      {restaurantes.map((restaurante, index) => restaurante.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restaurante.id_restaurante)} nome={restaurante.nome} distrito={restaurante.distrito} preco={restaurante.precoMedio} categorias={restaurante.categorias}/>
      ))}
      <h1 className="app-heading">Restaurantes em Lisboa</h1>
      {restaurantesLisboa.map((restauranteLisboa, index) => restauranteLisboa.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteLisboa.id_restaurante)} nome={restauranteLisboa.nome} distrito={restauranteLisboa.distrito} preco={restauranteLisboa.precoMedio} categorias={restauranteLisboa.categorias}/>
      ))}
      <h1 className="app-heading">Restaurantes no Porto</h1>
      {restaurantesPorto.map((restaurantePorto, index) => restaurantePorto.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restaurantePorto.id_restaurante)} nome={restaurantePorto.nome} distrito={restaurantePorto.distrito} preco={restaurantePorto.precoMedio} categorias={restaurantePorto.categorias}/>
      ))}
      <h1 className="app-heading">Restaurantes em Faro</h1>
      {restaurantesFaro.map((restauranteFaro, index) => restauranteFaro.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteFaro.id_restaurante)} nome={restauranteFaro.nome} distrito={restauranteFaro.distrito} preco={restauranteFaro.precoMedio} categorias={restauranteFaro.categorias}/>
      ))}
      <h1 className="app-heading">Restaurantes com a melhor comida</h1>
      {restaurantesMelhorComida.map((restauranteMelhorComida, index) => restauranteMelhorComida.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteMelhorComida.id_restaurante)} nome={restauranteMelhorComida.nome} distrito={restauranteMelhorComida.distrito} preco={restauranteMelhorComida.precoMedio} categorias={restauranteMelhorComida.categorias}/>
      ))}
      <h1 className="app-heading">Os restaurantes mais confortáveis</h1>
      {restaurantesMelhorConforto.map((restauranteMelhorConforto, index) => restauranteMelhorConforto.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteMelhorConforto.id_restaurante)} nome={restauranteMelhorConforto.nome} distrito={restauranteMelhorConforto.distrito} preco={restauranteMelhorConforto.precoMedio} categorias={restauranteMelhorConforto.categorias}/>
      ))}
      <h1 className="app-heading">Os restaurantes mais bonitos</h1>
      {restaurantesMaisBonito.map((restauranteMaisBonito, index) => restauranteMaisBonito.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteMaisBonito.id_restaurante)} nome={restauranteMaisBonito.nome} distrito={restauranteMaisBonito.distrito} preco={restauranteMaisBonito.precoMedio} categorias={restauranteMaisBonito.categorias}/>
      ))}
      <h1 className="app-heading">Os melhores atendimentos</h1>
      {restaurantesMelhorAtendimento.map((restauranteMelhorAtendimento, index) => restauranteMelhorAtendimento.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteMelhorAtendimento.id_restaurante)} nome={restauranteMelhorAtendimento.nome} distrito={restauranteMelhorAtendimento.distrito} preco={restauranteMelhorAtendimento.precoMedio} categorias={restauranteMelhorAtendimento.categorias}/>
      ))}
      <h1 className="app-heading">Os restaurantes mais rápidos a servir</h1>
      {restaurantesMaisRapido.map((restauranteMaisRapido, index) => restauranteMaisRapido.autorizado == "true" &&(
        <Restaurantes key={index} onSelecionar={() => handleRestaurante(restauranteMaisRapido.id_restaurante)} nome={restauranteMaisRapido.nome} distrito={restauranteMaisRapido.distrito} preco={restauranteMaisRapido.precoMedio} categorias={restauranteMaisRapido.categorias}/>
      ))}
      </div>
    <Footer/>
    </div>
  );
}

export default MainPage;