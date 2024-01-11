import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/RestauranteLoc.css";

const RestauranteLoc = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [distrito, setDistrito] = useState('');
  const [gps, setGps] = useState('');
  const [tel, setTel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const handleNome = (e) => {
    setNome(e.target.value);
    setErrorMessage('');
  };

  const handleGPS = (e) => {
    const gpsinput = e.target.value;
    setGps(gpsinput);
    setErrorMessage2('');
  };

  const handleDistrito = (e) => {
    setDistrito(e.target.value);
    setErrorMessage3('');
  };

  const handleTel = (e) => {
    setTel(e.target.value);
    setErrorMessage4('');
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCreateAcount = async () => {

    if(nome == ""){
      return setErrorMessage('Campo obrigatório');
    }
    if(gps == ""){
      return setErrorMessage2('Campo obrigatório');
    }
    if(distrito == ""){
      return setErrorMessage3('Campo obrigatório');
    }
    const newTel = /\D/g;
    if (tel.length != 9 || newTel.test(tel) || tel == "") {
      return setErrorMessage4('Número de telefone inválido');
    }

    sessionStorage.setItem("gps", gps);
    sessionStorage.setItem("distrito", distrito);
    sessionStorage.setItem("tel", tel);

    setDistrito("");
    setGps("");
    setTel("");

    navigate('/RestauranteInfos/');
  };

  return (
    <div className="pagina-loc">
      <img src={imagem} alt="Imagem" className="imagem-loc" />
      <div className="container-loc">
        <div className="loc-esquerda">
          <img src={logo} alt="Logo" className="logo-loc" />
        </div>
        <div className="loc-direita">
          <h1 className="titulo-loc">Bem-vindo à HungryHunters</h1>
          <form className="formulario-loc" onSubmit={handleSubmit(onSubmit)}>
          <input
              type="text"
              placeholder="Nome do restaurante"
              value={nome}
              onChange={handleNome}
              className="input-loc"
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <input
              type="text"
              placeholder="Localização exata"
              value={gps}
              onChange={handleGPS}
              className="input-loc"
              onMouseOver={() => setMostrarTooltip(true)}
              onMouseOut={() => setMostrarTooltip(false)}
              onFocus={() => setMostrarTooltip(true)}
              onBlur={() => setMostrarTooltip(false)}
            />
            {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
            <div className="icon" onMouseOver={() => setMostrarTooltip(true)} onFocus={() => setMostrarTooltip(true)}>
              &#9432;
              {mostrarTooltip && <div className="tooltip">Preencher com as coordenadas do GPS</div>}
            </div>
            <input
              type="text"
              placeholder="Distrito"
              value={distrito}
              onChange={handleDistrito}
              className="input-loc"
            />
            {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
            <input
                type="tel"
                placeholder="Telemóvel"
                value={tel}
                onChange={handleTel}
                className="input-loc"
              />
              {errorMessage4 && <div style={{ color: 'red' }}>{errorMessage4}</div>}
            <input className="botao-loc" type="submit" value={"Criar"} onClick={handleCreateAcount}/>
          </form>
          <div className="links-loc">
            <p className="registro-loc">
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

export default RestauranteLoc;