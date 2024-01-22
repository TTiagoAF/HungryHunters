import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirCategorias.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { CiPizza } from "react-icons/ci";

const GerirCategorias = () => {

  const navigate = useNavigate();
  const [idrestaurante,] = useState(Cookies.get("id"));
  const [categoriasum, setCategoriasum] = useState();
  const [categoriasdois, setCategoriasdois] = useState();
  const [categoriastres, setCategoriastres] = useState();
  const [escolher, setEscolher] = useState(false);
  const [api2, setApi2] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
  }, []);

  const handleEscolher = () => {
    setEscolher(true);
    fetchEmpresas();
  }

  const fetchEmpresas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Categorias/ListadeCategoriaspor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setApi2(data);
      if (data) {
        console.log('Entrou no if2', data);
        console.log(' no if2', api2);
        const categoriaum = Object.values(data).map(categoriaum => categoriaum.categoria_Um);
        setCategoriasum(categoriaum);
        const categoriadois = Object.values(data).map(categoriadois => categoriadois.categoria_Dois);
        setCategoriasdois(categoriadois);
        const categoriatres = Object.values(data).map(categoriatres => categoriatres.categoria_Tres);
        setCategoriastres(categoriatres);
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

  const handleHorarios = () => {  
    navigate("/CategoriasRestaurante/") 
 };

  return (
    <div className="home-page-gerir-categoria">
      <HeaderRestaurantes/>
      <div className="gerir-categoria-page">
      <h1>Administrar as categorias do seu restaurante</h1>
      <div className="gerir-categoria-buttons">
        {escolher == true && (
        <div className="gerir-categoria-button-container">
        <button className="gerir-categoria-button"> <CiPizza/> {categoriasum}</button>
        <button className="gerir-categoria-button"> <CiPizza/> {categoriasdois}</button>
        <button className="gerir-categoria-button"> <CiPizza/> {categoriastres}</button>
      </div>
      )}
      </div>
      <button onClick={handleEscolher2} className="add-gerir-categoria-button">Esconder as minhas categorias</button>
      <button onClick={handleEscolher} className="add-gerir-categoria-button">Ver as minhas categorias</button>
      <button onClick={handleHorarios} className="add-gerir-categoria-button">Adicionar/Alterar categorias</button>
    </div>
      <Footer/>
    </div>
  );
};

export default GerirCategorias;