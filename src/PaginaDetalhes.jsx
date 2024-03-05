import React, { useState, useEffect } from 'react';
import "./css/PaginaDetalhes.css"
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Avatar, Popover, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Carousel, Image } from 'antd';
import { FloatButton, message } from 'antd';
import { FaRegCopy } from "react-icons/fa";
import moment from 'moment';

const MenuItem = ({ nome, preco, desc }) => (
  <div className="menu-item-detalhes">
    <p className='nome-detalhes'><b>{nome}</b></p>
    <p className='preco-detalhes'>{preco.toFixed(2)}€</p>
    <p className='desc-detalhes'>{desc}</p>
  </div>
);
const TodasAvaliacoes = ({ nome, comida, conforto, beleza, atendimento, velocidade, comentario }) => (
  <div className="mostrar-avaliacoes-item-detalhes">
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /><p className='mostrar-avaliacoes-nome-detalhes'><b>{nome}</b></p>
    <p className='mostrar-avaliacoes-desc-detalhes' style={{ whiteSpace: 'pre-line' }}>{comentario}</p>
    <p className='mostrar-avaliacoes-avaliacao'>Qualidade da comida: </p><Rate allowHalf disabled value={comida}/>
    <p className='mostrar-avaliacoes-avaliacao'>Conforto: </p><Rate allowHalf disabled value={conforto}/>
    <p className='mostrar-avaliacoes-avaliacao'>Beleza do restaurante: </p><Rate allowHalf disabled value={beleza}/>
    <p className='mostrar-avaliacoes-avaliacao'>Atendimento: </p><Rate allowHalf disabled value={atendimento}/>
    <p className='mostrar-avaliacoes-avaliacao'>Velocidade de serviço: </p><Rate allowHalf disabled value={velocidade}/>
  </div>
);

const RestaurantDetails = () => {
  const params = useParams();
  const [restaurantes, setRestaurante] = useState([]);
  const [menu, setMenu] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [mesas, setMesas] = useState({});
  const [grupo, setGrupo] = useState({});
  const [dataDaReserva, setDataDaReserva] = useState("");
  const [horario, setHorario] = useState({});
  const [horarioEscolhido, setHorarioEscolhido] = useState("");
  const [mesaEscolhida, setMesaEscolhida] = useState(0);
  const [nomeMesaEscolhida, setNomeMesaEscolhida] = useState("");
  const [pessoas, setPessoasEscolhida] = useState(0);
  const [idconta, ] = useState(Cookies.get("id_conta"))
  const [comida, setComida] = useState(0);
  const [conforto, setConforto] = useState(0);
  const [beleza, setBeleza] = useState(0);
  const [atendimento, setAtendimento] = useState(0);
  const [velocidade, setVelocidade] = useState(0);
  const [comentario, setComentario] = useState("");
  const [imagens, setImagens] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const date = moment().format('MMMM Do YYYY, h:mm:ss');

  const contentStyle = {
    margin: 0,
    lineHeight: '260px',
    textAlign: 'center',
    width: "1500px",
    height: "600px",
  };

  const handleComidaChange = (value) => {
    setComida(value);
  }

  const handleComentario = (e) => {
    setComentario(e.target.value);
  };

  const handleConfortoChange = (value) => {
    setConforto(value);
  }

  const handleBelezaChange = (value) => {
    setBeleza(value);
  }

  const handleAtendimentoChange = (value) => {
    setAtendimento(value);
  }

  const handleVelocidadeChange = (value) => {
    setVelocidade(value);
  }

  const handleAvaliacao = async () => {  

    const newAvaliacao = {
      RestauranteId: params.id,
      ContaId: idconta,
      Comida: comida,
      Conforto: conforto,
      Beleza: beleza,
      Atendimento: atendimento,
      Velocidade: velocidade,
      Comentario: comentario,
  };
    
    await adicionarAvaliacao([newAvaliacao]);
  };

  const adicionarAvaliacao = async (newAvaliacao) => {
    try {
      const response = await fetch(`${apiUrl}/api/Avaliacoes/AdicionarAvaliacao`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAvaliacao)
      });
  
      if (response.ok) {
        toast.success(("Avaliação feita com sucesso"), {
          closeOnClick: true,
          draggable: true,
          });
          window.location.reload();
      } else {
        const dataerro = await response.json();
        toast.error((dataerro.mensagem), {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Erro ao adicionar avaliação');
      }
    } catch (error) {
        console.error(error);
        throw error;
    }
  };

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Avaliacoes/ListadeAvaliacoesLimitadacom?RestauranteId=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        },
      });
      const data = await response.json();
      setAvaliacoes(data);
    } catch (erro) {
      console.error('Erro ao obter as avaliações:', erro);
    }
  };

  const carregarImagem = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/FotosRestaurantes/ObterImagensRestaurante/?restauranteId=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setImagens(data.caminhosImagens);
    } catch (erro) {
      console.error('Erro ao obter as imagens:', erro);
    }
  };

  const filtrarPorCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  const menuFiltrado = categoriaAtiva
    ? menu.filter((prato) => prato.categoriaPrato === categoriaAtiva)
    : menu;

  const carregarRestaurante = async () => {  
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/BuscarRestaurantepor?id=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setRestaurante(data);
      const grupo = Object.values(data).map(grupo => grupo.capacidadeGrupo);
      setGrupo(parseInt(grupo));
    } catch (erro) {
      console.error('Erro ao obter as informações do restaurante:', erro);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/RestauranteMenus/ListadeMenuspor?RestauranteId=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setMenu(data);
    } catch (erro) {
      console.error('Erro ao obter o menu:', erro);
    }
  };

  const fetchHorarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Horarios/ListadeHorariospor?RestauranteId=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
        const horario = Object.values(data).map(horario => horario.horaReserva);
        setHorario(horario);
    } catch (erro) {
      console.error('Erro ao obter os horários:', erro);
    }
  };

  const handleBuscarMesas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/ListadeMesaspor?RestauranteId=${params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
        setMesas(data);
    } catch (erro) {
      console.error('Erro ao obter as mesas:', erro);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
    carregarImagem();
    handleBuscarMesas();
    carregarRestaurante();
    fetchMenu();
    fetchHorarios();
    fetchAvaliacoes();
    if(Cookies.get("token") == undefined || Cookies.get("id_conta") == undefined || Cookies.get("id_detalhes") == undefined)
    {
      Cookies.remove("token");
      Cookies.remove("id_conta");
      Cookies.remove("id_detalhes");
      navigate("/Home/")
    }
  }, []);

  const handleMesa = async (nome, id_mesa) => {  
    toast.success(("A mesa escolhida foi a " + nome), {
      closeOnClick: true,
      draggable: true,
      });
      setNomeMesaEscolhida(nome);
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

    if(dataDaReserva == "")
    {
      return toast.error(("Escolha uma data"), {
        closeOnClick: true,
        draggable: true,
        });
    }
    if(mesaEscolhida == 0)
    {
      return toast.error(("Escolha uma mesa"), {
        closeOnClick: true,
        draggable: true,
        });
    }
    if(pessoas == 0)
    {
      return toast.error(("Escolha a quantidade de pessoas"), {
        closeOnClick: true,
        draggable: true,
        });
    }

    const newReserva = {
      RestauranteId: params.id,
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
              RestauranteId: params.id,
              ContaId: idconta,
              Descricao: "Foi feita uma reserva para o dia " + dataDaReserva.toString() + " para as " + horarioEscolhido + " na mesa " + nomeMesaEscolhida,
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
        throw new Error('Erro ao adicionar reserva');
      }
    } catch (error) {
        console.error('Erro ao adicionar reserva:', error);
        throw error;
    }
  };

  const handleTodasAvaliacoes = () => {
    navigate("/TodasAvaliacoes/");
  }

  const handleCopy = () => {
    const currentUrl = window.location.href;
    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    messageApi.open({
      type: 'success',
      content: 'URL Copiado',
    });
  }

  return (
    <body className='pagina-solo'>
      {contextHolder}
      <FloatButton
        icon={<FaRegCopy />}
        type="primary"
        style={{
          right: 24,
        }}
        onClick={handleCopy}
        tooltip={<div>Copiar Link</div>}
      />
    <div className="restaurante-detalhes-original">
      <HeaderMain/>
      <scroll-container>
        <scroll-page>
      <div className="detalhes-page">
      <Carousel autoplay>
      {imagens.map((imagem, index) => (
            <div key={index}>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                <Image src={"https://localhost:7286/Imagens/" + imagem} style={contentStyle} alt={`Imagem ${index + 1}`}/>
              </Image.PreviewGroup>
          </div>
          ))}
      </Carousel>
      {restaurantes.map((restaurante, index) => (
        <div key={index} className="informacoes-detalhes">
          <div className='infos-exceto-mapa'>
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
        </div>
        <div className='mapa' dangerouslySetInnerHTML={{ __html: (restaurante.coordenadas)}}/>
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
      <div className='mostrar-form-avaliacao'>
      <div className="avaliacao-form">
      <h2>Formulário de Avaliação</h2>
      <div className="campo-avaliacao">
        <h2 className='tipo-titulo-avaliacao'>Qualidade da comida:</h2>
        <div className="estrelas">
        <Rate allowHalf onChange={handleComidaChange}/>
        </div>
        <h2 className='tipo-titulo-avaliacao'>Conforto:</h2>
        <div className="estrelas">
        <Rate allowHalf onChange={handleConfortoChange}/>
        </div>
        <h2 className='tipo-titulo-avaliacao'>Beleza do restaurante:</h2>
        <div className="estrelas">
        <Rate allowHalf onChange={handleBelezaChange}/>
        </div>
        <h2 className='tipo-titulo-avaliacao'>Atendimento:</h2>
        <div className="estrelas">
        <Rate allowHalf onChange={handleAtendimentoChange}/>
        </div>
        <h2 className='tipo-titulo-avaliacao'>Velocidade do serviço:</h2>
        <div className="estrelas">
        <Rate allowHalf onChange={handleVelocidadeChange}/>
        </div>
      </div>
      <div className="campo-avaliacao-desc">
        <h2>Comentários Adicionais:</h2>
        <textarea
        type="text"
        placeholder="Faça aqui o seu comentário adicional"
        value={comentario}
        onChange={handleComentario}
        className="textarea-input-avaliacoes"
        maxLength={2000}
      />
      </div>
      <button className="detalhes-reserva-button" onClick={handleAvaliacao}>Submeter avaliação</button>
    </div>
    {avaliacoes.map((avaliacao, index) => (
          <div key={index} className="mostrar-avaliacoes-container-detalhes">
            <TodasAvaliacoes key={index} nome={avaliacao.nomeCliente} comida={avaliacao.comida} conforto={avaliacao.conforto} beleza={avaliacao.beleza} atendimento={avaliacao.atendimento} velocidade={avaliacao.velocidade} comentario={avaliacao.comentario}/>
          </div>
        ))}
        <button className="detalhes-reserva-button" onClick={handleTodasAvaliacoes}>Ver todas as avaliações</button>
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