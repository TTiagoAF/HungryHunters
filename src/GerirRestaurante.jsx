import React, { useEffect, useState, useRef } from 'react';
import { Space, Tour } from 'antd';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirRestaurante.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegHourglass } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import { CiPizza } from "react-icons/ci";
import { MdOutlineTableBar } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const GerirRestuarante = () => {
  const navigate = useNavigate();
  const [nome,] = useState(Cookies.get("nome"));
  const [autorizado, setAutorizado] = useState("false");
  const [id, setId] = useState("false");
  const [, setNipc] = useState();
  const [api, setApi] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Menu',
      description: 'Adicione e elimine os pratos do seu restaurante',
      target: () => ref2.current,
    },
    {
      title: 'Imagens do restaurante',
      description: 'Mostre aos seus clientes como é o seu restaurante',
      target: () => ref3.current,
    },
    {
      title: 'Dias de funcionamento',
      description: 'Adicione as suas férias, os dias de folga semanal e os dias que estaram abertos',
      target: () => ref4.current,
    },
    {
      title: 'Horários',
      description: 'Adicione os seus horários de funcionamento',
      target: () => ref5.current,
    },
    {
      title: 'Categorias',
      description: 'Insira as categorias com que o seu restaurante se indentifica',
      target: () => ref6.current,
    },
    {
      title: 'Mesas',
      description: 'Insira as mesas do seu restaurante as descrevendo',
      target: () => ref7.current,
    },
    {
      title: 'Máximo por grupo',
      description: 'Modifique o máximo de pessoas que aceita numa mesa',
      target: () => ref8.current,
    },
    {
      title: 'Minhas reservas',
      description: 'Veja e gerencie as reservas dos seus clientes',
      target: () => ref9.current,
    },
    {
      title: 'Adicionar reserva',
      description: 'Insira a reserva dos clientes que vão ao seu estabelecimento',
      target: () => ref10.current,
    },
    {
      title: 'Minhas Avaliações',
      description: 'Veja o que os clientes estão a achar do seu restaurante',
      target: () => ref11.current,
    },
  ];

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }

    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Restaurantes/Restaurantespor${nome}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
          }
        });
        const data = await response.json();
        setApi(data);
        if (data) {
          console.log('Entrou no if', data);
          console.log(' no if', api);
          const num = Object.values(data).map(autorizado => autorizado.autorizado);
          setAutorizado(num);
          const nipc = Object.values(data).map(Nipc => Nipc.nipc);
          setNipc(nipc);
          const idRestaurante = Object.values(data).map(id => id.id_restaurante);
          setId(parseInt(idRestaurante));
          Cookies.set("id", idRestaurante);
        } else {
          console.log('Não entrou no if');
        }
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    fetchContas();
  }, []);

  const handleEscolherMenus = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirMenus/");
  }

  const handleEscolherImagens = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirImagens/");
  }

  const handleEscolherDias = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirDias/");
  }

  const handleEscolherHorarios = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirHorarios/");
  }

  const handleEscolherCategorias = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirCategorias/");
  }

  const handleEscolherMesas = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirMesas/");
  }

  const handleEscolherMaximo = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/GerirGrupo/");
  }

  const handleMinhasReservas = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/MinhasReservasRestaurante/");
  }

  const handleAdicionarReserva = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/AdicionarReserva/");
  }

  const handleVerAvaliacoes = () => {
    Cookies.set("id", id, {expires: 1});
    navigate("/MinhasAvaliacoes/");
  }

  return (
    <body>
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{
          right: 24,
        }}
        onClick={() => setOpen(true)}
        tooltip={<div>Informações</div>}
      />
    <div className="home-restaurante">
      <HeaderEmpresas />
      <div className="restaurante-page">
        <h1 className='h1'>A gerir restaurante {nome}</h1>
        {autorizado == "false" && (
          <h2 className='h2'>Espere até o seu restaurante ser autorizado</h2>
        )}
        {autorizado == "true" && (
          <div>
            <Space>
            <div className="restaurante-buttons">
              <button className="restaurante-button" onClick={handleEscolherMenus} ref={ref2}>
               <BiDish/> Pratos do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherImagens} ref={ref3}>
              <CiImageOn/> Imagens do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherDias} ref={ref4}>
                <BsCalendar2Date/> Dias de Funcionamento
              </button>
              <button className="restaurante-button" onClick={handleEscolherHorarios} ref={ref5}>
               <FaRegHourglass/> Horários
              </button>
              <button className="restaurante-button" onClick={handleEscolherCategorias} ref={ref6}>
               <CiPizza/> Categorias do Restaurante
              </button>
              <button className="restaurante-button" onClick={handleEscolherMesas} ref={ref7}>
               <MdOutlineTableBar/> Mesas
              </button>
              <button className="restaurante-button" onClick={handleEscolherMaximo} ref={ref8}>
               <MdGroups/> Máximo por grupo
              </button>
              <button className="restaurante-button" onClick={handleMinhasReservas} ref={ref9}>
               <BsJournalBookmarkFill/> Minhas Reservas
              </button>
              <button className="restaurante-button" onClick={handleAdicionarReserva} ref={ref10}>
               <MdAddBusiness/> Adicionar reserva
              </button>
              <button className="restaurante-button" onClick={handleVerAvaliacoes} ref={ref11}>
               <TbStarsFilled/> Minhas Avaliações
              </button>
            </div>
            </Space>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}/>
          </div>
        )}
      </div>
      <Footer />
    </div>
    </body>
  );
}

export default GerirRestuarante;