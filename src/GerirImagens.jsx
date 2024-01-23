import HeaderRestaurantes from './HeaderRestaurantes';
import Footer from './Footer';
import "./css/GerirMenus.css"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const GerirImagens = () => {

  const navigate = useNavigate();

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

  return (
    <div className="home-page">
      <HeaderRestaurantes/>
      
      <Footer/>
    </div>
  );
};

export default GerirImagens;