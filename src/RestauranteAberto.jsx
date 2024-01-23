import React, { useEffect, useState } from 'react';
import './css/RestauranteAberto.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RestauranteAberto() {
  const [checkedDays, setCheckedDays] = useState([false, false, false, false, false, false, false]);
  const [checkedDias, setCheckedDias] = useState(["false", "false", "false", "false", "false", "false", "false"]);
  const [inicioFerias, setInicioFerias] = useState('');
  const [fimFerias, setFimFerias] = useState('');
  const [diafestivo, setDiaFestivo] = useState('');
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
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

  const handleCheckboxChange = (index) => {
    const newCheckedDays = [...checkedDays];
    const newCheckedDias = [...checkedDias];
    if(newCheckedDays[index] == false )
    {
      newCheckedDias[index] = "true";
      setCheckedDias(newCheckedDias);
      newCheckedDays[index] = !newCheckedDays[index];
      setCheckedDays(newCheckedDays);
    }
    else if(newCheckedDays[index] == true )
    {
      newCheckedDias[index] = "false";
      setCheckedDias(newCheckedDias);
      newCheckedDays[index] = !newCheckedDays[index];
      setCheckedDays(newCheckedDays);
    }
  };

  const handleNextButtonClick = () => {
    navigate("/GerirDias/");
  };
  const handleDias = () => {
    console.log('Dias selecionados:', checkedDays);
    console.log('Dias selecionados:', checkedDias);
    fetchDias();
  };

  const fetchDias = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/DiasDeFuncionamentoes/AdicionarDias`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{RestauranteId: id, Segunda: checkedDias[1], Terca: checkedDias[2], Quarta: checkedDias[3], Quinta: checkedDias[4], Sexta: checkedDias[5], Sabado: checkedDias[6], Domingo: checkedDias[0]
        }]),
      });
  
      if (response.ok) {
        toast.success("Sucesso a marcar o seu dia de folga", {
          closeOnClick: true,
          draggable: true,
          });
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

  const handleFeriasSubmit = (e) => {
    e.preventDefault();
    console.log('Início de férias:', inicioFerias);
    console.log('Fim de férias:', fimFerias);
    fetchFerias();
  };

  const fetchFerias = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Ferias/AdicionarFerias`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{RestauranteId: id, InicioFerias: inicioFerias, FimFerias: fimFerias}]),
      });
  
      if (response.ok) {
        toast.success("Sucesso a marcar o seu periodo de férias", {
          closeOnClick: true,
          draggable: true,
          });
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

  const handleFestivoSubmit = (e) => {
    e.preventDefault();
    console.log('Dia festivo:', diafestivo);
    fetchFestivo();
  };

  const fetchFestivo = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/DiasFestivos/AdicionarDiasFestivos`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{RestauranteId: id, DiaFestivo: diafestivo}]),
      });
  
      if (response.ok) {
        toast.success("Sucesso a adicionar o dia festivo", {
          closeOnClick: true,
          draggable: true,
          });
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

  return (
    <div className="app-aberto">
      <h1 className="titulo-aberto">Selecionar os dias de folga do restaurante</h1>
      <div className="checkbox-container-aberto">
        {diasDaSemana.map((day, index) => (
          <div key={day} className="checkbox-item-aberto">
            <input
              type="checkbox"
              id={day}
              className="checkbox-input-aberto"
              checked={checkedDays[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={day} className="checkbox-label-aberto">
              {day}
            </label>
          </div>
        ))}
      </div>
      <div className="button-container-aberto">
        <button className="next-button-aberto" onClick={handleDias}>
          Enviar
        </button>
      </div>
      <div className="ferias-form-aberto">
        <h2>Período de Férias</h2>
        <form onSubmit={handleFeriasSubmit}>
          <label htmlFor="inicioFerias">Início das Férias:</label>
          <input
            type="date"
            id="inicioFerias"
            value={inicioFerias}
            onChange={(e) => setInicioFerias(e.target.value)}
            required
          />
          <label htmlFor="fimFerias">Fim das Férias:</label>
          <input
            type="date"
            id="fimFerias"
            value={fimFerias}
            onChange={(e) => setFimFerias(e.target.value)}
            required
          />
          <button className='enviar-button-aberto' type="submit">Enviar</button>
        </form>
      </div>
      <div className="festivo-form-aberto">
        <h2>Dias em que estão abertos mesmo que seja dia de folga</h2>
        <form onSubmit={handleFestivoSubmit}>
          <label htmlFor="diafestivo">Dia de trabalho</label>
          <input
            type="date"
            id="diafestivo"
            value={diafestivo}
            onChange={(e) => setDiaFestivo(e.target.value)}
            required
          />
          <button className='enviar-button-aberto' type="submit">Enviar</button>
        </form>
      </div>
      <div className="button-container-aberto">
        <button className="next-button-aberto" onClick={handleNextButtonClick}>
          Gerir os meus dias
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RestauranteAberto;