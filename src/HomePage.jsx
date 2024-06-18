import Header from './Header';
import Footer from './Footer';
import imagem from './../img/chef-cozinha.jpg';
import img from './../img/restaurante-main.jpeg'
import imagemcarrousel1 from './../img/imagemcarrousel1.webp'
import imagemcarrousel2 from './../img/restaurantecarrousel2.webp'
import imagemcarrousel3 from './../img/carrousel3.webp'
import "./css/style.css"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Carousel } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const contentStyle = {
  margin: 0,
  height: '100vh',
  lineHeight: '260px',
  textAlign: 'center',
  width: "100%",
};

const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <div className="home-page-home" data-aos="fade-up">
      <Header />
      <Carousel autoplay>
        <div>
          <img src={img} alt="Imagem" style={contentStyle} />
        </div>
        <div>
          <img src={imagemcarrousel1} alt="Imagem" style={contentStyle} />
        </div>
        <div>
          <img src={imagemcarrousel2} alt="Imagem" style={contentStyle} />
        </div>
        <div>
          <img src={imagemcarrousel3} alt="Imagem" style={contentStyle} />
        </div>
      </Carousel>
      <div className='pos-parallax-home'>
        <div className='tem-restaurante-home'>
          <div className='caixa-home' data-aos="fade-up">
            <div className='texto-home'>
              <h1 className='titulo-restaurante-home'>Registe aqui o seu restaurante</h1>
              <h2 className='titulo-cadastrar-home'>Informações</h2>
              <p className='texto-cadastrar-home'>Aqui pode ver algumas informações para registar o seu restaurante.</p>
              <button className='botao-cadastrar-home'>Saiba mais</button>
              <h2 className='titulo-cadastrar-2-home'>Registar restaurante</h2>
              <Link to="/CriarRestaurante/">
                <button className='botao-cadastrar-home'>Registar</button>
              </Link>
            </div>
            <div className='div-imagem'>
              <img src={imagem} alt="Imagem" className="imagem-home" />
            </div>
          </div>
        </div>
        <div className="texto-introducao-home" data-aos="fade-up">
          <h2 className="introducao-titulo-home">Bem-vindo à HungryHunters</h2>
          <p className="introducao-descricao-home">
            Encontre os melhores restaurantes perto de si e faça reservas com facilidade. HungryHunters é a sua plataforma de reserva de restaurantes que oferece uma ampla variedade de opções gastronómicas para todos os gostos.
          </p>
          <p className="introducao-descricao-home">
            A nossa missão é proporcinar-lhe uma experiência gastronómica inesquecivel, que lhe permita descobrir novos restaurantes, explorar deliciosos menus e fazer reservas rápidas com apenas alguns cliques. Se o seu objetivo é planear um jantar romântico, uma almoçarada com amigos ou uma evento de negócios, a HungryHunters ajuda-o com reservas simples e rápidas.
          </p>
          <p className="introducao-descricao-home">
            Explore a variedade de restaurantes e reserve a sua mesa com antecedência para evitar filas de espera. Junte-se à comunidade de <i>food hunters</i> que confiam na HungryHunters para encontrar as melhores opções de acordo com os seus gostos.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;