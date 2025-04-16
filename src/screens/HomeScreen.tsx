import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";
import useFetchPokemons from "../hooks/useFetchPokemons";

const pokemonIds = [1, 4, 7, 304, 25, 12, 132, 92, 151];

const HomeScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialSelectedOption = location.state?.selectedOption || "Number";
  const [selectedOption, setSelectedOption] = useState<"Number" | "Name">(initialSelectedOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pokemons = useFetchPokemons(pokemonIds);

  // Atualiza o state da rota ao trocar o selectedOption
  useEffect(() => {
    navigate("/", { state: { selectedOption }, replace: true });
  }, [selectedOption, navigate]);

  // Filtro por nome, número com # ou número sem #
  const filteredPokemons = pokemons.filter((pokemon) => {
    const search = searchTerm.toLowerCase();
    const nameMatch = pokemon.name.toLowerCase().startsWith(search);
    const numberWithHash = `#${pokemon.number}`.toLowerCase();
    const numberWithoutHash = `${pokemon.number}`.toLowerCase();

    return nameMatch || numberWithHash.startsWith(search) || numberWithoutHash.startsWith(search);
  });

  // Ordenação por número ou nome
  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (selectedOption === "Number") {
      return parseInt(a.number) - parseInt(b.number);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="home_screen">
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="pokemon_container">
        {sortedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.number}
            number={pokemon.number}
            name={pokemon.name}
            image={pokemon.image}
            selectedOption={selectedOption}
            pokemonList={sortedPokemons}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
