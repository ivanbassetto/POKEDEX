
import TypeChips from "../../chips/TypeChips";
import AboutDetailScreen from "../about/About";
import BaseStatsDetailScreen from "../basestats/BaseStats";

import typeColors from "../../../utils/typeColors";

import styles from "./CardDetail.module.css";


const CardDetail = ({ pokemon, isExiting, isEntering }: any) => {
// Aqui está sendo criada uma função componente do React chamada CardDetailScreen.
// Ela recebe um objeto com três propriedades como parâmetro:
// pokemon: os dados do pokémon que será exibido
// isExiting: booleano que indica se o componente está "saindo" com uma animação
// isEntering: booleano que indica se o componente está "entrando" com uma animação
// O : any significa que não foi definido um tipo específico (por ora), o que pode ser melhorado com tipagem correta depois.
  const mainColor = pokemon?.types?.[0] ? typeColors[pokemon.types[0]] : "#AAA"; 
// Define uma constante mainColor, que pega a cor principal baseada no tipo do pokémon.
// pokemon?.types?.[0] usa encadeamento opcional, ou seja, só tenta acessar types[0] se pokemon e pokemon.types existirem.
// Se o tipo existir, pega a cor correspondente em typeColors[pokemon.types[0]].
// Se não tiver tipo, usa a cor cinza #AAA como padrão.

  return (
    <div className={styles.background_about}>  {/* Início do JSX retornado pelo componente. */}
      <div className={styles.img_poke_detail}>
        {pokemon?.image && ( // Condição p/ renderizar a img somente se pokemon.image existir. Evita erro caso pokemon esteja indefinido/carregando.
          <img
            key={pokemon.name} // é usada para ajudar o React a identificar esse elemento de forma únicac
            src={pokemon.image}
            alt={pokemon.name}
            className={`animated_title ${isExiting ? "exit_effect" : ""}`}
      // Se isExiting for verdadeiro, adiciona a classe exit_effect para disparar uma animação de saída. Se isExiting for falso, essa parte da string fica vazia.
          />
        )}
      </div>

      <div className={styles.chips_about}>
        <div className={styles.chips_wrapper}>
          {pokemon?.types?.length > 0 ? (
    // Verifica se pokemon existe, se tem types e se a quantidade de tipos é maior que 0. Se sim, renderiza os chips com .map() — se não, não mostra nada.
            pokemon.types.map((type: string, index: number) => { //percorre cada tipo do pokémon usando .map().
              // type é o nome do tipo (ex: "fire") // index é a posição (0 ou 1) // Exemplo: ["fire", "flying"] vai fazer 2 voltas.
              let animateClass = "";

              if (pokemon.types.length === 2 && index === 0) { // Verifica se o pokémon tem dois tipos e se estamos no primeiro tipo (index 0).
                if (isExiting) animateClass = "animate_to_center"; // Se o componente estiver saindo (isExiting), aplica a classe "animate_to_center".
                else if (isEntering) animateClass = "animate_from_center"; // Se estiver entrando (isEntering), aplica "animate_from_center".
              }

              return ( // renderizado pra cada tipo de pokémon.
                <TypeChips
                  key={type} // O key é obrigatório no React quando se usa .map(). Ele ajuda o React a identificar cada item único da lista.
                  // Aqui usa o próprio type como chave (ex: "fire", "flying").
                  type={type}
                  className={`animated_title ${animateClass}`}
                />
              );
            })
          ) : (
            <span className="loading_chips">Carregando tipos...</span> // Se types não existir/vazio: Mostra um <span> com a mensagem: "Carregando tipos...".
          )}
        </div>
      </div>

      <AboutDetailScreen 
      pokemon={pokemon} 
      isExiting={isExiting} 
      mainColor={mainColor} />
      {/* É a chamada de um componente React chamado AboutDetailScreen, passando 3 props pra ele */}
      {/* Envia para o componente todos os dados do pokémon atual. */}
      {/* Envia um booleano que indica se o componente está saindo (usado pra animações). */}
      {/* Envia a cor principal do tipo do pokémon. */}

      <h3 className={`${styles.text_about} animated_title ${isExiting ? "exit_effect" : ""}`}>
        {pokemon?.description ? pokemon.description : "Carregando descrição..."}
      </h3>

      {/* BaseStats (Gráfico) */}
      <BaseStatsDetailScreen 
      pokemon={pokemon} 
      isExiting={isExiting} 
      mainColor={mainColor} />
      {/* Mesma pegada do about */}
    </div>
  );
};

export default CardDetail;
