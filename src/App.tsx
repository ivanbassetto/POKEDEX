import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home_screen/HomeScreen";
import PokemonDetailScreen from "./screens/poke_det_screen/PokemonDetailScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/pokemon/:number" element={<PokemonDetailScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
