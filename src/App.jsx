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
import ImagemMenu from "./ImagemMenu";
import ImagemPlanta from "./PlantaRestaurante";
import CategoriasRestaurante from "./CategoriasRestaurantes";
import ImagemRestaurante from "./ImagemRestaurante";
import LoginEmpresas from "./LoginRestaurante";
import GerirEmpresa from "./GerirEmpresas";
import GerirRestuarante from "./GerirRestaurante";
import GerirMenus from "./GerirMenu";
import GerirCategorias from "./GerirCategorias";
import GerirDias from "./GerirDias";
import GerirHorarios from "./GerirHorarios";
import GerirImagemMenu from "./GerirImagemMenu";
import GerirImagens from "./GerirImagens";
import GerirPlanta from "./GerirPlanta";
import GerirMesas from "./GerirMesas";
import MainPage from "./MainPage";
import ResultadosPesquisa from "./PaginaPesquisa";
import RestaurantDetails from "./PaginaDetalhes";
import RestauranteMesa from "./AdicionarMesas";

//É o que renderiza a página principal e a página de detalhes através do BrowserRouter 7
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
                        <Route path="/ImagemMenu/" element={<ImagemMenu />} />
                        <Route path="/ImagemPlanta/" element={<ImagemPlanta />} />
                        <Route path="/CategoriasRestaurante/" element={<CategoriasRestaurante />} />
                        <Route path="/ImagemRestaurante/" element={<ImagemRestaurante />} />
                        <Route path="/LoginEmpresas/" element={<LoginEmpresas />} />
                        <Route path="/GerirEmpresas/" element={<GerirEmpresa />} />
                        <Route path="/GerirRestaurante/" element={<GerirRestuarante />} />
                        <Route path="/GerirMenus/" element={<GerirMenus />} />
                        <Route path="/GerirCategorias/" element={<GerirCategorias />} />
                        <Route path="/GerirDias/" element={<GerirDias />} />
                        <Route path="/GerirHorarios/" element={<GerirHorarios />} />
                        <Route path="/GerirImagemMenu/" element={<GerirImagemMenu />} />
                        <Route path="/GerirImagens/" element={<GerirImagens />} />
                        <Route path="/GerirPlanta/" element={<GerirPlanta />} />
                        <Route path="/GerirMesas/" element={<GerirMesas />} />
                        <Route path="/MainPage/" element={<MainPage />} />
                        <Route path="/Search/" element={<ResultadosPesquisa />} />
                        <Route path="/Details/" element={<RestaurantDetails />} />
                        <Route path="/Mesas/" element={<RestauranteMesa />} />
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