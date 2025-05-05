// src/components/AboutDetailScreen.tsx
import PokemonTypeBadge from "../PokemonTypeBadge";
import AboutDetailScreen from "./AboutDetailScreen";
import BaseStatsDetailScreen from "./BaseStatsDetailScreen";
import typeColors from "../../utils/typeColors";
import styles from "./CardDetailScreen.module.css";

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

      <div className={styles.badge_about}>
        <div className={styles.badge_wrapper}>
          {pokemon?.types?.length > 0 ? (
            pokemon.types.map((type: string, index: number) => {
              let animateClass = "";

              if (pokemon.types.length === 2 && index === 0) {
                if (isExiting) animateClass = "animate_to_center";
                else if (isEntering) animateClass = "animate_from_center";
              }

              return (
                <PokemonTypeBadge
                  key={type}
                  type={type}
                  className={`animated_title ${animateClass}`}
                />
              );
            })
          ) : (
            <span className="text_loading_badges">Carregando tipos...</span>
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
