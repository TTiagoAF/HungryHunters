import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import "./css/HeaderPrincipal.css"
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
    <header className="header-principal">
        <Link to="/GerirEmpresas/" class="Voltar">
        <a href="#5" className="logo-principal">
            <img src={logo} alt="HungryHunters" className="logo-image-principal" />
        </a>
          </Link>
        <nav className="nav-principal">
          <ul className="nav-list-principal">
            <li className="nav-item-principal">
              <Link to="/MainPage/" className="nav-link-principal">
                <a href="#1" className="nav-link-principal"><FaHome/> Inicio</a>
              </Link>
            </li>
            <li className="nav-item-principal">
                  <Link to="/MinhasReservas/" className="nav-link-principal">
              <a href="#3" className="nav-link-principal"><BsJournalBookmarkFill/> Minhas reservas</a>
                  </Link>
                </li>
              <li className="nav-item-principal">
            <Link to="/Home/" className="nav-link-principal">
              <a href="#4" className="nav-link-principal" onClick={handleLogout}><FaDoorOpen/> Sair</a>
              </Link>     
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default HeaderMain;