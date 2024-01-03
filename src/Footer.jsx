import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import "./css/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <div className="footer-informacao">
          <h3 className="footer-titulo">Sobre nós</h3>
          <p className="footer-descricao">
          Somos uma plataforma inovadora que conecta os amantes da gastronomia aos melhores restaurantes do pais. Nossa missão é tornar a experiência gastronômica mais incrível e eficiente.          </p>
        </div>
        <div className="footer-links">
          <h3 className="footer-titulo-direita">Links Úteis</h3>
          <ul className="footer-menu">
            <li><a href="#1" className="footer-link">Home</a></li>
            <li><a href="#2" className="footer-link">Sobre nós</a></li>
            <li><a href="#3" className="footer-link">Restaurantes</a></li>
            <li><a href="#4" className="footer-link">Contato</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-botao">
        <p className="footer-copia">© 2023 HungryHunters. Todos os direitos reservados.</p>
        <p className="footer-termos">Termos de Uso | Política de Privacidade</p>
        <div className="footer-social">
          <a href="#1" className="footer-social-icon"><FaFacebook /></a>
          <a href="#2" className="footer-social-icon"><FaTwitter /></a>
          <a href="#3" className="footer-social-icon"><FaLinkedin /></a>
          <a href="#4" className="footer-social-icon"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;