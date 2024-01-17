import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirEmpresas.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { IoIosRestaurant } from "react-icons/io";

const TodosRestaurantes = () => {
  const navigate = useNavigate();
  const [razaosocial,] = useState(Cookies.get("Razao"));
  const [numRestaurantes, setNumRestaurantes] = useState(4);
  const [nome, setNome] = useState({});
  const [, setNipc] = useState();
  const [escolher, setEscolher] = useState(false);
  const [api, setApi] = useState([]);
  const [api2, setApi2] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Empresas/Empresaspor${razaosocial}`);
        const data = await response.json();
        setApi(data);
        if (data) {
          console.log('Entrou no if', data);
          console.log(' no if', api);
          const num = Object.values(data).map(num_Restaurante => num_Restaurante.num_Restaurante);
          setNumRestaurantes(parseInt(num));
  
          const nipc = Object.values(data).map(Nipc => Nipc.nipc);
          setNipc(nipc);
          console.log(typeof nipc);
        } else {
          console.log('Não entrou no if');
        }
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    
    fetchContas();
  }, []);

  const handleEscolher = () => {
    setEscolher(true);
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Restaurantes/ListadeRestaurantesAutorizados`);
        const data = await response.json();
        setApi2(data);
        if (data) {
          console.log('Entrou no if2', data);
          console.log(' no if2', api2);
          const nome = Object.values(data).map(nome => nome.nome);
          setNome(nome);
        } else {
          console.log('Não entrou no if');
        }
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    fetchEmpresas();
  }

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  const handleRestaurante = (nomeRestaurante) => {   
    Cookies.set('nome', nomeRestaurante, {expires: 1});
    navigate("/GerirRestaurante/");
 };

  return (
    <div className="home-page">
    <HeaderEmpresas/>
    <div className="restaurant-page">
      <h1>Administração de Restaurantes</h1>
      <h2>Bem vindo {razaosocial}</h2>
      <p>A empresa pode adicionar mais {numRestaurantes} restaurantes.</p>
      <div className="restaurant-buttons">
        {Object.values(nome).map((nomeRestaurante, index) => (escolher == true &&(
        <div key={index} className="restaurant-button-container">
        <button className="restaurant-button" onClick={() => handleRestaurante(nomeRestaurante)}> <IoIosRestaurant/>  {nomeRestaurante}</button>
      </div>
      )))}
      </div>
      <button onClick={handleEscolher2} className="add-restaurant-button">Esconder os meus restaurantes</button>
      <button onClick={handleEscolher} className="add-restaurant-button">Ver os meus restaurantes</button>
    </div>
      <Footer/>
    </div>
  );
};

export default TodosRestaurantes;