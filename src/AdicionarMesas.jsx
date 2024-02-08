import React, { useEffect, useState } from 'react';
import "./css/RestauranteMenu.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function RestauranteMesa() {
  const [mesas, setMesas] = useState([{restauranteid: Cookies.get("id"), nome: '', maximo_pessoas: 0, notas: ''}]);
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

  const handleAdicionarMesa = () => {
    setMesas([...mesas, {restauranteid: Cookies.get("id"), nome: '', maximo_pessoas: 0, notas: ''}]);
  };

  const handleRemoverMesa = (index) => {
    const novasMesas = [...mesas];
    novasMesas.splice(index, 1);
    setMesas(novasMesas);
  };

  const handleMesaChange = (index, key, value) => {
    const novasMesas = [...mesas];
    novasMesas[index][key] = value;
    setMesas(novasMesas);
  };

  const handleSetMesa = (event) => {
    event.preventDefault();
    
    fetchMesa();
    console.log('Mesas:', mesas);
  };
  
  const fetchMesa = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Mesas/AdicionarMesa`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mesas)
      });
  
      if (response.ok) {
        toast.success("Sucesso a adicionar a sua mesa", {
          closeOnClick: true,
          draggable: true,
          });
        navigate('/GerirMesas/');
        setMesas("");
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

    const handleMesa = () => {
      navigate("/GerirMesas/")
    };

  return (
    <body className='pagina-adicionar'>
    <div>
      <div className='titulo'>
        <h1 className='titulo-principal'>Registro de Restaurante</h1>
      </div>
      <div className="menu-container">
        <form className='formulario-menu'>
          <h2 className='titulo-secundario'>Mesas do Restaurante</h2>
          {mesas.map((mesa, index) => (
            <div key={index} className="menu-input">
              <label htmlFor={`mesas-${index}`} className='etiqueta-menu'>Nome da mesa</label>
              <input
                type="text"
                id={`mesas-${index}`}
                value={mesa.nome}
                onChange={(e) => handleMesaChange(index, 'nome', e.target.value)}
                required
                className='inserir-menu'
              />

              <label htmlFor={`maximo_pessoas-${index}`} className='etiqueta-menu'>Máximo de pessoas</label>
              <input
                type="number"
                id={`maximo_pessoas-${index}`}
                value={mesa.maximo_pessoas}
                onChange={(e) => handleMesaChange(index, 'maximo_pessoas', e.target.value)}
                required
                className='inserir-menu'
              />

              <textarea
                type="text"
                placeholder="Sobre a mesa"
                value={mesa.notas}
                onChange={(e) => handleMesaChange(index, 'notas', e.target.value)}
                className="textarea-input"
                maxLength={2000}
              />

              <button type="button" onClick={() => handleRemoverMesa(index)} className='button-remover'>
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAdicionarMesa} className='button-novo-menu'>
            Adicionar Mesa
          </button>
          <input type="submit" value="Registrar Mesas" onClick={handleSetMesa} className='submeter-menu'/>
          <button type="button" onClick={handleMesa} className='button-novo-menu'>
            Gerir Mesa
          </button>
            <ToastContainer/>
        </form>
      </div>
    </div>       
    </body>
  );
}

export default RestauranteMesa;