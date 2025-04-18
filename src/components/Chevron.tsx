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
  setIsImageExiting: (value: boolean) => void;
  setIsBadgeExiting: (value: boolean) => void;
  setIsAttributesExiting: (value: boolean) => void; // 👈 nova prop
}

const Chevron: React.FC<ChevronProps> = ({
  isFirst,
  isLast,
  currentIndex,
  pokemonList,
  selectedOption,
  setIsImageExiting,
  setIsBadgeExiting,
  setIsAttributesExiting, // 👈 recebe aqui
}) => {
  const navigate = useNavigate();

  const goToPokemon = (index: number) => {
    const selected = pokemonList[index];
    if (selected) {
      // Ativa os efeitos de saída
      setIsImageExiting(true);
      setIsBadgeExiting(true);
      setIsAttributesExiting(true); // 👈 ativa a saída do container de atributos também

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
