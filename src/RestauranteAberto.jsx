import React, { useState } from 'react';
import './css/RestauranteAberto.css'
import { useNavigate } from 'react-router-dom';


function RestauranteAberto() {
  const [checkedDays, setCheckedDays] = useState([false, false, false, false, false, false, false]);
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    const newCheckedDays = [...checkedDays];
    newCheckedDays[index] = !newCheckedDays[index];
    setCheckedDays(newCheckedDays);
  };

  const handleNextButtonClick = () => {
    console.log('Dias selecionados:', checkedDays);
    navigate("/RestauranteDisponiblidade/");
  };

  return (
    <div className="app">
      <h1 className="title">Selecione os dias da semana</h1>
      <div className="checkbox-container">
        {diasDaSemana.map((day, index) => (
          <div key={day} className="checkbox-item">
            <input
              type="checkbox"
              id={day}
              className="checkbox-input"
              checked={checkedDays[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={day} className="checkbox-label">
              {day}
            </label>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="next-button" onClick={handleNextButtonClick}>
          Seguinte
        </button>
      </div>
    </div>
  );
}

export default RestauranteAberto;