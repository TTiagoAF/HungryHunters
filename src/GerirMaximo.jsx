import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMesas.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const GerirGrupo = () => {

  const navigate = useNavigate();
  const [idrestaurante,] = useState(Cookies.get("id"));
  const [grupo, setGrupo] = useState({});
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

  const handleAddMaximo = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/MaisPessoasporId/${idrestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Máximo atualizado", {
          closeOnClick: true,
          draggable: true,
          });
        setGrupo(grupo + 1);
      } else {
        console.error('Não foi possível adicionar mais pessoas');
      }
    } catch (erro) {
      console.error('Não foi possível adicionar mais pessoas:', erro);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/MenosPessoasporId/${idrestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Máximo atualizado", {
          closeOnClick: true,
          draggable: true,
          });
        setGrupo(grupo - 1);
      } else {
        console.error('Não foi possível diminuir o máximo de pessoas');
      }
    } catch (erro) {
      console.error('Não foi possível diminuir o máximo de pessoas:', erro);
    }
  };

  const handleEscolher = () => {
    setEscolher(true);
    fetchMaximo();
  }

  const fetchMaximo = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/BuscarRestaurantepor?id=${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
        const grupo = Object.values(data).map(grupo => grupo.capacidadeGrupo);
        setGrupo(parseInt(grupo));
    } catch (erro) {
      console.error('Erro a obter o máximo de pessoas:', erro);
    }
  };

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  return (
    <div className="home-page-gerir-mesas">
      <HeaderRestaurantes/>
      <div className="gerir-mesas-page">
      <h1 className='titulo-principal'>Gerir máximo de pessoas por grupo</h1>
      <div className="gerir-mesas-buttons">
        {[...Array(grupo)].map((_, index) => (escolher == true &&(
          <div key={index} className="mesas-button-container">
            <button className="mesas-button" onClick={handleEscolher}> <MdGroups/> Grupo {index + 1}</button>
            <button onClick={() => handleRemove(index)} className="remove-mesas-button"> <FaRegTrashAlt/></button>
          </div>
        )))}
      </div>
      <button onClick={handleEscolher2} className="add-mesas-button"> Esconder as capacidades por grupo</button>
      <button onClick={handleEscolher} className="add-mesas-button"> Ver as capacidades por grupo</button>
      <button onClick={handleAddMaximo} className="add-restaurant-button"> Adicionar Máximo</button>
      <ToastContainer/>
    </div>
      <Footer/>
    </div>
  );
};

export default GerirGrupo;