import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurantcriar.jpg';
import "./css/login.css";
import { useForm } from "react-hook-form";

const CriarRestaurante = () => {
  const {
    handleSubmit,
  } = useForm({
    criteriaMode: "all"
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nipc, setNipc] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [numRestaurante, setNumRestaurante] = useState(0);
  const [tel, setTel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage7, setErrorMessage7] = useState('');
  const apiUrl = 'https://localhost:7286';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    setErrorMessage7('');
  };

  const handleNipc = (e) => {
    setNipc(e.target.value);
    setErrorMessage('');
  };

  const handleRazaoSocial = (e) => {
    setRazaoSocial(e.target.value);
    setErrorMessage('');
  };

  const handleNumRestaurante = (e) => {
    setNumRestaurante(e.target.value);
    setErrorMessage('');
  };

  const handleTel = (e) => {
    setTel(e.target.value);
    setErrorMessage('');
  };


  const handleCreateAcount = async () => {

    if(password != confirm)
    {
      return setErrorMessage7('As password têm de coincidir');
    } 

    const newEmpresa = {
      Nipc: nipc,
      Razao_social: razaoSocial,
      Email: email,
      Num_Restaurante: numRestaurante,
      Telemovel: tel,
      Password: password
  };
    
    await adicionarEmpresa([newEmpresa]);
    
    setEmail("");
    setRazaoSocial("");
    setPassword("");
    setConfirm("");
    setNumRestaurante("");
    setTel("");
    setNipc("");
    
    navigate('/LoginEmpresas/');   
};

const adicionarEmpresa = async (newEmpresa) => {
  try {
    const response = await fetch(`${apiUrl}/api/Empresas/AdicionarEmpresa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmpresa)
    });

    if (response.ok) {
      console.log('Nova conta adicionada na API');
    } else {
      const dataerro = await response.json();
      console.error('Erro na operação:', dataerro);
      console.error('Erro ao adicionar nova conta na API', dataerro.mensagem);
      setErrorMessage(dataerro.mensagem);
      throw new Error('Erro ao adicionar nova conta na API');
    }
  } catch (error) {
      console.error('Erro ao adicionar nova conta na API:', error);
      throw error;
  }
};

  const onSubmit = (data) => {
    console.log(data);
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
              placeholder="NIPC"
              value={nipc}
              onChange={handleNipc}
              className="input-login"
            />
          <input
              type="text"
              placeholder="Razão Social"
              value={razaoSocial}
              onChange={handleRazaoSocial}
              className="input-login"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              className="input-login"
            />
            <input
              type="number"
              placeholder="Número de restaurante"
              value={numRestaurante}
              onChange={handleNumRestaurante}
              className="input-login"
            />
            <input
                type="tel"
                placeholder="Telemóvel"
                value={tel}
                onChange={handleTel}
                className="input-loc"
              />
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="input-login"
              />
            </div>
            <div className="container-input-senha">
              <input
                type={"password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={handleConfirm}
                className="input-login"
              />
              {errorMessage7 && <div style={{ color: 'red' }}>{errorMessage7}</div>}
            <input className="botao-login" type="submit" value={"Criar"} onClick={handleCreateAcount}/>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
          </form>
          <div className="links-login">
            <p className="registro-login">
              Já têm conta?
              <Link to="/LoginEmpresas/" class="Voltar">
                <a href="#2">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarRestaurante;