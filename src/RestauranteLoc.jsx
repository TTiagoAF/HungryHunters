import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css";

const RestauranteLoc = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [distrito, setDistrito] = useState('');
  const [gps, setGps] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [mostrarTooltip, setMostrarTooltip] = useState(false);


  const handleGPS = (e) => {
    const usernameInput = e.target.value;
    setGps(usernameInput);
    setErrorMessage2('');
  };

  const handleDistrito = (e) => {
    setDistrito(e.target.value);
    setErrorMessage3('');
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrorMessage4('');
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCreateAcount = async () => {

    if(gps == ""){
      return setErrorMessage2('Campo obrigatório');
    }
    if(distrito == ""){
      return setErrorMessage3('Campo obrigatório');
    }
    const newPhone = /\D/g;
    if (phone.length != 9 || newPhone.test(phone)) {

      return setErrorMessage4('Número de telefone inválido');
  
    }
    

    setDistrito("");
    setGps("");
    setPhone("");

    navigate('/RestauranteDisponiblidade/');
  };

  return (
    <div className="pagina-login">
      <img src={imagem} alt="Imagem" className="imagem-login" />
      <div className="container-login">
        <div className="login-esquerda">
          <img src={logo} alt="Logo" className="logo-login" />
        </div>
        <div className="login-direita">
          <h1 className="titulo-login">Bem-vindo à HungryHunters</h1>
          <form className="formulario-login" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Localização exata"
              value={gps}
              onChange={handleGPS}
              className="input-login"
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
              className="input-login"
            />
            {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
            <div className="container-input-senha">
            <input
                type="tel"
                placeholder="Telemóvel"
                value={phone}
                onChange={handlePhone}
                className="input-login"
              />
              {errorMessage4 && <div style={{ color: 'red' }}>{errorMessage4}</div>}
            </div>
            <input className="botao-login" type="submit" value={"Criar"} onClick={handleCreateAcount}/>
          </form>
          <div className="links-login">
            <p className="registro-login">
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