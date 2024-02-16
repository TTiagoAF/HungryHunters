import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import image from './../img/restaurante-login.jpg';
import { useForm } from "react-hook-form";
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';



const LoginEmpresas = () => {
  const {
    handleSubmit
  } = useForm({
    criteriaMode: "all"
  });
  const onSubmit = (data) => console.log(data);
  const navigate = useNavigate();
  const [nipc, setNipc] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'https://localhost:7286';

  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("Razao");
    Cookies.remove("nipc");
  }, []);

  const handleNipcChange = (e) => {
    setNipc(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = async () => {
    await LoginDasEmpresas(nipc, password)

    setNipc("");
    setPassword("");
    
    navigate('/GerirEmpresas/');
  }

  const LoginDasEmpresas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Empresas/LoginEmpresas`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nipc: nipc,
          Password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {         
          Cookies.set("token", data.token, {expires: 1})
          Cookies.set("Razao", data.razao, {expires: 1})
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
              type="text"
              placeholder="Nipc"
              onChange={handleNipcChange}
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
                <a href="#1">Esqueceu sua senha?</a>
              </Link>
            </p>
            <p className="registro-login">
              Ainda não tem uma conta? 
              <Link to="/CriarRestaurante/" class="Voltar">
                <a href="#2">Registre-se</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmpresas;