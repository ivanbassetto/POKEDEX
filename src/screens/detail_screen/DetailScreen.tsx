// src/screens/poke_det_screen/PokemonDetailScreen.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Chevron from "../../components/chevron/Chevron";
import useFetchPokemons from "../../hooks/useFetchPokemons";
import typeColors from "../../utils/typeColors";
import styles from "./DetailScreen.module.css";
import CardDetailScreen from "../../components/card_detail/CardDetail";

const PokemonDetailScreen = () => {
  const { number } = useParams();
  const pokemonId = Number(number);

  const location = useLocation();
  const { selectedOption, pokemonList, transition } = location.state || {
    selectedOption: "Number",
    pokemonList: [],
    transition: null,
  };

  const [isExiting, setIsExiting] = useState(false);

  const pokemons = useFetchPokemons([pokemonId]);
  const pokemon = pokemons[0];

  useEffect(() => {
    setIsExiting(false);
  }, [pokemon?.name]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", {
      state: {
        selectedOption,
        pokemonList,
      },
    });
  };

  const currentIndex = pokemonList?.findIndex((p: any) => Number(p.number) === pokemonId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === pokemonList?.length - 1;

  const mainType = pokemon?.types?.[0];
  const mainColor = mainType ? typeColors[mainType] : "#AAA";

  const isEntering =
    transition === "next" || transition === "prev"
      ? pokemonList?.[currentIndex]?.number === pokemon?.number
      : true;

  return (
    <div className={styles.pokemon_detail_screen} style={{ backgroundColor: mainColor }}>
      {/* Pokébola de fundo */}
      <div className={styles.img_pokeball_detail}>
        <img src="/diversos/pokeball_detail.png" alt="pokeball" />
      </div>

      {/* Cabeçalho */}
      <div className={styles.header_detail}>
        <div className={styles.left_group_detail}>
          <Button onClick={handleBack} className={styles.div_arrow_back}>
            <span className="material-symbols-rounded">arrow_back</span>
          </Button>
          <h1 key={pokemon?.name} className={`animated_title ${isExiting ? "exit_effect" : ""}`}>
            {pokemon ? pokemon.name : "Carregando..."}
          </h1>
        </div>
        <span key={number} className={`${styles.number_detail} animated_title ${isExiting ? "exit_effect" : ""}`}>
          #{number}
        </span>
      </div>

      {/* Navegação entre Pokémons */}
      <Chevron
        isFirst={isFirst}
        isLast={isLast}
        currentIndex={currentIndex}
        pokemonList={pokemonList}
        selectedOption={selectedOption}
        setIsExiting={setIsExiting}
      />

      {/* Detalhes do Pokémon */}
      <CardDetailScreen pokemon={pokemon} isExiting={isExiting} isEntering={isEntering} />
    </div>
  );
};

export default PokemonDetailScreen;
