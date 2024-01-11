import React, { useState } from 'react';
import "./css/RestauranteMenu.css";
import { useNavigate } from 'react-router-dom';

function RestauranteMenu() {
  const [pratos, setPratos] = useState([{ nome: '', preco: 0 , desc: ''}]);
  const [errorMessage2, setErrorMessage2] = useState('');
  const navigate = useNavigate();

  const handleAdicionarPrato = () => {
    setPratos([...pratos, { nome: '', preco: 0, desc: ''}]);
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
    if (pratos.length === 0 || pratos.some(pratos => !pratos.nome || !pratos.preco) || pratos.preco == 0 || pratos.desc == "") {
      return setErrorMessage2('Preencha todos os campos de prato, preço e descrição');
    }

    // Enviar os dados para o backend
    console.log('Pratos:', pratos);
    setErrorMessage2('');

    navigate('/ImagemMenu/');
  };

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
                onChange={(e) => handlePratoChange(index, 'desc', e.target.value)}
                className="textarea-input"
                maxLength={2000}
              />

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