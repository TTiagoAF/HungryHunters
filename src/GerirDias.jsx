import React, { useState, useEffect } from 'react';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirDias.css";
import Cookies from 'js-cookie';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TbBeach } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";
import { MdOutlineWorkOff } from "react-icons/md";

const GerirDias = () => {
  const navigate = useNavigate();
  const [ferias, setFerias] = useState([]);
  const [diasFestivos, setDiasFestivos] = useState([]);
  const [segunda, setSegunda] = useState([]);
  const [terca, setTerca] = useState([]);
  const [quarta, setQuarta] = useState([]);
  const [quinta, setQuinta] = useState([]);
  const [sexta, setSexta] = useState([]);
  const [sabado, setSabado] = useState([]);
  const [domingo, setDomingo] = useState([]);
  const apiUrl = 'https://localhost:7286';

  const carregarFerias = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Ferias/ListadeFeriaspor${Cookies.get("id")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setFerias(data);
    } catch (erro) {
      console.error('Erro ao obter ferias:', erro);
    }
  };

  const carregarDiasFestivos = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/DiasFestivos/ListadeDiasFestivospor${Cookies.get("id")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setDiasFestivos(data);
    } catch (erro) {
      console.error('Erro a obter dias de trabalho obrigatório:', erro);
    }
  };

  const carregarDiaFolgaRestaurante = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/DiasDeFuncionamentoes/ListadeDiaspor${Cookies.get("id")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      const segundas = Object.values(data).map(dia => dia.segunda);
      setSegunda(segundas);
      const tercas = Object.values(data).map(dia => dia.terca);
      setTerca(tercas);
      const quartas = Object.values(data).map(dia => dia.quarta);
      setQuarta(quartas);
      const quintas = Object.values(data).map(dia => dia.quinta);
      setQuinta(quintas);
      const sextas = Object.values(data).map(dia => dia.sexta);
      setSexta(sextas);
      const sabados = Object.values(data).map(dia => dia.sabado);
      setSabado(sabados);
      const domingos = Object.values(data).map(dia => dia.domingo);
      setDomingo(domingos);
    } catch (erro) {
      console.error('Erro a obter dias de folga:', erro);
    }
  };

  const eliminarFeria = async (feriaId) => {
    try {
      const response = await fetch(`${apiUrl}/api/Ferias/EliminarFerias/${feriaId}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Periodo de férias eliminado", {
          closeOnClick: true,
          draggable: true,
          });
        window.location.reload();
      } else {
        console.error('Erro a eliminar férias');
      }
    } catch (erro) {
      console.error('Erro a eliminar férias:', erro);
    }
  };

  const eliminarDiaFestivo = async (diaFestivoId) => {
    try {
      const response = await fetch(`${apiUrl}/api/DiasFestivos/EliminarFestivos/${diaFestivoId}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Dia de trabalho obrigatório eliminado", {
          closeOnClick: true,
          draggable: true,
          });
        window.location.reload();
      } else {
        console.error('Erro a eliminar dia de trabalho obrigatório');
      }
    } catch (erro) {
      console.error('Erro a eliminar dia de trabalho obrigatório:', erro);
    }
  };

  useEffect(() => {
    carregarFerias();
    carregarDiasFestivos();
    carregarDiaFolgaRestaurante();
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
  }, []);

  const handleDias = () => {  
    navigate("/RestauranteAberto/") 
 };

  return (
    <body className='pagina-solo'>
    <div className="home-page-gerir-dias">
      <HeaderRestaurantes />
      <div className="gerir-dias-page">
        <h2>Gerenciar Férias <TbBeach/></h2>
        {ferias.map((feria) => (
          <div key={feria.id_ferias} className="dias-button-container">
            <p>Inicio das férias: {feria.inicioFerias.slice(0, -9)} -- Fim das férias: {feria.fimFerias.slice(0, -9)}</p>
            <button onClick={() => eliminarFeria(feria.id_ferias)} className="remove-dias-button"><FaRegTrashAlt/></button>
          </div>
        ))}
      </div>
      <div className="gerir-dias-page">
        <h2>Gerenciar dias de trabalho obrigatório <MdWorkOutline/></h2>
        {diasFestivos.map((diaFestivo) => (
          <div key={diaFestivo.id_festivo} className="dias-button-container">
            <p>Data: {diaFestivo.diaFestivo.slice(0, -9)}</p>
            <button onClick={() => eliminarDiaFestivo(diaFestivo.id_festivo)} className="remove-dias-button"><FaRegTrashAlt/></button>
          </div>
        ))}
      </div>
      <div className="gerir-dias-page">
        <h2>Dia de Folga do Restaurante <MdOutlineWorkOff/></h2>
        {segunda == "true" ?(
          <div>
            <p>Estamos fechados á segunda</p>
          </div>
        ) : (
          <p>Estamos abertos á segunda</p>
        )}
         {terca == "true" ?(
          <div>
            <p>Estamos fechados á terça</p>
          </div>
        ) : (
          <p>Estamos abertos á terça</p>
        )}
         {quarta == "true" ?(
          <div>
            <p>Estamos fechados á quarta</p>
          </div>
        ) : (
          <p>Estamos abertos á quarta</p>
        )}
         {quinta == "true" ?(
          <div>
            <p>Estamos fechados á quinta</p>
          </div>
        ) : (
          <p>Estamos abertos á quinta</p>
        )}
         {sexta == "true" ?(
          <div>
            <p>Estamos fechados á sexta</p>
          </div>
        ) : (
          <p>Estamos abertos á sexta</p>
        )}
         {sabado == "true" ?(
          <div>
            <p>Estamos fechados ao sábado</p>
          </div>
        ) : (
          <p>Estamos abertos ao sábado</p>
        )}
         {domingo == "true" ?(
          <div>
            <p>Estamos fechados ao domingo</p>
          </div>
        ) : (
          <p>Estamos abertos ao domingo</p>
        )}
      </div>
      <button onClick={handleDias} className="add-gerir-dias-button">Gerenciar dias</button>
      <ToastContainer/>
      <Footer />
    </div>
    </body>
  );
};

export default GerirDias;