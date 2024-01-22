import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirHorario.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';

const GerirHorarios = () => {

  const navigate = useNavigate();
  const [idrestaurante,] = useState(Cookies.get("id"));
  const [horario, setHorario] = useState({});
  const [escolher, setEscolher] = useState(false);
  const [api2, setApi2] = useState([]);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined)
    {
      navigate("/LoginEmpresas/")
    }
  }, []);

  const handleRemove = async (horarioRestaurante) => {
    try {
      const response = await fetch(`${apiUrl}/api/Horarios/DeleteHora/${horarioRestaurante}/${idrestaurante}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        window.location.reload();
        toast.success("Horário eliminado", {
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

  const handleEscolher = () => {
    setEscolher(true);
    fetchEmpresas();
  }

  const fetchEmpresas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Horarios/ListadeHorariospor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setApi2(data);
      if (data) {
        console.log('Entrou no if2', data);
        console.log(' no if2', api2);
        const horario = Object.values(data).map(horario => horario.horaReserva);
        setHorario(horario);
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
    navigate("/RestauranteDisponiblidade/") 
 };

  return (
    <div className="home-page-gerir-horario">
      <HeaderRestaurantes/>
      <div className="gerir-horario-page">
      <h1>Administrar horários</h1>
      <div className="gerir-horario-buttons">
        {Object.values(horario).map((horarioRestaurante, index) => (escolher == true &&(
        <div key={index} className="gerir-horario-button-container">
        <button className="gerir-horario-button"> <CiClock2/> {horarioRestaurante}</button>
        <button onClick={() => handleRemove(horarioRestaurante)} className="remove-gerir-horario-button"> <FaRegTrashAlt/></button>
      </div>
      )))}
      </div>
      <button onClick={handleEscolher2} className="add-gerir-horario-button"> Esconder os meus horários</button>
      <button onClick={handleEscolher} className="add-gerir-horario-button"> Ver os meus horários</button>
      <button onClick={handleHorarios} className="add-gerir-horario-button">Adicionar horários</button>
      <ToastContainer/>
    </div>
      <Footer/>
    </div>
  );
};

export default GerirHorarios;