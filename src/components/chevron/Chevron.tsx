import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import styles from "./Chevron.module.css";

interface Pokemon {
  number: string;
  name: string;
  image: string;
}

interface ChevronProps {
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  pokemonList: Pokemon[];
  selectedOption: "Number" | "Name";
  setIsExiting: (value: boolean) => void;
}

const Chevron: React.FC<ChevronProps> = ({
  isFirst,
  isLast,
  currentIndex,
  pokemonList,
  selectedOption,
  setIsExiting,
}) => {
  const navigate = useNavigate();

  const goToPokemon = (index: number) => {
    const selected = pokemonList[index];
    if (selected) {
      setIsExiting(true);
      setTimeout(() => {
        navigate(`/pokemon/${selected.number}`, {
          state: {
            selectedOption,
            pokemonList,
            transition: index > currentIndex ? "next" : "prev",
            fromPokemon: pokemonList[currentIndex],
          },
        });
      }, 100);
    }
  };

  return (
    <div className={styles.chevron_detail}>
      {!isFirst && (
        <Button
          type="button"
          className={`material-symbols-rounded ${styles.chevron_left_detail}`}
          onClick={() => goToPokemon(currentIndex - 1)}
          aria-label="Pokémon anterior"
        >
          chevron_left
        </Button>
      )}
      {!isLast && (
        <Button
          type="button"
          className={`material-symbols-rounded ${styles.chevron_right_detail}`}
          onClick={() => goToPokemon(currentIndex + 1)}
          aria-label="Próximo Pokémon"
        >
          chevron_right
        </Button>
      )}
    </div>
  );
};

export default Chevron;
