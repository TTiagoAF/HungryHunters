import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import imagem from './../img/restaurant-register.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css";


const CriarConta = () => {
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
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage5, setErrorMessage5] = useState('');
  const [, setApi] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setErrorMessage('');
  };

  const handleUsername = (e) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);
    setErrorMessage('');
  };

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
    setErrorMessage5('');
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchContas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Contas/ListaDeContas`);
        const data = await response.json();
        setApi(data);
      } catch (erro) {
        console.error('Erro ao obter as contas da API:', erro);
      }
    };
    fetchContas();
  }, []);

  const handleCreateAcount = async () => {
      
      if(password != confirm)
      {
        return setErrorMessage5('As password têm de coincidir');
      } 
        const birthYear2 = new Date(selectedDate).toISOString();
        const newConta = {
            Email: email,
            Username: username,
            DataDeNascimento: birthYear2,
            Pontos: 0,
            Password: password
        };
        await adicionarConta([newConta]);
        onSubmit(newConta);

        setEmail("");
        setUsername("");
        setSelectedDate("");
        setPassword("");
        setConfirm("");
        
        navigate('/Login/');   
  };

  const adicionarConta = async (newProduct) => {
    try {
      const response = await fetch(`${apiUrl}/api/Contas/AddConta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        console.log('Nova conta adicionada na API');
      } else {
        const dataerro = await response.json();
        setErrorMessage(dataerro.mensagem);
        throw new Error('Erro ao adicionar nova conta na API');
      }
    } catch (error) {
        console.error('Erro ao adicionar nova conta na API:', error);
        throw error;
    }
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
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              className="input-login"
            />
              <input
              type="date"
              id="datePicker"
              name="datePicker"
              className='data-nascimento'
              value={selectedDate}
              onChange={handleDateChange}
              onMouseOver={() => setMostrarTooltip(true)}
              onMouseOut={() => setMostrarTooltip(false)}
              onFocus={() => setMostrarTooltip(true)}
              onBlur={() => setMostrarTooltip(false)}
            />
            <div className="icon" onMouseOver={() => setMostrarTooltip(true)} onFocus={() => setMostrarTooltip(true)}>
              &#9432;
              {mostrarTooltip && <div className="tooltip">Preencher com a data de nascimento</div>}
            </div>
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
              {errorMessage5 && <div style={{ color: 'red' }}>{errorMessage5}</div>}
            </div>
            <input className="botao-login" type="submit" value={"Criar"} onClick={handleCreateAcount}/>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </form>
          <div className="links-login">
            <p className="registro-login">
              Já têm conta?
              <Link to="/Login/" class="Voltar">
                <a href="#2"> Login</a>
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

export default CriarConta;