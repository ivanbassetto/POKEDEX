import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home_screen/HomeScreen";
import PokemonDetailScreen from "./screens/detail_screen/DetailScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/POKEDEX/">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/pokemon/:number" element={<PokemonDetailScreen />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
