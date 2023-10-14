import React from 'react';
import Header from './Header';
import Footer from './Footer';
import imagem from './../img/chef-cozinha.jpg';
import img from './../img/restaurante-main.jpg'
import "./css/style.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <Header/>
      <div className='imagem-inicial'>
        <img src={img} alt="Imagem" className="imagem-main"/>
        </div>
      <div className='pos-parallax'>
      <div className='tem-restaurante'>
        <h1 className='titulo-restaurante'>Têm um restaurante?</h1>
        <div className='caixa'>
          <div className='texto'>
            <h2 className='titulo-cadastrar'>Cadastrar restaurante</h2>
            <p className='texto-cadastrar'>Cadastre o seu restaurante e prencha as informações necessárias. Entraremos em contato.</p>
            <button className='botao-cadastrar'>Ver mais informações</button>
            <h2 className='titulo-cadastrar-2'>Já cadastrou o seu restaurante</h2>
            <button className='botao-cadastrar'>Cadastrar</button>
          </div>
        <div className='div-imagem'>
        <img src={imagem} alt="Imagem" className="imagem"/>
        </div>
      </div>
    </div>
      <div className="texto-introducao">
        <h2 className="introducao-titulo">Bem-vindo à HungryHunters</h2>
        <p className="introducao-descricao">
          Encontre os melhores restaurantes perto de você e faça reservas com facilidade. HungryHunters é a sua plataforma de reserva de restaurantes que oferece uma ampla variedade de opções gastronômicas para todos os gostos.
        </p>
        <p className="introducao-descricao">
          Nossa missão é proporcionar a você uma experiência gastronômica incrível, permitindo que você descubra novos restaurantes, explore seus cardápios e faça reservas com apenas alguns cliques. Esteja você planejando um encontro romântico, um jantar com amigos ou uma refeição de negócios, estamos aqui para tornar o processo simples e conveniente.
        </p>
        <p className="introducao-descricao">
          Explore a variedade de restaurantes, veja fotos dos pratos deliciosos que eles oferecem e reserve sua mesa com antecedência para evitar esperas. Junte-se à comunidade de amantes da comida que confiam no HungryHunters para encontrar as melhores opções de refeições.
        </p>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;