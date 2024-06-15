import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import "./css/HeaderMainPage.css"
import Cookies from 'js-cookie';
import { FaHome } from "react-icons/fa";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa";

const HeaderMain = () => {

  const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("id_conta");
    }

  return (
    <header className="header-main">
        <Link to="/GerirEmpresas/" class="Voltar">
        <a href="#5" className="logo-main">
            <img src={logo} alt="HungryHunters" className="logo-image-main" />
        </a>
          </Link>
        <nav className="nav-main">
          <ul className="nav-list-main">
            <li className="nav-item-main">
              <Link to="/MainPage/" className="nav-link-main">
                <a href="#1" className="nav-link-main"><FaHome/> Inicio</a>
              </Link>
            </li>
            <li className="nav-item-main">
                  <Link to="/MinhasReservas/" className="nav-link-main">
              <a href="#3" className="nav-link-main"><BsJournalBookmarkFill/> Minhas reservas</a>
                  </Link>
                </li>
              <li className="nav-item-main">
            <Link to="/Home/" className="nav-link-main">
              <a href="#4" className="nav-link-main" onClick={handleLogout}><FaDoorOpen/> Sair</a>
              </Link>     
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default HeaderMain;