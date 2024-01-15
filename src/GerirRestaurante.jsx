import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirEmpresas.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const GerirRestuarante = () => {
  const navigate = useNavigate();
  const [nome,] = useState(Cookies.get("nome"));
  const [autorizado, setAutorizado] = useState("false");
  const [, setNipc] = useState();
  const [api, setApi] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("nome") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Restaurantes/Restaurantespor${nome}`);
        const data = await response.json();
        setApi(data);
        if (data) {
          console.log('Entrou no if', data);
          console.log(' no if', api);
          const num = Object.values(data).map(autorizado => autorizado.autorizado);
          setAutorizado(num);
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

  return (
    <div className="home-page">
    <HeaderEmpresas/>
    <div className="restaurant-page">
      <h1>A gerir restaurante {nome}</h1>
        {autorizado == "false" && (
          <h2>Espere até o seu restaurante ser autorizado</h2>
        )}
        {autorizado == "true" && (
          <h2>Bem vindo {nome}</h2>
        )}
    </div>
      <Footer/>
    </div>
  );
};

export default GerirRestuarante;