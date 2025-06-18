import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { Pokemon } from "../../types/pokemon";
import styles from "./Chevron.module.css";


interface ChevronProps {
  isFirst: boolean; // true se for o primeiro da lista (não mostra seta esquerda)
  isLast: boolean; // true se for o último da lista (não mostra seta direita)
  currentIndex: number; // índice atual do Pokémon mostrado
  pokemonList: Pokemon[]; // lista completa de Pokémons (ordenada)
  selectedOption: "Number" | "Name"; // modo de ordenação (por número ou nome)
  setIsExiting: (value: boolean) => void; // função pra iniciar a animação de saída
}

const Chevron: React.FC<ChevronProps> = ({
  isFirst,
  isLast,
  currentIndex,
  pokemonList,
  selectedOption,
  setIsExiting,
}) => {
  // NÃO PRECISOU FAZER IGUAL O POKEMONCARD, NÃO VAI PRECISAR DOS DADOS DO POKÉMON AQUI
  const navigate = useNavigate(); // Hook do react-router-dom pra mudar de página por código.

  const goToPokemon = (index: number) => {
    const selected = pokemonList[index]; // // pega o Pokémon do índice novo
    if (selected) {
      setIsExiting(true); // // dispara animação de saída
      setTimeout(() => {
        navigate(`/pokemon/${selected.number}`, {
          state: {
            selectedOption,
            pokemonList,
            transition: index > currentIndex ? "next" : "prev", // tipo de animação
            fromPokemon: pokemonList[currentIndex], // quem era o Pokémon antes da troca
          },
        });
      }, 100); // espera 100ms pra animação rodar antes de trocar de tela
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
        // Botão da esquerda (voltar Pokémon)
        // Se não for o primeiro Pokémon da lista, mostra a seta pra esquerda que chama goToPokemon com índice anterior.
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
        // Botão da direita (próximo Pokémon)
        // Se não for o último Pokémon da lista, mostra a seta pra direita que chama goToPokemon com o próximo índice.
      )}
    </div>
  );
};

export default Chevron;


// RESUMO:
// Recebe a lista de Pokémons e sabe qual está sendo exibido.
// Mostra setas para anterior e próximo, se possível.
// Quando clicado, dispara uma animação e muda de rota para o Pokémon seguinte ou anterior usando navigate, mantendo informações úteis no state.