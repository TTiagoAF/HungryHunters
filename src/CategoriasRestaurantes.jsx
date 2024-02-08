import React, { useState, useEffect } from 'react';
import './css/Categorias.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const CategoriasRestaurante = () => {
  const categoriasDisponiveis = ['Italiano', 'Japonês', 'Mexicano', 'Vegetariano', 'Peixe', 'Churrasqueira', 'Marisqueira', 'Indiano', 'Pizzaria', 'Vegan', 'Buffet', 'Fast-Food', 'Gourmet', 'Carne', 'Tradicional', 'Petiscos' ];
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
  const apiUrl = 'https://localhost:7286';
  const [id, ] = useState(Cookies.get("id"));

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
    fetchCategoria();
  }

  const fetchCategoria = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Categorias/AdicionarCategorias`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{RestauranteId: id, Categoria_Um: categoriaSelecionada[0], Categoria_Dois: categoriaSelecionada[1], Categoria_Tres: categoriaSelecionada[2]
        }]),
      });
  
      if (response.ok) {
        toast.success("Categoria adicionada ou alterada", {
          closeOnClick: true,
          draggable: true,
          });
        setCategoriaSelecionada("");
        navigate("/GerirCategorias/")
      } else {
        const dataerro = await response.json();
        toast.error(dataerro.mensagem, {
          closeOnClick: true,
          draggable: true,
          });
        throw new Error('Erro ao adicionar nova conta na API');
      }
    } catch (error) {
        console.error('Erro ao adicionar nova conta na API:', error);
        throw error;
    }}

    const handleCategorias = () => {
      navigate("/GerirCategorias")
    };

  return (
    <body className='pagina-adicionar'>
    <div className='pagina-categoria'>
      <h1 className='titulo-principal'>Escolha até 3 Categorias para o seu restaurante</h1>
      <div className='container-categoria'>
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
      <input type="submit" value="Gerir Categorias" onClick={handleCategorias} className='escolher-categoria'/>
      <ToastContainer/>
      <br />
      <br />
    </div>         
    </body>
  );
};

export default CategoriasRestaurante;