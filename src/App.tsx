import './styles/global.css'; // Importa os estilos globais que criamos
import HomeScreen from './screens/HomeScreen'; // Importa a tela inicial da Pokédex

function App() {
  return (
    <div className="app">
      <HomeScreen />
    </div>
  );
}

export default App;