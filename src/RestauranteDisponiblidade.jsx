import React, { useState } from 'react';
import "./css/Disponibilidade.css";

function RestauranteDisponiblidade() {
  const [horarios, setHorarios] = useState([]);
  const [errorMessage2, setErrorMessage2] = useState('');

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

    // Enviar os dados para o backend
    console.log('Horários de funcionamento:', horarios);
    setErrorMessage2('');
    
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
      </form>
      </div>
    </div>
  );
}

export default RestauranteDisponiblidade;