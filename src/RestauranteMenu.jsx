import React, { useState } from 'react';
import "./css/RestauranteMenu.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RestauranteMenu() {
  const [pratos, setPratos] = useState([{restauranteid: Cookies.get("id"), nome: '', preco: 0 , desc_prato: '', categoriaprato: ''}]);
  const [errorMessage2, setErrorMessage2] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'https://localhost:7286';

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
    console.log('Pratos:', pratos);
    setErrorMessage2('');
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
        console.log('Nova conta adicionada na API');
        navigate('/GerirRestaurante/');
        setPratos("");
      } else {
        const dataerro = await response.json();
        console.error('Erro na operação:', dataerro);
        console.error('Erro ao adicionar nova conta na API', dataerro.mensagem);
        setErrorMessage2(dataerro.mensagem);
        throw new Error('Erro ao adicionar nova conta na API');
      }
    } catch (error) {
        console.error('Erro ao adicionar nova conta na API:', error);
        throw error;
    }}

  return (
    <div>
      <div className='titulo'>
        <h1 className='titulo-principal'>Registro de Restaurante</h1>
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
          <input type="submit" value="Registrar Menu" onClick={handleSetPrato} className='submeter-menu'/>
          {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
        </form>
      </div>
    </div>
  );
}

export default RestauranteMenu;