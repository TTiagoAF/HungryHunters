import PaginaLogin from "./Login";
import CreateAcount from "./CreateAcount";
import ForgotPassword from "./ForgotPassword";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useState } from "react";

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <header>
                <div>
                    <Routes>
                        <Route path="/CreateAcount/" element={<CreateAcount />} />
                        <Route path="/Login/" element={<PaginaLogin setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/Forgot/" element={<ForgotPassword />} />
                        <Route path="/Home/" element={isLoggedIn ? <HomePage /> : <Navigate to="/Login/" />} />
                        <Route path="/CriarRestaurante/" element={<CriarRestaurante />} />
                        <Route path="/RestauranteLoc/" element={<RestauranteLoc />} />
                        <Route path="/RestauranteDisponiblidade/" element={<RestauranteDisponiblidade />} />
                        <Route path="/RestauranteAberto/" element={<RestauranteAberto />} />
                        <Route path="/RestauranteInfos/" element={<RestauranteInfos />} />
                        <Route path="/RestauranteMenu/" element={<RestauranteMenu />} />
                        <Route path="/ImagemMenu/" element={<ImagemMenu />} />
                        <Route path="/ImagemPlanta/" element={<ImagemPlanta />} />
                        <Route path="/CategoriasRestaurante/" element={<CategoriasRestaurante />} />
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