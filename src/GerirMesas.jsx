import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirMesas.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaRegTrashAlt } from "react-icons/fa";

const GerirMesas = () => {

  const navigate = useNavigate();
  const [idrestaurante,] = useState(Cookies.get("id"));
  const [mesas, setMesas] = useState({});
  const [escolher, setEscolher] = useState(false);
  const [api2, setApi2] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
  }, []);

  const handleAddRestaurant = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/MaisMesasporId/${idrestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        console.log('ok');
        setMesas(mesas + 1);
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/MenosMesasporId/${idrestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        console.log('ok');
        setMesas(mesas - 1);
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleEscolher = () => {
    setEscolher(true);
    fetchMesas();
  }

  const fetchMesas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/BuscarRestaurantepor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setApi2(data);
      if (data) {
        console.log('Entrou no if2', data);
        console.log(' no if2', api2);
        const mesa = Object.values(data).map(mesa => mesa.numeroMesas);
        setMesas(parseInt(mesa));
      } else {
        console.log('Não entrou no if');
      }
    } catch (erro) {
      console.error('Erro ao obter as contas da API:', erro);
    }
  };

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  return (
    <div className="home-page-gerir-mesas">
      <HeaderEmpresas/>
      <div className="gerir-mesas-page">
      <h1>Administrar horários</h1>
      <div className="gerir-mesas-buttons">
        {[...Array(mesas)].map((_, index) => (escolher == true &&(
          <div key={index} className="mesas-button-container">
            <button className="mesas-button" onClick={handleEscolher}> Mesa {index + 1}</button>
            <button onClick={() => handleRemove(index)} className="remove-mesas-button"> <FaRegTrashAlt/></button>
          </div>
        )))}
      </div>
      <button onClick={handleEscolher2} className="add-mesas-button"> Esconder as minhas mesas</button>
      <button onClick={handleEscolher} className="add-mesas-button"> Ver as minhas mesas</button>
      <button onClick={handleAddRestaurant} className="add-restaurant-button"> Adicionar Restaurante</button>
    </div>
      <Footer/>
    </div>
  );
};

export default GerirMesas;