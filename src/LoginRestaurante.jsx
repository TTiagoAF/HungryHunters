import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import image from './../img/restaurante-login.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const PaginaLogin = () => {
  const {
    handleSubmit
  } = useForm({
    criteriaMode: "all"
  });
  const onSubmit = (data) => console.log(data);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = 'https://localhost:7286';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };
  
  const handleLogin = async () => {
    await LoginUtilizadores(email, password)

    setEmail("");
    setPassword("");
    
    
  }

  const LoginUtilizadores = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Contas/Login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          if(data.id != null)
          {
            Cookies.set("id", data.id, {expires: 0.001})
            console.log('Id:', data.id);
            navigate('/Home/' + data.id);
          }
          console.log('Token:', data.token);
          Cookies.set("token", data.token, {expires: 0.001})
        } else {
          console.error('Token ausente na resposta:', data);
        }
      } else {
        const dataerro = await response.json();
        setErrorMessage(dataerro.mensagem);
        throw new Error('Falha no login:');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const handleGoogleLogin = () => {
    // Lógica para fazer login com o Google aqui
  };

  const handleFacebookLogin = () => {
    // Lógica para fazer login com o Facebook aqui
  };

  return (
    <div className="pagina-login">
      <img src={image} alt="Imagem" className="imagem-login" />
      <div className="container-login">
        <div className="div-logo-login">
          <img src={logo} alt="Logo" className="logo-login" />
        </div>
        <div className="login-direita">
          <h1 className="titulo-login">Bem-vindo à HungryHunters</h1>
          <form className="formulario-login" onSubmit={handleSubmit(onSubmit)}>
            <input
              type={"email"}
              placeholder="E-mail"
              onChange={handleEmailChange}
              className="input-login"
            />
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="input-login"
              />
            </div>
            <input className="botao-login" type="submit" value={"Entrar"} onClick={handleLogin}/>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </form>
          <div className="links-login">
            <p className="esqueceu-senha-login">
              <Link to="/Forgot/" class="Voltar">
                <a href="#1">Esqueceu sua senha?</a>
              </Link>
            </p>
            <p className="registro-login">
              Ainda não tem uma conta? 
              <Link to="/CreateAcount/" class="Voltar">
                <a href="#2">Registre-se</a>
              </Link>
            </p>
          </div>
          <div className="login-social">
            <button className="google-login" onClick={handleGoogleLogin}>Login com Google</button>
            <button className="facebook-login" onClick={handleFacebookLogin}>Login com Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaLogin;