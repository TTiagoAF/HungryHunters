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
import { Tooltip } from 'antd';
import moment from 'moment';

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
  const date = moment().format('MMMM Do YYYY, h:mm:ss');

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

 const handleChangeEstado = async (id_reserva, state, RestauranteId, horario, mesa, data_reserva, contaId) => {
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
        
        const newLogs = [
          {
            RestauranteId: RestauranteId,
            ContaId: contaId,
            Descricao: "O estado da reserva para o dia " + data_reserva + " para as " + horario + " na mesa " + mesa + " foi alterada para " + state,
            Log_Data: date,
          }
        ];

          const response1 = await fetch(`${apiUrl}/api/Logs/AdicionarLogs`, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + Cookies.get("token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLogs)
          });
      
          if (response1.ok) {
            console.log("Ok");
          }

        window.location.reload();
    } else {
      const dataerro = await response.json();
        toast.error(dataerro.mensagem, {
          closeOnClick: true,
          draggable: true,
        });
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
              <Tooltip placement="left" title="Pendente">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Pendente", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="pending-reservas-restaurantes-button"> <MdOutlinePendingActions/></button>
          </Tooltip>
          <Tooltip placement="left" title="A comer">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "A comer", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="alimentar-reservas-restaurantes-button"> <MdOutlineDinnerDining/></button>
          </Tooltip>
          <Tooltip placement="left" title="Pago">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Pago", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="pago-reservas-restaurantes-button"> <RiHandCoinLine/></button>
          </Tooltip>
          <Tooltip placement="left" title="Não pagou">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Não pagou", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="naopago-reservas-restaurantes-button"> <MdOutlineCreditCardOff/></button>
          </Tooltip>
          </div>
          <MinhasReservas key={index} nomeRestaurante={reservas.nomeCliente} dia={reservas.data_reserva.slice(0, -9)} hora={reservas.horario} mesa={reservas.nomeMesa} pessoas={reservas.quantidade_pessoa} estado={reservas.estado}/>
          <div className='reservas-restaurantes-buttons'>
          <Tooltip placement="left" title="Cancelar">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Cancelado", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="cancelled-reservas-restaurantes-button"> <MdOutlineFreeCancellation/></button>
          </Tooltip>
          <Tooltip placement="left" title="Não compareceu">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Não conpareceu", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9), reservas.contaId)} className="noshow-reservas-restaurantes-button"> <MdOutlinePersonOff/></button>
          </Tooltip>
          <Tooltip placement="left" title="Eliminar reserva">
          <button onClick={() => handleRemove(reservas.id_reserva)} className="remove-reservas-restaurantes-button"> <FaRegTrashAlt/></button>
          </Tooltip>
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