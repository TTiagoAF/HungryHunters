import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMesas.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import ToolTip from './ToolTip';

const GerirMesas = () => {

  const navigate = useNavigate();
  const [idrestaurante,] = useState(Cookies.get("id"));
  const [mesas, setMesas] = useState([]);
  const [escolher, setEscolher] = useState(false);
  const apiUrl = 'https://localhost:7286';
  
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

  const handleRemoverMesa = async (idmesa) => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/EliminarMesas/${idmesa}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        window.location.reload();
        toast.success("Mesa eliminada", {
          closeOnClick: true,
          draggable: true,
          });
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
  };

  const handleBuscarMesas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/ListadeMesaspor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      if (data) {
        console.log('Entrou no if2', data);
        setMesas(data);
      } else {
        console.log('Não entrou no if');
      }
    } catch (erro) {
      console.error('Erro ao obter as contas da API:', erro);
    }
  };

  const handleEscolher = () => {
    setEscolher(true);
    handleBuscarMesas();
  }

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  const handleAddRestaurant = () => {
    navigate("/Mesas/");
  }

  return (
    <body className='pagina-solo'>
    <div className="home-page-gerir-mesas">
      <HeaderRestaurantes/>
      <div className="gerir-mesas-page">
      <h1>Administrar Mesas do restaurante</h1>
      <div className="gerir-mesas-buttons">
      {Object.values(mesas).map((mesa, index) => (escolher && (
        <div key={index} className="mesas-button-container">
            <button className="mesas-button" onClick={handleEscolher}>
              <MdOutlineTableBar /> {mesa.nome}
            </button>
            <ToolTip nome={mesa.nome} maximo={mesa.maximo_pessoas} desc={mesa.notas}/>
            <button onClick={() => handleRemoverMesa(mesa.id_mesa)} className="remove-mesas-button">
              <FaRegTrashAlt />
            </button>
        </div>
        )
      ))}
      </div>
      <button onClick={handleEscolher2} className="add-mesas-button"> Esconder as minhas mesas</button>
      <button onClick={handleEscolher} className="add-mesas-button"> Ver as minhas mesas</button>
      <button onClick={handleAddRestaurant} className="add-restaurant-button"> Adicionar Mesa</button>
      <ToastContainer/>
    </div>
      <Footer/>
    </div>
    </body>
  );
};

export default GerirMesas;