import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css";

const CriarRestaurante = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState(''); 
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [errorMessage5, setErrorMessage5] = useState('');


  const handleUsername = (e) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);
    setErrorMessage2('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage3('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage4('');
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    setErrorMessage5('');
  };

  const onSubmit = (data) => {
    console.log(data);
  };


  const handleCreateAcount = async () => {

    if (username.length < 5 || username.length > 15 ) {

    return setErrorMessage2('O username deve ter entre 5 e 15 caracteres e não deve conter espaços.');

    } 

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(!emailRegex.test(email))
    {
      return setErrorMessage3('Email inválido');
    }
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/;

    if (password.length < 5 || password.length > 20 || password.includes(' ') || !passwordregex.test(password)) {

      return setErrorMessage4('A password deve ter entre 5 e 20 caracteres, não deve conter espaços e têm de conter letras maiusculas, minusculas, número e caracter especial.');
    
    }
    if(password != confirm)
    {
      return setErrorMessage5('As password têm de coincidir');
    } 

    setEmail("");
    setUsername("");
    setPassword("");
    setConfirm("");

    navigate('/RestauranteLoc/');
  };

  const handleGoogleLogin = () => {
    // Lógica para fazer login com o Google aqui
  };

  const handleFacebookLogin = () => {
    // Lógica para fazer login com o Facebook aqui
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
              placeholder="Username"
              value={username}
              onChange={handleUsername}
              className="input-login"
            />
            {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              className="input-login"
            />
            {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="input-login"
              />
              {errorMessage4 && <div style={{ color: 'red' }}>{errorMessage4}</div>}
            </div>
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={handleConfirm}
                className="input-login"
              />
              {errorMessage5 && <div style={{ color: 'red' }}>{errorMessage5}</div>}
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
          <div className="login-social">
            <button className="google-login" onClick={handleGoogleLogin}>
              Criar conta com Google
            </button>
            <button className="facebook-login" onClick={handleFacebookLogin}>
              Criar conta com Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarRestaurante;