import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";

const pokemonIds = [1, 4, 7, 304, 25, 12, 132, 92, 151];

const HomeScreen: React.FC = () => {
  const [pokemons, setPokemons] = useState<{ number: string; name: string; image: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"Number" | "Name">("Number");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Definir o searchTerm aqui

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = await Promise.all(
        pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          return {
            number: String(data.id).padStart(3, "0"),
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other["official-artwork"].front_default || "/pokeimg/default.png",
          };
        })
      );

      setPokemons(fetchedPokemons);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const search = searchTerm.toLowerCase();
    const searchTermWithHash = `#${pokemon.number}`.toLowerCase(); // Adicionar o símbolo "#" ao número
    
    // Verificar se o nome ou número com "#" corresponde ao termo de pesquisa
    return (
      pokemon.name.toLowerCase().includes(search) || searchTermWithHash.includes(search)
    );
  });
  

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (selectedOption === "Number") {
      return parseInt(a.number) - parseInt(b.number);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="home-screen">
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm} // Passar o searchTerm
        setSearchTerm={setSearchTerm} // Passar a função setSearchTerm
      />
      <div className="pokemon-container">
        {sortedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.number} number={pokemon.number} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
