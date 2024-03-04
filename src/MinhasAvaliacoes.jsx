import React, { useState, useEffect } from 'react';
import "./css/PaginaDetalhes.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import { Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const TodasAvaliacoes = ({ nome, comida, conforto, beleza, atendimento, velocidade, comentario }) => (
  <div className="mostrar-avaliacoes-item-detalhes">
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /><p className='mostrar-avaliacoes-nome-detalhes'><b>{nome}</b></p>
    <p className='mostrar-avaliacoes-desc-detalhes'>Comentário: {comentario}</p>
    <p className='mostrar-avaliacoes-avaliacao'>Qualidade da comida: </p><Rate allowHalf disabled value={comida}/>
    <p className='mostrar-avaliacoes-avaliacao'>Conforto: </p><Rate allowHalf disabled value={conforto}/>
    <p className='mostrar-avaliacoes-avaliacao'>Beleza do restaurante: </p><Rate allowHalf disabled value={beleza}/>
    <p className='mostrar-avaliacoes-avaliacao'>Atendimento: </p><Rate allowHalf disabled value={atendimento}/>
    <p className='mostrar-avaliacoes-avaliacao'>Velocidade de serviço: </p><Rate allowHalf disabled value={velocidade}/>
  </div>
);

const MinhasAvaliacoes = () => {
  const [idrestaurante, ] = useState(Cookies.get("id"));
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState([]);

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Avaliacoes/ListadeAvaliacoescom${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setAvaliacoes(data);
    } catch (erro) {
      console.error('Erro ao obter as avaliações:', erro);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
    if(Cookies.get("token") == undefined)
    {
      Cookies.remove("token");
      navigate("/Home/")
    }
  }, []);

  return (
    <body className='pagina-solo-avaliacoes'>
    <div className="restaurante-detalhes-original">
      <HeaderRestaurantes/>
      <div className="detalhes-page">
      <div className='mostrar-form-avaliacao'> 
    {avaliacoes.map((avaliacao, index) => (
          <div key={index} className="mostrar-avaliacoes-container-detalhes">
            <TodasAvaliacoes key={index} nome={avaliacao.nomeCliente} comida={avaliacao.comida} conforto={avaliacao.conforto} beleza={avaliacao.beleza} atendimento={avaliacao.atendimento} velocidade={avaliacao.velocidade} comentario={avaliacao.comentario}/>
          </div>
        ))}
    </div>
      </div>
      <Footer/>
    </div>
    </body>
  );
}

export default MinhasAvaliacoes;