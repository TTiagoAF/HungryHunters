import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import "./css/HeaderEmpresas.css"
import Cookies from 'js-cookie';
import { FaHome } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa";

const HeaderMain = () => {

  const handleLogout = () => {
        Cookies.remove("token");
    }

  return (
    <header className="header">
        <Link to="/GerirEmpresas/" class="Voltar">
        <a href="#5" className="logo">
            <img src={logo} alt="HungryHunters" className="logo-image" />
        </a>
          </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/MainPage/" className="nav-link">
                <a href="#1" className="nav-link"><FaHome/> Home</a>
              </Link>
            </li>
            <li className="nav-item">
                  <Link to="/MainPage/" className="nav-link">
              <a href="#3" className="nav-link"><BsFillGearFill/> Configurações</a>
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

export default HeaderMain;