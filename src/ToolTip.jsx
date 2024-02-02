function ToolTip({ nome, maximo, desc }) {
    return (
        <div className="mesa-info-container">
        <p className='info-texto'><strong>Sobre a Mesa:</strong></p>
        <p className='info-texto'>{nome}</p>
        <p className='info-texto'>Máximo de pessoas: {maximo}</p>
        <p className='info-texto'>Detalhes da mesa: {desc}</p>
      </div>
    );
  }
  
  export default ToolTip;