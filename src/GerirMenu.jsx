import React, { useEffect, useState } from 'react';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMenus.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbBread } from "react-icons/tb";
import { MdOutlineCookie } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";
import { BsCalendar2Day } from "react-icons/bs";
import { GiCakeSlice } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { FiCoffee } from "react-icons/fi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { TbSoup } from "react-icons/tb";

const MenuItem = ({ nome, preco, desc }) => (
  <div className="menu-item">
    <p className='nome'><b>{nome}</b></p>
    <p className='preco'>{preco.toFixed(2)}€</p>
    <p className='desc'>{desc}</p>
  </div>
);

const GerirMenus = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);


  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }

    const fetchMenu = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/RestauranteMenus/ListadeMenuspor${Cookies.get("id")}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("token"),
          }
        });
        const data = await response.json();
        console.log(data);
        setMenu(data);
      } catch (erro) {
        console.error('Erro ao obter o cardápio da API:', erro);
      }
    };

    fetchMenu();
  }, []);

  const filtrarPorCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  const menuFiltrado = categoriaAtiva
    ? menu.filter((prato) => prato.categoriaPrato === categoriaAtiva)
    : menu;

    const handleMenu = () => {  
      navigate("/RestauranteMenu/") 
   };

   const handleRemove = async (id_pratos) => {  
    try {
      const response = await fetch(`${apiUrl}/api/RestauranteMenus/EliminarPratos/${id_pratos}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      if (response.ok) {
        toast.success("Prato eliminado", {
          closeOnClick: true,
          draggable: true,
          });
        window.location.reload();
      } else {
        console.error('Erro');
      }
    } catch (erro) {
      console.error('Erro:', erro);
    }
 };

  return (
    <div className="home-menu">
      <HeaderRestaurantes/>
      <div className="gerir-menu-page">
      <h1>Administrar Menu</h1>
        <div className="restaurant-menu">
          {menuFiltrado.map((prato, index) => (
            <div key={index} className="menu-button-container">
          <MenuItem key={index} nome={prato.nome} preco={prato.preco} desc={prato.desc_prato} />
          <button onClick={() => handleRemove(prato.id_pratos)} className="remove-menu-button"> <FaRegTrashAlt/></button>
          </div>
          ))}        
        </div>
      <div className="categorias">
        <button onClick={() => filtrarPorCategoria('Pequeno almoço')}><MdOutlineFreeBreakfast/> Pequeno almoço</button>
        <button onClick={() => filtrarPorCategoria('Entradas')}><TbBread/> Entradas</button>
        <button onClick={() => filtrarPorCategoria('Petiscos')}><MdOutlineCookie/> Petiscos</button>
        <button onClick={() => filtrarPorCategoria('Sopa')}><TbSoup/> Sopa</button>
        <button onClick={() => filtrarPorCategoria('Prato do dia')}><BsCalendar2Day/> Prato do dia</button>
        <button onClick={() => filtrarPorCategoria('Pratos principais')}><MdOutlineFastfood/> Pratos principais</button>
        <button onClick={() => filtrarPorCategoria('Sobremesas')}><GiCakeSlice/> Sobremesas</button>
        <button onClick={() => filtrarPorCategoria('Bebidas')}><BiDrink/> Bebidas</button>
        <button onClick={() => filtrarPorCategoria('Café')}><FiCoffee/> Café</button>
        <button onClick={() => filtrarPorCategoria(null)}><MdOutlineCleaningServices/> Limpar Filtros</button>
      </div>
      <button onClick={handleMenu} className="add-gerir-menu-button">Adicionar menu</button>
      <ToastContainer/>
      </div>
      <Footer/>
    </div>
  );
};

export default GerirMenus;