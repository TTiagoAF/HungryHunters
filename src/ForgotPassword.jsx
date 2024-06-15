import React, { useState } from 'react';
import logo from './../img/logo.png';
import Forgot from './../img/restaurante-forgot.jpg';
import { Link } from 'react-router-dom';
import "./css/login.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = 'https://localhost:7286';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      newPassword: password
    };
    
    try {
      const response = await fetch(`${apiUrl}/api/Contas/ChangePassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMessage('Password atualizada com sucesso!');
      } else {
        const errorData = await response.json();
        setMessage(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Erro ao atualizar a senha. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="pagina-login">
      <img src={Forgot} alt="Imagem" className="imagem-login" />
      <div className="container-login">
        <div className="login-esquerda">
          <img src={logo} alt="Logo" className="logo-login" />
        </div>
        <div className="login-direita">
          <h1 className="titulo-login">Bem-vindo à HungryHunters</h1>
          <form className="formulario-login" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              className="input-login"
            />
            <div className="password-input-container">
              <input
                type="password"
                placeholder="Nova Password"
                onChange={handlePasswordChange}
                className="input-login"
              />
            </div>
            <input className="botao-login" type="submit" value="Mudar" />
          </form>
          {message && <p className="mensagem">{message}</p>}
          <div className="links-login">
            <p className="registro-login">
              <Link to="/Login/" className="Voltar">
                Voltar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;