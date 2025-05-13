
import TypeChips from "../TypeChips";
import AboutDetailScreen from "./About";
import BaseStatsDetailScreen from "./BaseStats";

import typeColors from "../../utils/typeColors";

import styles from "./CardDetail.module.css";


const CardDetailScreen = ({ pokemon, isExiting, isEntering }: any) => {
  const mainColor = pokemon?.types?.[0] ? typeColors[pokemon.types[0]] : "#AAA";

  return (
    <div className={styles.background_about}>
      <div className={styles.img_poke_detail}>
        {pokemon?.image && (
          <img
            key={pokemon.name}
            src={pokemon.image}
            alt={pokemon.name}
            className={`animated_title ${isExiting ? "exit_effect" : ""}`}
          />
        )}
      </div>

      <div className={styles.chips_about}>
        <div className={styles.chips_wrapper}>
          {pokemon?.types?.length > 0 ? (
            pokemon.types.map((type: string, index: number) => {
              let animateClass = "";

              if (pokemon.types.length === 2 && index === 0) {
                if (isExiting) animateClass = "animate_to_center";
                else if (isEntering) animateClass = "animate_from_center";
              }

              return (
                <TypeChips
                  key={type}
                  type={type}
                  className={`animated_title ${animateClass}`}
                />
              );
            })
          ) : (
            <span className="loading_chips">Carregando tipos...</span>
          )}
        </div>
      </div>

      <AboutDetailScreen pokemon={pokemon} isExiting={isExiting} mainColor={mainColor} />

      <h3 className={`${styles.text_about} animated_title ${isExiting ? "exit_effect" : ""}`}>
        {pokemon?.description ? pokemon.description : "Carregando descrição..."}
      </h3>

      {/* BaseStats (Gráfico) */}
      <BaseStatsDetailScreen pokemon={pokemon} isExiting={isExiting} mainColor={mainColor} />
    </div>
  );
};

export default CardDetailScreen;
