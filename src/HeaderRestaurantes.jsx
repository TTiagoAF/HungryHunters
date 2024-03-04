import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import "./css/HeaderEmpresas.css"
import Cookies from 'js-cookie';
import { FaHome } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";

const HeaderRestaurantes = () => {

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("Razao");
    Cookies.remove("id");
    Cookies.remove("nome");
}

  return (
    <header className="header">
        <Link to="/GerirRestaurante/" class="Voltar">
        <a href="#5" className="logo">
            <img src={logo} alt="HungryHunters" className="logo-image" />
        </a>
          </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/GerirRestaurante/" className="nav-link">
                <a href="#1" className="nav-link"><FaHome/> Home</a>
              </Link>
            </li>
              <li className="nav-item">
            <Link to="/Home/" className="nav-link">
              <a href="#4" className="nav-link" onClick={handleLogout}><FaDoorOpen/> Logout</a>
              </Link>     
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default HeaderRestaurantes;