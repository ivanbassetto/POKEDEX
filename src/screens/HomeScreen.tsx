import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';

const HomeScreen: React.FC = () => {
  const pokemons = [
    { name: "Bulbasaur", image: "/pokeimg/bulbasaur.png" },
    { name: "Charmander", image: "/pokeimg/charmander.png" },
    { name: "Squirtle", image: "/pokeimg/squirtle.png" },
    { name: "Aron", image: "/pokeimg/aron.png" },
    { name: "Pikachu", image: "/pokeimg/pikachu.png" },
    { name: "Butterfree", image: "/pokeimg/butterfree.png" },
    { name: "Ditto", image: "/pokeimg/ditto.png" },
    { name: "Gastly", image: "/pokeimg/gastly.png" },
    { name: "Mew", image: "/pokeimg/mew.png" },
  ];

  return (
    <div className="home-screen">
      <Header />
      <div className="pokemon-container">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;