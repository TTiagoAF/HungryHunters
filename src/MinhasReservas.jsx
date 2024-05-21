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
import { Tooltip } from 'antd';
import moment from 'moment';

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
  const date = moment().format('MMMM Do YYYY, h:mm:ss');


  useEffect(() => {
    window.scrollTo(0,0);
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }

    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Reservas/ListadeReservaspor?ContaId=${Cookies.get("id_conta")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setReserva(data);
    } catch (erro) {
      console.error('Erro ao obter as reservas:', erro);
    }
  };

  const handleChangeEstado = async (id_reserva, state, RestauranteId, horario, mesa, data_reserva) => {
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
              ContaId: Cookies.get("id_conta"),
              Descricao: "A reserva para o dia " + data_reserva + " para as " + horario + " na mesa " + mesa + " foi cancelada",
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
      console.error('Erro a mudar estado da reserva:', erro);
    }
  };
  
  return (
    <body className="pagina-solo">
    <div className="home-reservas">
      <HeaderMainPage/>
      <div className="gerir-reservas-page">
      <h1 className='titulo-reservas'>Minhas Reservas</h1>
        <div className="restaurant-reservas">
          {reserva.map((reservas, index) => (
            <div key={index} className="reservas-button-container">
          <MinhasReservas key={index} nomeRestaurante={reservas.nomeRestaurante} dia={reservas.data_reserva.slice(0, -9)} hora={reservas.horario} mesa={reservas.nomeMesa} pessoas={reservas.quantidade_pessoa} estado={reservas.estado}/>
          <Tooltip placement="left" title="Cancelar">
          <button onClick={() => handleChangeEstado(reservas.id_reserva, reservas.estado = "Cancelado", reservas.restauranteId, reservas.horario, reservas.nomeMesa, reservas.data_reserva.slice(0, -9))} className="cancelled-reservas-restaurantes-button"> <MdOutlineFreeCancellation/></button>
          </Tooltip>
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