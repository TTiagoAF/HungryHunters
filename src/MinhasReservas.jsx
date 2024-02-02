import React, { useEffect, useState } from 'react';
import HeaderMainPage from './HeaderMainPage';
import Footer from './Footer';
import "./css/MinhasReservas.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFreeCancellation } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { MdFoodBank } from "react-icons/md";
import { BsCalendarDayFill } from "react-icons/bs";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaWalking } from "react-icons/fa";

const MinhasReservas = ({ nomeRestaurante, dia, hora, mesa, pessoas, estado }) => (
  <div className="reservas-item">
    <p className='nome'><MdFoodBank/> <b>Restaurante: {nomeRestaurante}</b></p>
    <p className='desc'><BsCalendarDayFill/> Dia: {dia}</p>
    <p className='desc'><IoHourglassOutline/> Hora: {hora}</p>
    <p className='desc'><MdOutlineTableRestaurant/> Mesa: {mesa}</p>
    <p className='desc'><MdGroups/> Grupo de: {pessoas} pessoas</p>
    <p className='desc'><FaWalking/> Estado: {estado}</p>
  </div>
);

const MinhasReservasClientes = () => {
  const navigate = useNavigate();
  const [reserva, setReserva] = useState([]);
  const apiUrl = 'https://localhost:7286';


  useEffect(() => {
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }

    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Reservas/ListadeReservaspor${Cookies.get("id_conta")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      console.log(data);
      setReserva(data);
    } catch (erro) {
      console.error('Erro ao obter as reservas da API:', erro);
    }
  };

  const handleChangeEstado = async (id_reserva, state) => {
    try {
      const response = await fetch(`${apiUrl}/api/Reservas/MudarEstado/${id_reserva}/${state}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Estado atualizado", {
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
  
  return (
    <body className="pagina-solo">
    <div className="home-reservas">
      <HeaderMainPage/>
      <div className="gerir-reservas-page">
      <h1>Minhas Reservas</h1>
        <div className="restaurant-reservas">
          {reserva.map((reservas, index) => (
            <div key={index} className="reservas-button-container">
          <MinhasReservas key={index} nomeRestaurante={reservas.nomeRestaurante} dia={reservas.data_reserva.slice(0, -9)} hora={reservas.horario} mesa={reservas.nomeMesa} pessoas={reservas.quantidade_pessoa} estado={reservas.estado}/>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Cancelado")} className="cancelled-reservas-restaurantes-button"> <MdOutlineFreeCancellation/></button>
          </div>
          ))}        
        </div>
      <ToastContainer/>
      </div>
      <Footer/>
    </div>
    </body>
  );
};

export default MinhasReservasClientes;