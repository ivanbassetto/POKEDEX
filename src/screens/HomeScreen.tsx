import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";
import useFetchPokemons from "../hooks/useFetchPokemons";

const pokemonIds = [1, 4, 7, 304, 25, 12, 132, 92, 151];

const HomeScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"Number" | "Name">("Number");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pokemons = useFetchPokemons(pokemonIds);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const search = searchTerm.toLowerCase();
    const searchTermWithHash = `#${pokemon.number}`.toLowerCase();
  
    // Verificar se o nome começa com a sequência do termo de pesquisa
    return (
      pokemon.name.toLowerCase().startsWith(search) || searchTermWithHash.startsWith(search)
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
