import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import image from './../img/restaurante-login.jpg';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./css/login.css"

const PaginaLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    criteriaMode: "all"
  });
  const onSubmit = (data) => console.log(data);
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
              {...register("multipleErrorInput", {
                required: "Este campo é obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Por favor inserir um email válido."
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="multipleErrorInput"
              render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                  ))
                : null;
                }}
              />
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="input-login"
                {...register("multipleErrorInputs", {
                  required: "Este campo é obrigatório.",
                })}
              />
              <ErrorMessage
              errors={errors}
              name="multipleErrorInputs"
              render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                  ))
                : null;
                }}
              />
            </div>
            <input className="botao-login" type="submit" value={"Entrar"}/>
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