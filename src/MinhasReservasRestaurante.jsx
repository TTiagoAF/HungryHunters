import React, { useEffect, useState } from 'react';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/MinhasReservasRestaurante.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { BsCalendarDayFill } from "react-icons/bs";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineDinnerDining } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";

const MinhasReservas = ({ nomeRestaurante, dia, hora, mesa, pessoas, estado }) => (
  <div className="reservas-restaurantes-item">
    <p className='nome-restaurantes'><MdOutlineEmojiPeople/> <b>{nomeRestaurante}</b></p>
    <p className='desc-restaurantes'><BsCalendarDayFill/> Dia: {dia}</p>
    <p className='desc-restaurantes'><IoHourglassOutline/> Hora: {hora}</p>
    <p className='desc-restaurantes'><MdOutlineTableRestaurant/> Mesa: {mesa}</p>
    <p className='desc-restaurantes'><MdGroups/> Grupo de: {pessoas} pessoas</p>
    <p className='desc-restaurantes'><FaWalking/> Estado: {estado}</p>
  </div>
);

const MinhasReservasRestaurante = () => {
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
      const response = await fetch(`${apiUrl}/api/Reservas/ListadeReservascom${Cookies.get("id")}`, {
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

   const handleRemove = async (id) => {  
    try {
      const response = await fetch(`${apiUrl}/api/Reservas/EliminarReservas/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Reserva eliminada", {
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
    <body className='pagina-solo'>
    <div className="home-reservas-restaurantes">
      <HeaderRestaurantes/>
      <div className="gerir-reservas-restaurantes-page">
      <h1 className='titulo-reservas-restaurantes'>Minhas Reservas</h1>
        <div className="restaurant-reservas-restaurantes">
          {reserva.map((reservas, index) => (
            <div key={index} className="reservas-restaurantes-button-container">
              <div className='reservas-restaurantes-buttons'>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Pendente")} className="pending-reservas-restaurantes-button"> <MdOutlinePendingActions/></button>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "A comer")} className="alimentar-reservas-restaurantes-button"> <MdOutlineDinnerDining/></button>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Pago")} className="pago-reservas-restaurantes-button"> <RiHandCoinLine/></button>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Não pagou")} className="naopago-reservas-restaurantes-button"> <MdOutlineCreditCardOff/></button>
          </div>
          <MinhasReservas key={index} nomeRestaurante={reservas.nomeCliente} dia={reservas.data_reserva.slice(0, -9)} hora={reservas.horario} mesa={reservas.nomeMesa} pessoas={reservas.quantidade_pessoa} estado={reservas.estado}/>
          <div className='reservas-restaurantes-buttons'>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Cancelado")} className="cancelled-reservas-restaurantes-button"> <MdOutlineFreeCancellation/></button>
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Não conpareceu")} className="noshow-reservas-restaurantes-button"> <MdOutlinePersonOff/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="remove-reservas-restaurantes-button"> <FaRegTrashAlt/></button>
          </div>
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

export default MinhasReservasRestaurante;