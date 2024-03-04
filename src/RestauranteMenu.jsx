import React, { useEffect, useState } from 'react';
import "./css/RestauranteMenu.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function RestauranteMenu() {
  const [pratos, setPratos] = useState([{restauranteid: Cookies.get("id"), nome: '', preco: 0 , desc_prato: '', categoriaprato: ''}]);
  const navigate = useNavigate();
  const apiUrl = 'https://localhost:7286';

  useEffect(() => {
    if(Cookies.get("token") == undefined || Cookies.get("Razao") == undefined || Cookies.get("id") == undefined || Cookies.get("nome") == undefined)
    {
      Cookies.remove("token");
        Cookies.remove("Razao");
        Cookies.remove("id");
        Cookies.remove("nome");
      navigate("/LoginEmpresas/")
    }
  }, []);

  const handleAdicionarPrato = () => {
    setPratos([...pratos, {restauranteid: Cookies.get("id"), nome: '', preco: 0, desc_prato: '', categoriaprato: ''}]);
  };

  const handleRemoverPrato = (index) => {
    const novosPratos = [...pratos];
    novosPratos.splice(index, 1);
    setPratos(novosPratos);
  };

  const handlePratoChange = (index, key, value) => {
    const novosPratos = [...pratos];
    novosPratos[index][key] = value;
    setPratos(novosPratos);
  };

  const handleSetPrato = (event) => {
    event.preventDefault();
    fetchmenus();
  };
  
  const fetchmenus = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/RestauranteMenus/AdicionarMenu`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pratos)
      });
  
      if (response.ok) {
        toast.success("Sucesso a adicionar o seu prato", {
          closeOnClick: true,
          draggable: true,
          });
        navigate('/GerirRestaurante/');
        setPratos("");
      } else {
        const dataerro = await response.json();
        toast.error(dataerro.mensagem, {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Erro ao adicionar menu');
      }
    } catch (error) {
        console.error('Erro ao adicionar menu:', error);
        throw error;
    }}

    const handleMenu = () => {
      navigate("/GerirMenus/")
    };

  return (
    <body className='pagina-adicionar'>
    <div>
      <div className='titulo'>
        <h1 className='titulo-principal'>Registar menu</h1>
      </div>
      <div className="menu-container">
        <form className='formulario-menu'>
          <h2 className='titulo-secundario'>Menu do Restaurante</h2>
          {pratos.map((pratos, index) => (
            <div key={index} className="menu-input">
              <label htmlFor={`prato-${index}`} className='etiqueta-menu'>Nome do prato:</label>
              <input
                type="text"
                id={`prato-${index}`}
                value={pratos.nome}
                onChange={(e) => handlePratoChange(index, 'nome', e.target.value)}
                required
                className='inserir-menu'
              />

              <label htmlFor={`preco-${index}`} className='etiqueta-menu'>Preço:</label>
              <input
                type="number"
                id={`preco-${index}`}
                value={pratos.preco}
                onChange={(e) => handlePratoChange(index, 'preco', e.target.value)}
                required
                className='inserir-menu'
              />

              <textarea
                type="text"
                placeholder="Descrição"
                value={pratos.desc}
                onChange={(e) => handlePratoChange(index, 'desc_prato', e.target.value)}
                className="textarea-input"
                maxLength={2000}
              />

              <select
                id={`categoria-${index}`}
                value={pratos.categoriaprato}
                onChange={(e) => handlePratoChange(index, 'categoriaprato', e.target.value)}
                required
                className='inserir-menu'
              >
                <option value="">Selecione uma categoria</option>
                <option value="Pequeno almoço">Pequeno almoço</option>
                <option value="Entradas">Entradas</option>
                <option value="Petiscos">Petiscos</option>
                <option value="Sopa">Sopa</option>
                <option value="Prato do dia">Prato do dia</option>
                <option value="Pratos principais">Pratos principais</option>
                <option value="Sobremesas">Sobremesas</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Café">Café</option>
              </select>

              <button type="button" onClick={() => handleRemoverPrato(index)} className='button-remover'>
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAdicionarPrato} className='button-novo-menu'>
            Adicionar Prato
          </button>
          <input type="submit" value="Registar Menu" onClick={handleSetPrato} className='submeter-menu'/>
          <button type="button" onClick={handleMenu} className='button-novo-menu'>
            Gerir Menu
          </button>
            <ToastContainer/>
        </form>
      </div>
    </div>
    </body>
  );
}

export default RestauranteMenu;