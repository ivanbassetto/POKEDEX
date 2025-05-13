
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useFetchPokemons from "../../hooks/useFetchPokemons";

import Header from "../../components/header/Header";
import PokemonCard from "../../components/poke_list/PokeList";

import styles from "./HomeScreen.module.css";


const pokemonIds = [1, 4, 7, 304, 25, 12, 132, 92, 151];

const HomeScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialSelectedOption = location.state?.selectedOption || "Number";
  const [selectedOption, setSelectedOption] = useState<"Number" | "Name">(initialSelectedOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pokemons = useFetchPokemons(pokemonIds);

  // Updates route state when changing selectedOption
  useEffect(() => {
    navigate("/", { state: { selectedOption }, replace: true });
  }, [selectedOption, navigate]);

  // Filter by name, number with # or number without #
  const filteredPokemons = pokemons.filter((pokemon) => {
    const search = searchTerm.toLowerCase();
    const nameMatch = pokemon.name.toLowerCase().startsWith(search);
    const numberWithHash = `#${pokemon.number}`.toLowerCase();
    const numberWithoutHash = `${pokemon.number}`.toLowerCase();

    return nameMatch || numberWithHash.startsWith(search) || numberWithoutHash.startsWith(search);
  });

  // Sort by number or name
  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (selectedOption === "Number") {
      return parseInt(a.number) - parseInt(b.number);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className={styles.home_screen}>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className={styles.pokemon_container}>
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
