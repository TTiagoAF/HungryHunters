import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./css/SearchPage.css"
import HeaderMain from "./HeaderMainPage";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaMap } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { SiCodechef } from "react-icons/si";

function ResultadosPesquisa() {

    const [pesquisa, setPesquisa] = useState(Cookies.get("pesquisa"));
    const [restaurantes, setRestaurantes] = useState([]);
    const apiUrl = 'https://localhost:7286';
    const navigate = useNavigate();

    const changePesquisar = (e) => {
        setPesquisa(e.target.value);
        
      };

      const carregarRestaurantesTodos = async () => {  
        try {
          const response = await fetch(`${apiUrl}/api/Restaurantes/TodaListadeRestaurantesComCategorias`, {
            headers: {
              'Authorization': 'Bearer ' + Cookies.get("token"),
            }
          });
          const data = await response.json();
          console.log(data);
          setRestaurantes(data);
        } catch (erro) {
          console.error('Erro ao obter o cardápio da API:', erro);
        }
      };

    const carregarRestaurantes = async () => {  
        try {
        const response = await fetch(`${apiUrl}/api/Restaurantes/PesquisaDeRestaurantes${pesquisa}`, {
            headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
            }
        });
        const data = await response.json();
        console.log(data);
        setRestaurantes(data);
        } catch (erro) {
        console.error('Erro ao obter o cardápio da API:', erro);
        }
    };

    const handleRestaurante = async (idrestaurante) => {  
        Cookies.set("id_detalhes", idrestaurante);
        navigate("/Details/");
      };

    useEffect(() => {
        carregarRestaurantes();
        if(Cookies.get("token") == undefined)
        {
        Cookies.remove("token");
        navigate("/Home/")
        }
      }, []);


      useEffect(() => {
        if(pesquisa == "")
        {
            carregarRestaurantesTodos();
        }
        else if (pesquisa != ""){
            carregarRestaurantes();
        }
      }, [pesquisa]);

    return (
      <body className="pagina-solo">
      <div className="resultados-page-main">
        <HeaderMain />
        <div className="search-container">
            <input type="text" className="search-bar" placeholder={"Pesquisar"} onChange={changePesquisar} value={pesquisa}/>
        </div>
        <div className="app-container-search">
          <h1 className="app-heading-search">Resultados da Pesquisa</h1>
          {restaurantes.map((restaurante, index) => restaurante.autorizado == "true" &&(
            <button key={index} className="restaurante-card-search" onClick={() => handleRestaurante(restaurante.id_restaurante)}>
              {restaurante.categorias.map((categoria, index) => (
                <div key={index}>
                  <p className="restaurante-info-search"><MdFastfood /> {categoria.categoria_Um} {categoria.categoria_Dois} {categoria.categoria_Tres}</p>
                </div>
              ))}
              <h3 className="restaurante-nome-search"><SiCodechef /> {restaurante.nome}</h3>
              <p className="restaurante-info-search"><FaMap /> Distrito: {restaurante.distrito}</p>
              <p className="restaurante-info-search"><FaMoneyBillAlt /> Preço médio: {restaurante.precoMedio.toFixed(2)}€</p>
            </button>
          ))}
        </div>
        <Footer />
      </div>
      </body>
    );
  }
  export default ResultadosPesquisa;