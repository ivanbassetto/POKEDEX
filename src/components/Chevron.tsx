import { useNavigate } from "react-router-dom";

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
      // Ativa os efeitos de saída
      setIsExiting(true);

      // Aguarda antes de navegar
      setTimeout(() => {
        navigate(`/pokemon/${selected.number}`, {
          state: {
            selectedOption,
            pokemonList,
            transition: index > currentIndex ? "next" : "prev",
            fromPokemon: pokemonList[currentIndex],
          },
        });
      }, 100); // mesmo tempo do efeito CSS
    }
  };

  return (
    <div className="chevron_detail">
      {!isFirst && (
        <button
          type="button"
          className="material-symbols-rounded chevron_left_detail"
          onClick={() => goToPokemon(currentIndex - 1)}
          aria-label="Pokémon anterior"
        >
          chevron_left
        </button>
      )}
      {!isLast && (
        <button
          type="button"
          className="material-symbols-rounded chevron_right_detail"
          onClick={() => goToPokemon(currentIndex + 1)}
          aria-label="Próximo Pokémon"
        >
          chevron_right
        </button>
      )}
    </div>
  );
};

export default Chevron;
