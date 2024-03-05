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
        console.error('Erro a eliminar horário');
      }
    } catch (erro) {
      console.error('Erro a eliminar horário:', erro);
    }
  };

  const handleEscolher = () => {
    setEscolher(true);
    fetchHorarios();
  }

  const fetchHorarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Horarios/ListadeHorariospor?RestauranteId=${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
        const horario = Object.values(data).map(horario => horario.horaReserva);
        setHorario(horario);
    } catch (erro) {
      console.error('Erro ao obter horários:', erro);
    }
  };

  const handleEscolher2 = () => {
    setEscolher(false);
  }

  const handleHorarios = () => {  
    navigate("/RestauranteDisponiblidade/") 
 };

  return (
    <body className='pagina-solo'>
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
    </body>
  );
};

export default GerirHorarios;