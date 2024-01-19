import React, { useState } from 'react';
import "./css/Disponibilidade.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RestauranteDisponiblidade() {
  const [horarios, setHorarios] = useState([]);
  const [errorMessage2, setErrorMessage2] = useState('');
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [id, ] = useState(Cookies.get("id"));

  const handleAdicionarHorario = () => {
    setHorarios([...horarios, '']);
  };

  const handleRemoverHorario = (index) => {
    const novosHorarios = [...horarios];
    novosHorarios.splice(index, 1);
    setHorarios(novosHorarios);
  };

  const handleHorarioChange = (index, value) => {
      const novosHorarios = [...horarios];
      novosHorarios[index] = value;
      setHorarios(novosHorarios);
  };


  const handleSetHorarios = (event) => {
    event.preventDefault();
    const formatoInvalido = horarios.some((horario) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(horario));

    if (formatoInvalido) {
      return setErrorMessage2('Um dos horários adicionados está inválido formato correto(HH:mm)');
    }
    if (horarios.length == 0)
    {
      return setErrorMessage2('Adicione um horário');
    }

    fetchhorarios();
    console.log('Horários de funcionamento:', horarios);
    setErrorMessage2('');
    
  };

  const fetchhorarios = async () => {
    try {
      const horariosData = horarios.map((horario) => ({
        RestauranteId: id,
        HoraReserva: horario,
      }));
      const response = await fetch(`${apiUrl}/api/Horarios/AdicionarHorarios`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(horariosData),
      });
  
      if (response.ok) {
        console.log('Nova conta adicionada na API');
        navigate('/GerirRestaurante/');
        setHorarios("");
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

    const handleHorarios = () => {  
      navigate("/GerirHorarios/") 
   };

  return (
    <div>
      <h1 className='titulo-principal'>Registro de Restaurante</h1>
      <div className="horarios-container">
      <form className='formulario-horarios'>
        <h2 className='titulo-secundario'>Horários de funcionamento</h2>
          {horarios.map((horario, index) => (
            <div key={index} className="horario-input">
              <label htmlFor={`horario-${index}`} className='etiqueta-horarios'>Adicionar horário:</label>
              <input
                type="text"
                id={`horario-${index}`}
                value={horario}
                onChange={(e) => handleHorarioChange(index, e.target.value)}
                required
                className='inserir-horario'
              />
              <button type="button" onClick={() => handleRemoverHorario(index)} className='button-remover'>
                Remover
              </button>
            </div>
          ))}
        <button type="button" onClick={handleAdicionarHorario} className='button-novo-horario'>
          Adicionar Horário
        </button>
        <input type="submit" value="Registrar Horários" onClick={handleSetHorarios} className='submeter-horario'/>
        {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
        <button type="button" onClick={handleHorarios} className='button-novo-horario'>
          Voltar
        </button>
      </form>
      </div>
    </div>
  );
}

export default RestauranteDisponiblidade;