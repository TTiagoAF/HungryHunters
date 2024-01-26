import Header from './Header';
import Footer from './Footer';
import imagem from './../img/chef-cozinha.jpg';
import img from './../img/restaurante-main.jpg'
import "./css/style.css"
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="home-page-home">
      <Header/>
      <div className='imagem-inicial-home'>
        <img src={img} alt="Imagem" className="imagem-main-home"/>
        </div>
      <div className='pos-parallax-home'>
      <div className='tem-restaurante-home'>
        <h1 className='titulo-restaurante-home'>Têm um restaurante?</h1>
        <div className='caixa-home'>
          <div className='texto-home'>
            <h2 className='titulo-cadastrar-home'>Informações</h2>
            <p className='texto-cadastrar-home'>Aqui pode ver algumas informações para registrar o seu restaurante.</p>
            <button className='botao-cadastrar-home'>Ver mais informações</button>
            <h2 className='titulo-cadastrar-2-home'>Registrar restaurante</h2>
            <Link to="/CriarRestaurante/">
            <button className='botao-cadastrar-home'>Registrar</button>
            </Link>
          </div>
        <div className='div-imagem'>
        <img src={imagem} alt="Imagem" className="imagem-home"/>
        </div>
      </div>
    </div>
      <div className="texto-introducao-home">
        <h2 className="introducao-titulo-home">Bem-vindo à HungryHunters</h2>
        <p className="introducao-descricao-home">
          Encontre os melhores restaurantes perto de si e faça reservas com facilidade. HungryHunters é a sua plataforma de reserva de restaurantes que oferece uma ampla variedade de opções gastronômicas para todos os gostos.
        </p>
        <p className="introducao-descricao-home">
          Nossa missão é proporcionar a você uma experiência gastronômica incrível, permitindo que descubra novos restaurantes, explore os seus menus e faça reservas com apenas alguns cliques. Mesmo que esteja a planear um encontro, um jantar com amigos ou uma refeição de negócios, estamos aqui para tornar o processo simples e fácil.
        </p>
        <p className="introducao-descricao-home">
          Explore a variedade de restaurantes, veja fotos dos pratos que os restaurantes oferecem e reserve sua mesa com antecedência para evitar de ter de ficar á espera. Junte-se à comunidade de amantes da comida que confiam na HungryHunters para encontrar as melhores opções de acordo com os seus gostos.
        </p>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;