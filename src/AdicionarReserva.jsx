import React, { useState, useEffect } from 'react';
import "./css/AdicionarReserva.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import { MdOutlineTableBar } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { Popover } from 'antd';

const AdicionarReserva = () => {
  const [idrestaurante, ] = useState(Cookies.get("id"));
  const [, setRestaurante] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [mesas, setMesas] = useState({});
  const [grupo, setGrupo] = useState({});
  const [dataDaReserva, setDataDaReserva] = useState();
  const [horario, setHorario] = useState({});
  const [horarioEscolhido, setHorarioEscolhido] = useState("");
  const [mesaEscolhida, setMesaEscolhida] = useState();
  const [nomeMesaEscolhida, setNomeMesaEscolhida] = useState("");
  const [pessoas, setPessoasEscolhida] = useState();
  const date = moment().format('MMMM Do YYYY, h:mm:ss');

  const carregarRestaurante = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/BuscarRestaurantepor?id=${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurante(data);
      const grupo = Object.values(data).map(grupo => grupo.capacidadeGrupo);
      setGrupo(parseInt(grupo));
    } catch (erro) {
      console.error('Erro a obter capacidade máxima por grupo do restaurante:', erro);
    }
  };

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
      console.error('Erro a obter horários:', erro);
    }
  };

  const handleBuscarMesas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/ListadeMesaspor?RestauranteId=${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
        setMesas(data);
    } catch (erro) {
      console.error('Erro a obter mesas:', erro);
    }
  };

  useEffect(() => {
    handleBuscarMesas();
    carregarRestaurante();
    fetchHorarios();
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }
  }, []);

  const handleMesa = async (nome, id_mesa) => {  
    toast.success(("A mesa escolhida foi a " + nome), {
      closeOnClick: true,
      draggable: true,
      });
    setMesaEscolhida(id_mesa);
    setNomeMesaEscolhida(nome);
  };
  const handleHorario = async (horarioRestaurante) => {  
    toast.success(("O horário escolhido foi as " + horarioRestaurante + "h"), {
      closeOnClick: true,
      draggable: true,
      });
    setHorarioEscolhido(horarioRestaurante);
  };
  const handleGrupo = async (index) => {  
    toast.success(("Grupo de " + parseInt(index + 1) + " pessoas escolhido"), {
      closeOnClick: true,
      draggable: true,
      });
    setPessoasEscolhida(index + 1);
  };
  const handleReserva = async () => {  

    const newReserva = {
      RestauranteId: idrestaurante,
      ContaId: 0,
      MesaId: mesaEscolhida,
      Data_reserva: dataDaReserva,
      Horario: horarioEscolhido,
      Quantidade_pessoa: pessoas,
      Estado: "Pendente",
  };
    
    await adicionarReserva([newReserva]);
  };

  const adicionarReserva = async (newReserva) => {
    try {
      const response = await fetch(`${apiUrl}/api/Reservas/AdicionarReservaDosRestaurantes`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReserva)
      });
  
      if (response.ok) {
        toast.success(("Reserva feita com sucesso"), {
          closeOnClick: true,
          draggable: true,
          });

          const newLogs = [
            {
              RestauranteId: idrestaurante,
              ContaId: 0,
              Descricao: "Foi feita uma reserva para o dia " + dataDaReserva + " para as " + horarioEscolhido + " na mesa " + nomeMesaEscolhida,
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

      } else {
        const dataerro = await response.json();
        toast.error((dataerro.mensagem), {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Erro a adicionar reserva');
      }
    } catch (error) {
        console.error('Erro a adicionar reserva:', error);
        throw error;
    }
  };

  return (
    <div className="restaurante-detalhes">
      <HeaderRestaurantes/>
      <div className="detalhes-page">
      <h2 className='titulo-reserva-cliente'>Faça a sua reserva</h2>
      <h3 className='subtitulo-reserva-cliente'>Data da reserva</h3>
          <input
            type="date"
            id="inicioFerias"
            value={dataDaReserva}
            onChange={(e) => setDataDaReserva(e.target.value)}
            required
          />
      <h3 className='subtitulo-reserva-cliente'>Escolha o horário</h3>
      <div className="detalhes-buttons">
      {Object.values(horario).map((horarioRestaurante, index) => (
        <div key={index} className="mesas-button-container-detalhes">
          <button className="mesas-button-detalhes" onClick={() => handleHorario(horarioRestaurante)}><a href='#mesas'> <CiClock2/> {horarioRestaurante}</a></button>
        </div>
      ))}
      </div>
      <h3 className='subtitulo-reserva-cliente' id='mesas'>Escolha a sua mesa</h3>
      <div className="detalhes-buttons">
      {Object.values(mesas).map((mesa, index) => (
        <div key={index} className="mesas-button-container-detalhes">
        <Popover content={<div>
            <p className='info-texto'><strong>Sobre a mesa:</strong></p>
            <p className='info-texto'>{mesa.nome}</p>
            <p className='info-texto'>Máximo de pessoas: {mesa.maximo_pessoas}</p>
            <p className='info-texto'>{mesa.notas}</p>
          </div>}>
            <button className="mesas-button-detalhes" onClick={() => handleMesa(mesa.nome, mesa.id_mesa)}>
              <MdOutlineTableBar /> {mesa.nome}
            </button>
          </Popover>
      </div>
      ))}
        </div>
        <h3 className='subtitulo-reserva-cliente' id='pessoas'>Quantidade de pessoas</h3>
        <div className="detalhes-buttons">
        {[...Array(grupo)].map((_, index) => (
          <div key={index} className="mesas-button-container-detalhes">
            <button className="mesas-button-detalhes" onClick={() => handleGrupo(index)}><MdGroups/> Grupo {index + 1}</button>
          </div>
        ))}
        </div>
        <button className="detalhes-reserva-button" onClick={handleReserva}>Fazer reserva</button>
      </div>
      <ToastContainer/>
      <Footer/>
    </div>
  );
}

export default AdicionarReserva;