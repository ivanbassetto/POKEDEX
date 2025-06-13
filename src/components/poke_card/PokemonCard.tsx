import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { Pokemon } from "../../types/pokemon";
import styles from "./PokemonCard.module.css";



interface PokemonCardProps {
  pokemon: Pokemon; 
  selectedOption: 'Number' | 'Name';
  pokemonList: Pokemon[];
}
// define o que o componente PokemonCard precisa receber como props.
// Serve só pro TypeScript.
// Ela diz: "essas são as props que esse componente vai receber, e esses são os tipos de cada uma".


const PokemonCard: React.FC<PokemonCardProps> = ({
  // onde você de fato recebe e usa essas props no componente
  pokemon, 
  selectedOption,
  pokemonList,
}) => {
  const { number, name, image } = pokemon; // <- pega os dados aqui
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${number}`, {
      state: {
        selectedOption,
        pokemonList,
      },
    });
  };
  // A função handleClick redireciona para uma tela de detalhes do Pokémon (/pokemon/:number) e leva junto o estado atual (como o filtro e a lista de pokémons) pra essa nova tela.

  return (
    <Button onClick={handleClick} className={`${styles.poke_list} animated_title`}>
      <div className={styles.number_list}>
        <span>#{number}</span>
      </div>
      <img src={image} alt={name} />
      <div className={styles.footer_list}>
        <h3>{name}</h3>
      </div>
    </Button>
  );
};

export default PokemonCard;

// PORQUE O POKEMONCARD NÃO BUSCA OS DADOS DIRETO DA API?

// no React a regra de ouro é:
// Os dados fluem de cima para baixo
// (do componente pai para o filho — via props)

// Se o PokemonCard buscasse os dados da API sozinho:
// Cada card teria que fazer uma requisição — o que geraria várias chamadas desnecessárias.
// Ficaria mais lento, mais difícil de controlar o estado e mais complicado de testar.
// O componente perderia sua simplicidade. Ele deixaria de ser “burro” (só recebe props e exibe).

// Analogia:
// Pensa num restaurante:
// O HomeScreen é a cozinha: prepara tudo.
// O PokemonCard é o garçom: só leva o prato certo pra mesa (exibe o dado).
// Se o garçom tivesse que ir até o supermercado buscar os ingredientes toda vez, viraria caos.
