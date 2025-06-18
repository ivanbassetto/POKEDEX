import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // npm install @tanstack/react-query
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // npm install react-router-dom
import HomeScreen from "./screens/home_screen/HomeScreen";
import PokemonDetailScreen from "./screens/detail_screen/DetailScreen";

const queryClient = new QueryClient();
//  instância principal que vai controlar todo o cache, revalidação, configurações, etc do React Query.
// é a mente do React Query no projeto.

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* // Esse Provider serve pra compartilhar o queryClient com todo o seu app React. */}
    {/* Ele faz com que todos os componentes possam usar useQuery, useMutation, etc., e acessar o mesmo cache central. */}
      <Router basename="/POKEDEX/">
        <Routes> {/* // Componente do React Router que agrupa as rotas e gerencia qual rota renderizar. */}
          <Route path="/" element={<HomeScreen />} /> {/* // (lembrando que isso será /POKEDEX/ por causa do basename) */}
          <Route path="/pokemon/:number" element={<PokemonDetailScreen />} />
          {/* Define uma rota dinâmica, onde :number é um parâmetro que pode variar (ex: /pokemon/25) */}
          {/* Quando o usuário acessar essa rota, o React renderiza o componente <PokemonDetailScreen /> */}
          {/* Dentro do componente, você pode acessar o parâmetro number para buscar o Pokémon correto. */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;


// RESUMO ROUTER:
// Duas rotas dentro de um router com base /POKEDEX/:
// /POKEDEX/ → HomeScreen
// /POKEDEX/pokemon/:number → PokemonDetailScreen (exemplo: /POKEDEX/pokemon/25)