import React, { useState, useEffect } from 'react';
import "./css/PaginaDetalhes.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbBread } from "react-icons/tb";
import { MdOutlineCookie } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";
import { BsCalendar2Day } from "react-icons/bs";
import { GiCakeSlice } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { FiCoffee } from "react-icons/fi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { FaMap } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import HeaderMain from './HeaderMainPage';
import Footer from './Footer';
import { MdOutlineTableBar } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import { BsFillTelephoneFill } from "react-icons/bs";
import ToolTip from './ToolTip';

const MenuItem = ({ nome, preco, desc }) => (
  <div className="menu-item-detalhes">
    <p className='nome-detalhes'><b>{nome}</b></p>
    <p className='preco-detalhes'>{preco.toFixed(2)}€</p>
    <p className='desc-detalhes'>{desc}</p>
  </div>
);

const RestaurantDetails = () => {
  const [idrestaurante, ] = useState(Cookies.get("id_detalhes"));
  const [restaurantes, setRestaurante] = useState([]);
  const [menu, setMenu] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [mesas, setMesas] = useState({});
  const [grupo, setGrupo] = useState({});
  const [dataDaReserva, setDataDaReserva] = useState();
  const [horario, setHorario] = useState({});
  const [horarioEscolhido, setHorarioEscolhido] = useState("");
  const [mesaEscolhida, setMesaEscolhida] = useState();
  const [pessoas, setPessoasEscolhida] = useState();
  const [idconta, ] = useState(Cookies.get("id_conta")) 

  const filtrarPorCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  const menuFiltrado = categoriaAtiva
    ? menu.filter((prato) => prato.categoriaPrato === categoriaAtiva)
    : menu;

  const carregarRestaurante = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/BuscarRestaurantepor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      console.log(data);
      setRestaurante(data);
      const grupo = Object.values(data).map(grupo => grupo.capacidadeGrupo);
      setGrupo(parseInt(grupo));
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/RestauranteMenus/ListadeMenuspor${Cookies.get("id_detalhes")}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      console.log(data);
      setMenu(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
    }
  };

  const fetchHorarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Horarios/ListadeHorariospor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      if (data) {
        console.log('Entrou no if2', data);
        const horario = Object.values(data).map(horario => horario.horaReserva);
        setHorario(horario);
      } else {
        console.log('Não entrou no if');
      }
    } catch (erro) {
      console.error('Erro ao obter as contas da API:', erro);
    }
  };

  const handleBuscarMesas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/ListadeMesaspor${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      if (data) {
        console.log('Entrou no if2', data);
        setMesas(data);
      } else {
        console.log('Não entrou no if');
      }
    } catch (erro) {
      console.error('Erro ao obter as contas da API:', erro);
    }
  };

  useEffect(() => {
    handleBuscarMesas();
    carregarRestaurante();
    fetchMenu();
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
      ContaId: idconta,
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
      const response = await fetch(`${apiUrl}/api/Reservas/AdicionarReserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReserva)
      });
  
      if (response.ok) {
        console.log('Nova conta adicionada na API');
        toast.success(("Reserva feita com sucesso"), {
          closeOnClick: true,
          draggable: true,
          });
      } else {
        const dataerro = await response.json();
        toast.error((dataerro.mensagem), {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Erro ao adicionar nova conta na API');
      }
    } catch (error) {
        console.error('Erro ao adicionar nova conta na API:', error);
        throw error;
    }
  };

  return (
    <body className='pagina-solo'>
    <div className="restaurante-detalhes-original">
      <HeaderMain/>
      <scroll-container>
        <scroll-page>
      <div className="detalhes-page">
      {restaurantes.map((restaurante, index) => (
        <div key={index} className="informacoes-detalhes">
        <h1 className="restaurante-nome-detalhes"><SiCodechef/> {restaurante.nome}</h1>
        {restaurante.categorias.map((categoria, index) => (
            <div key={index}>
          <p className="restaurante-info-detalhes"> <MdFastfood/> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
          </div>
          ))}
        <p className="distrito-detalhes"><FaCity/> <strong>Distrito:</strong> {restaurante.distrito}</p>
        <p className="preco-medio-detalhes"> <FaMoneyBillAlt/> <strong>Preço médio:</strong> {restaurante.precoMedio.toFixed(2)}€</p>
        <p className="descricao-detalhes"><BsFillTelephoneFill/><strong>Telemóvel:</strong> {restaurante.telemovel}</p>
        <p className="descricao-detalhes"><MdDescription/><strong>Descrição:</strong> {restaurante.descricao}</p>
        <h3><FaMap/> Localização:</h3>
        <div dangerouslySetInnerHTML={{ __html: (restaurante.coordenadas)}}/>
        </div>
      ))}
      <h2 className="menu-header-detalhes">Menu</h2>
      <div className="restaurant-menu-detalhes">
        {menuFiltrado.map((prato, index) => (
          <div key={index} className="menu-button-container-detalhes">
            <MenuItem key={index} nome={prato.nome} preco={prato.preco} desc={prato.desc_prato} />
          </div>
        ))}        
      </div>
      <div className="categorias-detalhes">
        <button onClick={() => filtrarPorCategoria('Pequeno almoço')}><MdOutlineFreeBreakfast/> Pequeno almoço</button>
        <button onClick={() => filtrarPorCategoria('Entradas')}><TbBread/> Entradas</button>
        <button onClick={() => filtrarPorCategoria('Petiscos')}><MdOutlineCookie/> Petiscos</button>
        <button onClick={() => filtrarPorCategoria('Sopa')}><TbSoup/> Sopa</button>
        <button onClick={() => filtrarPorCategoria('Prato do dia')}><BsCalendar2Day/> Prato do dia</button>
        <button onClick={() => filtrarPorCategoria('Pratos principais')}><MdOutlineFastfood/> Pratos principais</button>
        <button onClick={() => filtrarPorCategoria('Sobremesas')}><GiCakeSlice/> Sobremesas</button>
        <button onClick={() => filtrarPorCategoria('Bebidas')}><BiDrink/> Bebidas</button>
        <button onClick={() => filtrarPorCategoria('Café')}><FiCoffee/> Café</button>
        <button onClick={() => filtrarPorCategoria(null)}><MdOutlineCleaningServices/> Limpar Filtros</button>
      </div>
      </div>
      <div className="detalhes-page">
      <h2>Faça a sua reserva</h2>
      <h3>Data da reserva</h3>
          <input
            type="date"
            id="inicioFerias"
            value={dataDaReserva}
            onChange={(e) => setDataDaReserva(e.target.value)}
            required
            className='input-data-detalhes'
          />
      <h3>Escolha o horário</h3>
      <div className="detalhes-buttons">
      {Object.values(horario).map((horarioRestaurante, index) => (
        <div key={index} className="mesas-button-container-detalhes">
          <button className="mesas-button-detalhes" onClick={() => handleHorario(horarioRestaurante)}><a href='#mesas'> <CiClock2/> {horarioRestaurante}</a></button>
        </div>
      ))}
      </div>
      <h3 id='mesas'>Escolha a sua mesa</h3>
      <div className="detalhes-buttons">
      {Object.values(mesas).map((mesa, index) => (
        <div key={index} className="mesas-button-container-detalhes">
        <button className="mesas-button-detalhes" onClick={() => handleMesa(mesa.nome, mesa.id_mesa)}> <MdOutlineTableBar/> {mesa.nome}</button>
        <ToolTip nome={mesa.nome} maximo={mesa.maximo_pessoas} desc={mesa.notas}/>
      </div>
      ))}
        </div>
        <h3 id='pessoas'>Quantidade de pessoas</h3>
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
      </scroll-page>
      </scroll-container>
      <Footer/>
    </div>
    </body>
  );
}

export default RestaurantDetails;