import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../img/logo.png';
import "./css/header.css"

const Header = () => {
    return (
      <header className="header">
        <Link to="/Home/" class="Voltar">
        <a href="#5" className="logo">
          <img src={logo} alt="HungryHunters" className="logo-image" />
        </a>
        </Link>
        <nav className="nav">
          <ul className="nav-list-principall">
            <li className="nav-item">
            <Link to="/Home/" className="nav-link">
              <a href="#1" className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/CriarRestaurante/" className="nav-link">
              <a href="#3" className="nav-link">Tenho restaurante</a>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/Login/" className="nav-link">
              <a href="#4" className="nav-link">Sign in</a>
              </Link>     
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;