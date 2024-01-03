import LoginPage from "./Login";
import CreateAcount from "./CreateAcount";
import ForgotPassword from "./ForgotPassword";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./HomePage";
import CriarRestaurante from "./CriarRestaurante";
import RestauranteLoc from "./RestauranteLoc";
import RestauranteDisponiblidade from "./RestauranteDisponiblidade";

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
                        <Route path="/CreateAcount/" element={<CreateAcount/>}/>
                        <Route path="/Login/" element={<LoginPage />}/>
                        <Route path="/Forgot/" element={<ForgotPassword />}/>
                        <Route path="/Home/" element={<HomePage />}/>
                        <Route path="/CriarRestaurante/" element={<CriarRestaurante />}/>
                        <Route path="/RestauranteLoc/" element={<RestauranteLoc />}/>
                        <Route path="/RestauranteDisponiblidade/" element={<RestauranteDisponiblidade />}/>
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