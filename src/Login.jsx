import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import image from './../img/restaurante-login.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';


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
  const apiUrl = 'https://localhost:7286';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
            Cookies.set("id_conta", data.id, {expires: 1})
            navigate('/MainPage/');
          }
          Cookies.set("token", data.token, {expires: 1})
          toast.success("Bem vindo", {
            closeOnClick: true,
            draggable: true,
            });
        } else {
          console.error('Token ausente na resposta:', data);
        }
      } else {
        const dataerro = await response.json();
        toast.error(dataerro.mensagem, {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Falha no login:');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
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
            <ToastContainer/>
          </form>
          <div className="links-login">
            <p className="esqueceu-senha-login">
              <Link to="/Forgot/" class="Voltar">
                <a href="#1">Esqueceu a sua senha?</a>
              </Link>
            </p>
            <p className="registro-login">
              Ainda não tem uma conta? 
              <Link to="/CreateAcount/" class="Voltar">
                <a href="#2"> Registe-se</a>
              </Link>
            </p>
            <p className="registro-login">
              <Link to="/Home/" class="Voltar">
                <a href="#2">Ir para a página inicial</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaLogin;