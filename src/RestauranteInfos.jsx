import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/Restauranteinfo.css";

const RestauranteInfos = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [mesas, setMesas] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pessoas, setPessoas] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [errorMessage5, setErrorMessage5] = useState('');
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const handleMesas = (e) => {
    const mesasinput = e.target.value;
    setMesas(mesasinput);
    setErrorMessage2('');
  };

  const handlePreco = (e) => {
    setPreco(e.target.value);
    setErrorMessage3('');
  };

  const handleDescricao = (e) => {
    setDescricao(e.target.value);
    setErrorMessage4('');
  };
  const handlePessoas = (e) => {
    setPessoas(e.target.value);
    setErrorMessage5('');
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleInfos = async () => {

    if(mesas == ""){
      return setErrorMessage2('Campo obrigatório');
    }
    if(preco == ""){
      return setErrorMessage3('Campo obrigatório');
    }
    if (descricao == "") {
      return setErrorMessage4('Campo obrigatório');
    }
    if (pessoas == "") {
        return setErrorMessage5('Campo obrigatório');
    }

    setMesas("");
    setPreco("");
    setDescricao("");
    setPessoas("");

    navigate('/RestauranteAberto/');
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
            {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
            <input
              type="number"
              placeholder="Preço médio"
              value={preco}
              onChange={handlePreco}
              className="input-infos"
            />
            {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
            <textarea
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={handleDescricao}
                className="textarea-input"
                maxLength={2000}
              />
              {errorMessage4 && <div style={{ color: 'red' }}>{errorMessage4}</div>}
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
            {errorMessage5 && <div style={{ color: 'red' }}>{errorMessage5}</div>}
            <div className="icon" onMouseOver={() => setMostrarTooltip(true)} onFocus={() => setMostrarTooltip(true)}>
              &#9432;
              {mostrarTooltip && <div className="tooltip">Preencher com o máximo de pessoas que aceitam por grupo para almoçar</div>}
            </div>
            <input className="botao-infos" type="submit" value={"Criar"} onClick={handleInfos}/>
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