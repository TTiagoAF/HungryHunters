import React, { useState, useEffect } from 'react';
import './css/MainPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import HeaderMain from './HeaderMainPage';
import Footer from './Footer';
import { FaMap } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { GiMagnifyingGlass } from "react-icons/gi";

function MainPage() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restaurantesLisboa, setRestaurantesLisboa] = useState([]);
  const [restaurantesPorto, setRestaurantesPorto] = useState([]);
  const [restaurantesFaro, setRestaurantesFaro] = useState([]);
  const [pesquisa, setPesquisa] = useState();
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
      console.log(data);
      setRestaurantes(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
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
      console.log(data);
      setRestaurantesLisboa(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
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
      console.log(data);
      setRestaurantesPorto(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
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
      console.log(data);
      setRestaurantesFaro(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
    }
  };

  const handleRestaurante = async (idrestaurante) => {  
    Cookies.set("id_detalhes", idrestaurante);
  };

  const handleSearch = async () => {  
    Cookies.set("pesquisa", pesquisa);
    navigate("/Search/");
  };

  useEffect(() => {
    carregarRestaurantes();
    carregarRestaurantesLisboa();
    carregarRestaurantesPorto();
    carregarRestaurantesFaro();
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }
  }, []);

  const changePesquisar = (e) => {
    setPesquisa(e.target.value);
  };

  return (
    <div className="home-page-main">
      <HeaderMain/>
      <div className="search-container">
      <input type="text" className="search-bar" placeholder={"Pesquisar"} onChange={changePesquisar} value={pesquisa}/>
      <button className="search-button" onClick={handleSearch}><GiMagnifyingGlass/> Pesquisar</button>
    </div>
    <div className="app-container">
      <h1 className="app-heading">Restaurantes</h1>
      {restaurantes.map((restaurante, index) => restaurante.autorizado == "true" &&(
        <button key={index} className="restaurante-card" onClick={() => handleRestaurante(restaurante.id_restaurante)}>
          {restaurante.categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info"><MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
          <h3 className="restaurante-nome"><SiCodechef/> {restaurante.nome}</h3>
          <p className="restaurante-info"><FaMap/> Distrito: {restaurante.distrito}</p>
          <p className="restaurante-info"><FaMoneyBillAlt/> Preço médio: {restaurante.precoMedio.toFixed(2)}€</p>
        </button>
      ))}

      <h1 className="app-heading">Restaurantes em Lisboa</h1>
      {restaurantesLisboa.map((restauranteLisboa, index) => restauranteLisboa.autorizado == "true" &&(
        <button key={index} className="restaurante-card" onClick={() => handleRestaurante(restauranteLisboa.id_restaurante)}>
          {restauranteLisboa.categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info"><MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
          <h3 className="restaurante-nome"><SiCodechef/> {restauranteLisboa.nome}</h3>
          <p className="restaurante-info"><FaMap/> Distrito: {restauranteLisboa.distrito}</p>
          <p className="restaurante-info"><FaMoneyBillAlt/> Preço médio: {restauranteLisboa.precoMedio.toFixed(2)}€</p>
        </button>
      ))}
      <h1 className="app-heading">Restaurantes no Porto</h1>
      {restaurantesPorto.map((restaurantePorto, index) => restaurantePorto.autorizado == "true" &&(
        <button key={index} className="restaurante-card" onClick={() => handleRestaurante(restaurantePorto.id_restaurante)}>
          {restaurantePorto.categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info"><MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
          <h3 className="restaurante-nome"><SiCodechef/> {restaurantePorto.nome}</h3>
          <p className="restaurante-info"><FaMap/> Distrito: {restaurantePorto.distrito}</p>
          <p className="restaurante-info"><FaMoneyBillAlt/> Preço médio: {restaurantePorto.precoMedio.toFixed(2)}€</p>
        </button>
      ))}
      <h1 className="app-heading">Restaurantes em Faro</h1>
      {restaurantesFaro.map((restauranteFaro, index) => restauranteFaro.autorizado == "true" &&(
        <button key={index} className="restaurante-card" onClick={() => handleRestaurante(restauranteFaro.id_restaurante)}>
          {restauranteFaro.categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info"><MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
          <h3 className="restaurante-nome"><SiCodechef/> {restauranteFaro.nome}</h3>
          <p className="restaurante-info"><FaMap/> Distrito: {restauranteFaro.distrito}</p>
          <p className="restaurante-info"><FaMoneyBillAlt/> Preço médio: {restauranteFaro.precoMedio.toFixed(2)}€</p>
        </button>
      ))}
      </div>
      
    <Footer/>
    </div>
  );
}

export default MainPage;