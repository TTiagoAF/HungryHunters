import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/RestauranteLoc.css";
import Cookies from 'js-cookie';
import { Steps } from 'antd';
import { MdLocationOn } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

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
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  useEffect(() => {
    if(Cookies.get("nipc") == undefined)
    {
      navigate("/GerirEmpresas/")
    }
  }, []);

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

    Cookies.set("nome", nome, {expires: 1});
    Cookies.set("gps", gps, {expires: 1});
    Cookies.set("distrito", distrito, {expires: 1});

    setNome("");
    setDistrito("");
    setGps("");

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
          <Steps
            items={[
              {
                title: '1',
                status: 'process',
                icon: <MdLocationOn />,
              },
              {
                title: '2',
                status: 'wait',
                icon: <FaInfoCircle />,
              },
            ]}
          />
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
              {mostrarTooltip && <div className="tooltip">Vá ao google maps, vá em partilhar, incorpore um mapa e copie o html</div>}
            </div>
            <input
              type="text"
              placeholder="Distrito"
              value={distrito}
              onChange={handleDistrito}
              className="input-loc"
            />
            {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
            <input className="botao-loc" type="submit" value={"Seguinte"} onClick={handleCreateAcount}/>
          </form>
          <div className="links-loc">
            <p className="registro-loc">
              <Link to="/GerirEmpresas/" class="Voltar">
                <a href="#2">Voltar</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestauranteLoc;