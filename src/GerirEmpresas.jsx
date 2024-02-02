import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirEmpresas.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosRestaurant } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const GerirEmpresa = () => {
  const navigate = useNavigate();
  const [razaosocial,] = useState(Cookies.get("Razao"));
  const [numRestaurantes, setNumRestaurantes] = useState(0);
  const [nome, setNome] = useState({});
  const [nipc, setNipc] = useState();
  const [escolher, setEscolher] = useState(false);
  const [api, setApi] = useState([]);
  const [api2, setApi2] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
    
    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Empresas/Empresaspor${razaosocial}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
          }
        });
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

  const handleAddRestaurant = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Empresas/MaisRestaurante/${razaosocial}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Já podes adicionar mais um restaurante", {
          closeOnClick: true,
          draggable: true,
          });
        setNumRestaurantes(numRestaurantes + 1);
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleRemoveRestaurant = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Empresas/MenosRestaurante/${razaosocial}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Menos um restaurante que podes adicionar", {
          closeOnClick: true,
          draggable: true,
          });
        setNumRestaurantes(numRestaurantes - 1);
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleRemove = async (nomeRestaurante) => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/DeleteRestaurantes/${nomeRestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Eliminaste o teu restaurante", {
          closeOnClick: true,
          draggable: true,
          });
        window.location.reload();
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleNovoRestaurante = () => {
    Cookies.set("nipc", nipc, {expires: 1});
    navigate("/RestauranteLoc/");
    
  }

  const handleEscolher = () => {
    setEscolher(true);
    fetchEmpresas();
  }

  const fetchEmpresas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/RestaurantesporNipc/${nipc}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
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

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  const handleRestaurante = (nomeRestaurante) => {   
    Cookies.set('nome', nomeRestaurante, {expires: 1});
    navigate("/GerirRestaurante/");
 };

  return (
    <body className='pagina-solo'>
    <div className="home-page">
    <HeaderEmpresas/>
    <div className="restaurant-page">
      <h1>Administração de Restaurantes</h1>
      <h2>Bem vindo {razaosocial}</h2>
      <p>A empresa pode adicionar mais {numRestaurantes} restaurantes.</p>
      <div className="restaurant-buttons">
        {[...Array(numRestaurantes)].map((_, index) => (
          <div key={index} className="restaurant-button-container">
            <button className="restaurant-button" onClick={handleNovoRestaurante}> <CiCirclePlus/> Registrar Restaurante {index + 1}</button>
            <button onClick={() => handleRemoveRestaurant(index)} className="remove-restaurant-button"> <FaRegTrashAlt/></button>
          </div>
        ))}
      </div>
      <button onClick={handleAddRestaurant} className="add-restaurant-button"> Adicionar Restaurante</button>
      <div className="restaurant-buttons">
        {Object.values(nome).map((nomeRestaurante, index) => (escolher == true &&(
        <div key={index} className="restaurant-button-container">
        <button className="restaurant-button" onClick={() => handleRestaurante(nomeRestaurante)}> <IoIosRestaurant/>  {nomeRestaurante}</button>
        <button onClick={() => handleRemove(nomeRestaurante)} className="remove-restaurant-button"> <FaRegTrashAlt/></button>
      </div>
      )))}
      </div>
      <button onClick={handleEscolher2} className="add-restaurant-button">Esconder os meus restaurantes</button>
      <button onClick={handleEscolher} className="add-restaurant-button">Ver os meus restaurantes</button>
      <ToastContainer/>
    </div>
      <Footer/>
    </div>
    </body>
  );
};

export default GerirEmpresa;