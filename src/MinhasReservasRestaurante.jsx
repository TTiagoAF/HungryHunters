import React, { useEffect, useState } from 'react';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/MinhasReservasRestaurante.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { MdFoodBank } from "react-icons/md";
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

const MinhasReservas = ({ nomeRestaurante, dia, hora, mesa, pessoas, estado }) => (
  <div className="reservas-restaurantes-item">
    <p className='nome-restaurantes'><MdFoodBank/> <b>Restaurante: {nomeRestaurante}</b></p>
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

  return (
    <div className="home-reservas-restaurantes">
      <HeaderRestaurantes/>
      <div className="gerir-reservas-restaurantes-page">
      <h1>Minhas Reservas</h1>
        <div className="restaurant-reservas-restaurantes">
          {reserva.map((reservas, index) => (
            <div key={index} className="reservas-restaurantes-button-container">
          <MinhasReservas key={index} nomeRestaurante={reservas.nomeRestaurante} dia={reservas.data_reserva.slice(0, -9)} hora={reservas.horario} mesa={reservas.nomeMesa} pessoas={reservas.quantidade_pessoa} estado={reservas.estado}/>
          <div className='reservas-restaurantes-buttons'>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="pending-reservas-restaurantes-button"> <MdOutlinePendingActions/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="alimentar-reservas-restaurantes-button"> <MdOutlineDinnerDining/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="pago-reservas-restaurantes-button"> <RiHandCoinLine/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="naopago-reservas-restaurantes-button"> <MdOutlineCreditCardOff/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="cancelled-reservas-restaurantes-button"> <MdOutlineFreeCancellation/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="noshow-reservas-restaurantes-button"> <MdOutlinePersonOff/></button>
          <button onClick={() => handleRemove(reservas.id_reserva)} className="remove-reservas-restaurantes-button"> <FaRegTrashAlt/></button>
          </div>
          </div>
          ))}        
        </div>
      <ToastContainer/>
      </div>
      <Footer/>
    </div>
  );
};

export default MinhasReservasRestaurante;