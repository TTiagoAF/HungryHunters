import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMenus.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const GerirPlanta = () => {

  const navigate = useNavigate();
  const apiUrl = 'https://localhost:7286';;
  const [planta, setPlanta] = useState([]);

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
    const carregarImagem = async () => {  
      try {
        const response = await fetch(`${apiUrl}/api/PlantaRestaurantes/ObterPlanta/${Cookies.get("id")}`, {
          headers: {
          }
        });
        const data = await response.json();
        console.log(data);
        setPlanta(data.caminhosImagens[0]);
      } catch (erro) {
        console.error('Erro ao obter o cardápio da API:', erro);
      }
    };
    carregarImagem();
  }, []);

  

  return (
    <div className="home-page">
      <HeaderRestaurantes/>
      <img alt="imagem" src={planta} crossOrigin='anonymous'/>
      <Footer/>
    </div>
  );
};

export default GerirPlanta;