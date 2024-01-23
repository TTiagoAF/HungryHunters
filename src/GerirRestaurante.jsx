import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirRestaurante.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegHourglass } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import { CiPizza } from "react-icons/ci";
import { MdOutlineTableBar } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";


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
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
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
          Cookies.set("id", idRestaurante);
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
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirImagemMenu/");
  }

  const handleEscolherMenus = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirMenus/");
  }

  const handleEscolherImagens = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirImagens/");
  }

  const handleEscolherDias = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirDias/");
  }

  const handleEscolherHorarios = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirHorarios/");
  }

  const handleEscolherCategorias = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirCategorias/");
  }

  const handleEscolherPlanta = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirPlanta/");
  }

  const handleEscolherMesas = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirMesas/");
  }

  return (
    <div className="home-restaurante">
      <HeaderEmpresas />
      <div className="restaurante-page">
        <h1 className='h1'>A gerir restaurante {nome}</h1>
        {autorizado == "false" && (
          <h2 className='h2'>Espere até o seu restaurante ser autorizado</h2>
        )}
        {autorizado == "true" && (
          <div>
            <div className="restaurante-buttons">
              <button className="restaurante-button" onClick={handleEscolherImagemMenus}>
              <CiImageOn/> Imagem do Menu
              </button>
              <button className="restaurante-button" onClick={handleEscolherMenus}>
               <BiDish/> Pratos do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherImagens}>
              <CiImageOn/> Imagens do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherDias}>
                <BsCalendar2Date/> Dias de Funcionamento
              </button>
              <button className="restaurante-button" onClick={handleEscolherHorarios}>
               <FaRegHourglass/> Horários
              </button>
              <button className="restaurante-button" onClick={handleEscolherCategorias}>
               <CiPizza/> Categorias do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherPlanta}>
               <CiImageOn/> Planta do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherMesas}>
               <MdOutlineTableBar/> Mesas
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