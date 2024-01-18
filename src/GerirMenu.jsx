import React, { useEffect, useState } from 'react';
import HeaderEmpresas from './HeaderEmpresas';
import Footer from './Footer';
import "./css/GerirMenus.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ nome, preco, desc }) => (
  <div className="menu-item">
    <p className='nome'><b>{nome}</b></p>
    <p className='preco'>{preco}</p>
    <p className='desc'>{desc}</p>
  </div>
);

const GerirMenus = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const apiUrl = 'https://localhost:7286';

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("nome") == undefined) {
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
        setMenu(data);
      } catch (erro) {
        console.error('Erro ao obter o cardápio da API:', erro);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="home-menu">
      <HeaderEmpresas/>
      <div className="restaurant-menu">
        {menu.map((prato, index) => (
          <MenuItem
            key={index}
            nome={prato.nome}
            preco={prato.preco}
            desc={prato.desc_prato}
          />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default GerirMenus;