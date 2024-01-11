import React, { useState } from 'react';
import './css/Categorias.css';
import { useNavigate } from 'react-router-dom';

const CategoriasRestaurante = () => {
  const categoriasDisponiveis = ['Italiano', 'Japonês', 'Mexicano', 'Vegetariano', 'Peixe', 'Churrasqueira', 'Marisqueira', 'Indiano', 'Pizzaria', 'Vegan', 'Buffet', 'Fast-Food', 'Gourmet', 'Carne', 'Tradicional', 'Petiscos' ];
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);

  const handleCategoriaChange = (categoria) => {
    if (categoriaSelecionada.includes(categoria)) {
      setCategoriaSelecionada(categoriaSelecionada.filter((categoria1) => categoria1 !== categoria));
    } else {
      if (categoriaSelecionada.length < 3) {
        setCategoriaSelecionada([...categoriaSelecionada, categoria]);
      }
    }
  };

  const handleSubmit = () => {
    console.log("Categorias", categoriaSelecionada);
    navigate("/RestauranteAberto/")
  }

  return (
    <div className='pagina-categoria'>
      <h1 className='titulo-principal'>Escolha até 3 Categorias para o Seu Restaurante</h1>
      <div className='container'>
        {categoriasDisponiveis.map((categoria) => (
          <div key={categoria} className="categoria-checkbox">
            <input
              type="checkbox"
              id={categoria}
              checked={categoriaSelecionada.includes(categoria)}
              onChange={() => handleCategoriaChange(categoria)}
              className='check-categoria'
            />
            <label className='label-categoria' htmlFor={categoria}>{categoria}</label>
          </div>
        ))}
      </div>
      <p className='categoria-selecionada'>Categorias Selecionadas: {categoriaSelecionada.join(', ')}</p>
      <input type="submit" value="Escolher categorias" onClick={handleSubmit} className='escolher-categoria'/>
    </div>
  );
};

export default CategoriasRestaurante;