import React from 'react';
import "./css/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <div className="footer-informacao">
          <h3 className="footer-titulo">Sobre nós</h3>
          <p className="footer-descricao">
          Somos uma plataforma inovadora que conecta os <i>food hunters</i> aos melhores restaurantes do país. A nossa missão é proporcinar-lhe uma experiência gastronómica inesquecivel.</p>
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
      </div>
    </footer>
  );
};

export default Footer;