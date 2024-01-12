import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirEmpresas.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const GerirEmpresa = () => {
  const navigate = useNavigate();
  const [razaosocial,] = useState(Cookies.get("Razao"));
  const [numRestaurantes, setNumRestaurantes] = useState(4);
  const [nipc, setNipc] = useState();
  const [api, setApi] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined)
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
        } else {
          console.log('Não entrou no if');
        }
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    fetchContas();
  }, []);

  const handleAddRestaurant = async () => {
    setNumRestaurantes(numRestaurantes + 1);
    try {
      const response = await fetch(`${apiUrl}/api/Empresas/MaisRestaurante/${razaosocial}`, {
        method: 'POST'
      });
      if (response.ok) {
        console.log('ok');
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleRemoveRestaurant = async () => {
    setNumRestaurantes(numRestaurantes - 1);
    try {
      const response = await fetch(`${apiUrl}/api/Empresas/MenosRestaurante/${razaosocial}`, {
        method: 'POST'
      });
      if (response.ok) {
        console.log('ok');
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleNovoRestaurante = () => {
    Cookies.set("nipc", nipc, {expires: 1})
    navigate("/RestauranteLoc/")
    
  }

  return (
    <div className="home-page">
    <HeaderEmpresas/>
    <div className="restaurant-page">
      <h1>Administração de Restaurantes</h1>
      <h2>Bem vindo {razaosocial}</h2>
      <p>A empresa possui {numRestaurantes} restaurantes.</p>
      <div className="restaurant-buttons">
        {[...Array(numRestaurantes)].map((_, index) => (
          <div key={index} className="restaurant-button-container">
            <button className="restaurant-button" onClick={handleNovoRestaurante}> <CiCirclePlus/> Registrar Restaurante {index + 1}</button>
            <button
              onClick={() => handleRemoveRestaurant(index)}
              className="remove-restaurant-button"
            >
              <FaRegTrashAlt/>
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleAddRestaurant} className="add-restaurant-button">
        Adicionar Restaurante
      </button>
    </div>
      <Footer/>
    </div>
  );
};

export default GerirEmpresa;