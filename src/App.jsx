import PaginaLogin from "./Login";
import CreateAcount from "./CreateAcount";
import ForgotPassword from "./ForgotPassword";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./HomePage";
import CriarRestaurante from "./CriarRestaurante";
import RestauranteLoc from "./RestauranteLoc";
import RestauranteDisponiblidade from "./RestauranteDisponiblidade";
import RestauranteAberto from "./RestauranteAberto";
import RestauranteInfos from "./RestauranteInfos";
import RestauranteMenu from "./RestauranteMenu";
import CategoriasRestaurante from "./CategoriasRestaurantes";
import ImagemRestaurante from "./ImagemRestaurante";
import LoginEmpresas from "./LoginRestaurante";
import GerirEmpresa from "./GerirEmpresas";
import GerirRestuarante from "./GerirRestaurante";
import GerirMenus from "./GerirMenu";
import GerirCategorias from "./GerirCategorias";
import GerirDias from "./GerirDias";
import GerirHorarios from "./GerirHorarios";
import GerirImagens from "./GerirImagens";
import GerirMesas from "./GerirMesas";
import MainPage from "./MainPage";
import ResultadosPesquisa from "./PaginaPesquisa";
import RestaurantDetails from "./PaginaDetalhes";
import RestauranteMesa from "./AdicionarMesas";
import MinhasReservasClientes from "./MinhasReservas";
import GerirGrupo from "./GerirMaximo";
import MinhasReservasRestaurante from "./MinhasReservasRestaurante";
import AdicionarReserva from "./AdicionarReserva";
import MinhasAvaliacoes from "./MinhasAvaliacoes";
import TodasAvaliacoes from "./TodasAvaliacoes";
import Historico from "./Historico";
import PrivacyPolicy from "./PrivacyPolicy";
import EsquecerPasswordEmpresas from "./EsquecerPasswordEmpresas";

const queryClient = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});
const App = () => {
    return(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <header>
                <div>
                    <Routes>
                        <Route path="/CreateAcount/" element={<CreateAcount />} />
                        <Route path="/Login/" element={<PaginaLogin />} />
                        <Route path="/Forgot/" element={<ForgotPassword />}/>
                        <Route path="/Home/" element={<HomePage />}/>
                        <Route path="/CriarRestaurante/" element={<CriarRestaurante />} />
                        <Route path="/RestauranteLoc/" element={<RestauranteLoc />} />
                        <Route path="/RestauranteDisponiblidade/" element={<RestauranteDisponiblidade />} />
                        <Route path="/RestauranteAberto/" element={<RestauranteAberto />} />
                        <Route path="/RestauranteInfos/" element={<RestauranteInfos />} />
                        <Route path="/RestauranteMenu/" element={<RestauranteMenu />} />
                        <Route path="/CategoriasRestaurante/" element={<CategoriasRestaurante />} />
                        <Route path="/ImagemRestaurante/" element={<ImagemRestaurante />} />
                        <Route path="/LoginEmpresas/" element={<LoginEmpresas />} />
                        <Route path="/GerirEmpresas/" element={<GerirEmpresa />} />
                        <Route path="/GerirRestaurante/" element={<GerirRestuarante />} />
                        <Route path="/GerirMenus/" element={<GerirMenus />} />
                        <Route path="/GerirCategorias/" element={<GerirCategorias />} />
                        <Route path="/GerirDias/" element={<GerirDias />} />
                        <Route path="/GerirHorarios/" element={<GerirHorarios />} />
                        <Route path="/GerirImagens/" element={<GerirImagens />} />
                        <Route path="/GerirMesas/" element={<GerirMesas />} />
                        <Route path="/MainPage/" element={<MainPage />} />
                        <Route path="/Search/" element={<ResultadosPesquisa />} />
                        <Route path="/Details/:id" element={<RestaurantDetails />} />
                        <Route path="/Mesas/" element={<RestauranteMesa />} />
                        <Route path="/MinhasReservas/" element={<MinhasReservasClientes />} />
                        <Route path="/GerirGrupo/" element={<GerirGrupo />} />
                        <Route path="/MinhasReservasRestaurante/" element={<MinhasReservasRestaurante />} />
                        <Route path="/AdicionarReserva/" element={<AdicionarReserva />} />
                        <Route path="/MinhasAvaliacoes/" element={<MinhasAvaliacoes />} />
                        <Route path="/TodasAvaliacoes/" element={<TodasAvaliacoes />} />
                        <Route path="/Historico/" element={<Historico />} />
                        <Route path="/PrivacyPolicy/" element={<PrivacyPolicy />} />
                        <Route path="/EsquecerPasswordEmpresas/" element={<EsquecerPasswordEmpresas />} />
                    </Routes>
                </div>                   
            </header>
        </QueryClientProvider>
    </BrowserRouter>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);