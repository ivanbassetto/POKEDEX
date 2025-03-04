import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';

const HomeScreen: React.FC = () => {
  const pokemons = [
    { name: "Bulbasaur", image: "/pokeimg/bulbasaur.png" },
    { name: "Charmander", image: "/pokeimg/charmander.png" },
    { name: "Squirtle", image: "/pokeimg/squirtle.png" },
    { name: "Pidgey", image: "/pokeimg/pidgey.png" },
    { name: "Pikachu", image: "/pokeimg/pikachu.png" },
    { name: "Jigglypuff", image: "/pokeimg/jigglypuff.png" },
    { name: "Meowth", image: "/pokeimg/meowth.png" },
    { name: "Psyduck", image: "/pokeimg/psyduck.png" },
    { name: "Eevee", image: "/pokeimg/eevee.png" },
  ];

  return (
    <div className="home-screen">
      <Header />
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;