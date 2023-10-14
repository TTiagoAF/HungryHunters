import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurant-register.jpg';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./css/login.css"

const CriarConta = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({
    criteriaMode: "all"
  });
  const [, setEmail] = useState('');
  const [, setUsername] = useState('');
  const [, setNumero] = useState('');
  const [, setPassword] = useState('');
  const [, setConfirm] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlenumero = (e) => {
    setNumero(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
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
              type="username"
              placeholder="Username"
              onChange={handleUsername}
              className="input-login"
              {...register("ErrorUsername", {
                required: "Este campo é obrigatório.",
                maxLength: {
                  value: 20,
                  message: "O username só pode ter 20 caracteres"
                },
                minLength: {
                  value: 5,
                  message: "Por favor inserir um username com mais de 5 caracteres."
                },
                validate: (value) =>
                !value.includes(' ') || 'O username não pode conter espaços.'
              })}
            />
            <ErrorMessage
              errors={errors}
              name="ErrorUsername"
              render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                  ))
                : null;
                }}
              />
            <input
              type={"email"}
              placeholder="E-mail"
              onChange={handleEmailChange}
              className="input-login"
              {...register("ErrorEmail", {
                required: "Este campo é obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Por favor inserir um email válido."
                },
                validate: (value) =>
                !value.includes(' ') || 'O email não pode conter espaços.'
              })}
            />
            <ErrorMessage
              errors={errors}
              name="ErrorEmail"
              render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                  ))
                : null;
                }}
              />
              <input
              type="numero"
              placeholder="numero"
              onChange={handlenumero}
              className="input-login"
              {...register("ErrorUsername", {
                required: "Este campo é obrigatório.",
                maxLength: {
                  value: 20,
                  message: "O username só pode ter 20 caracteres"
                },
                minLength: {
                  value: 5,
                  message: "Por favor inserir um username com mais de 5 caracteres."
                },
                validate: (value) =>
                !value.includes(' ') || 'O username não pode conter espaços.'
              })}
            />
            <ErrorMessage
              errors={errors}
              name="ErrorUsername"
              render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                  ))
                : null;
                }}
              />
              <input
              type="date"
              id="datePicker"
              name="datePicker"
              className='data-nascimento'
            />
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="input-login"
                {...register("Errorpassword", {
                  required: "Este campo é obrigatório.",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
                    message: "A senha deve conter pelo menos uma letra maíuscula, uma minuscula, um número, e um caracter especial."
                  },
                  maxLength: {
                    value: 20,
                    message: "A senha só pode ter 20 caracteres"
                  },
                  minLength: {
                    value: 8,
                    message: "A senha tem de ter no mínimo 8 caracteres"
                  },
                  validate: (value) =>
                  !value.includes(' ') || 'A password não pode conter espaços.'
                })}
              />
              <ErrorMessage
              errors={errors}
              name="Errorpassword"
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
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Confirm password"
                onChange={handleConfirm}
                className="input-login"
                {...register('confirmPassword', {
                  required: 'Confirmação de senha é obrigatória.',
                  validate: (value) =>
                  value === getValues('Errorpassword') || 'As senhas não coincidem.'
                })}
              />
              <ErrorMessage
              errors={errors}
              name="confirmPassword"
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
            <input className="botao-login" type="submit" value={"Criar"} />
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

export default CriarConta;