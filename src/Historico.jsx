import React, { useState, useEffect } from 'react';
import "./css/PaginaDetalhes.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import { List, Timeline, Avatar } from 'antd';

const Historico = () => {
  const [idrestaurante, ] = useState(Cookies.get("id"));
  const apiUrl = 'https://localhost:7286';
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Logs/ListadeLogscom${idrestaurante}`, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token"),
        }
      });
      const data = await response.json();
      setLogs(data);
    } catch (erro) {
      console.error('Erro ao obter o cardápio da API:', erro);
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
      <HeaderRestaurantes />
      <div className="detalhes-page">
            <List itemLayout="horizontal">
              <Timeline mode="left">
                {logs.map((item, index) => (
                  <Timeline.Item key={index} label={item.log_Data}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={item.nomeCliente}
                        description={item.descricao}
                      />
                    </List.Item>
                  </Timeline.Item>
                ))}
              </Timeline>
            </List>
      </div>
      <Footer />
    </div>
  </body>
  );
}

export default Historico;