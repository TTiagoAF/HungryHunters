import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/Restauranteinfo.css";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const RestauranteInfos = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [mesas, setMesas] = useState(0);
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [pessoas, setPessoas] = useState(0);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const apiUrl = 'https://localhost:7286';
  
  useEffect(() => {
    if(Cookies.get("nipc") == undefined || Cookies.get("nome") == undefined || Cookies.get("gps") == undefined || Cookies.get("distrito") == undefined )
    {
      navigate("/GerirEmpresas/")
      Cookies.remove("nome");
      Cookies.remove("gps");
      Cookies.remove("distrito");
    }
  }, []);

  const handleMesas = (e) => {
    const mesasinput = e.target.value;
    setMesas(mesasinput);
  };

  const handlePreco = (e) => {
    setPreco(e.target.value);
  };

  const handleDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handlePessoas = (e) => {
    setPessoas(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleInfos = async () => {

    const novoRestaurante = {
      NipcEmpresa: Cookies.get("nipc"),
      Nome: Cookies.get("nome"),
      PrecoMedio: preco,
      NumeroMesas: mesas,
      Distrito: Cookies.get("distrito"),
      Coordenadas: Cookies.get("gps"),
      Descricao: descricao,
      CapacidadeGrupo: pessoas,
      Autorizado: "false",
  };
  await adicionarConta([novoRestaurante]);
  
    setMesas("");
    setPreco("");
    setDescricao("");
    setPessoas("");

    try {
      const response = await fetch(`${apiUrl}/api/Empresas/MenosRestauranteporNipc/${Cookies.get("nipc")}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        },
      });
      if (response.ok) {
        console.log('ok');
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }

    Cookies.remove("gps");
    Cookies.remove("distrito");
    Cookies.remove("nipc");

    navigate('/GerirRestaurante/');
  };

  const adicionarConta = async (novoRestaurante) => {
    try {
      const response = await fetch(`${apiUrl}/api/Restaurantes/AdicionarRestaurante`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoRestaurante)
      });
    
      if (response.ok) {
        toast.success("Sucesso a adicionar o seu restaurante", {
          closeOnClick: true,
          draggable: true,
          });
      } else {
        const dataerro = await response.json();
        toast.error(dataerro.mensagem, {
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
    <div className="pagina-infos">
      <img src={imagem} alt="Imagem" className="imagem-infos" />
      <div className="container-infos">
        <div className="infos-esquerda">
          <img src={logo} alt="Logo" className="logo-infos" />
        </div>
        <div className="infos-direita">
          <h1 className="titulo-infos">Bem-vindo à HungryHunters</h1>
          <form className="formulario-infos" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              placeholder="Quantas mesas têm"
              value={mesas}
              onChange={handleMesas}
              className="input-infos"
            />
            <input
              type="number"
              placeholder="Preço médio"
              value={preco}
              onChange={handlePreco}
              className="input-infos"
            />
            <textarea
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={handleDescricao}
                className="textarea-input"
                maxLength={2000}
              />
              <input
              type="number"
              placeholder="Grupos"
              value={pessoas}
              onChange={handlePessoas}
              className="input-infos"
              onMouseOver={() => setMostrarTooltip(true)}
              onMouseOut={() => setMostrarTooltip(false)}
              onFocus={() => setMostrarTooltip(true)}
              onBlur={() => setMostrarTooltip(false)}
            />
            <div className="icon" onMouseOver={() => setMostrarTooltip(true)} onFocus={() => setMostrarTooltip(true)}>
              &#9432;
              {mostrarTooltip && <div className="tooltip">Preencher com o máximo de pessoas que aceitam por grupo para almoçar</div>}
            </div>
            <input className="botao-infos" type="submit" value={"Criar"} onClick={handleInfos}/>
            <ToastContainer/>
          </form>
          <div className="links-infos">
            <p className="registro-infos">
              Já têm conta?
              <Link to="/Login/" class="Voltar">
                <a href="#2">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestauranteInfos;