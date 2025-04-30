// src/components/AboutDetailScreen.tsx
import PokemonTypeBadge from "./PokemonTypeBadge";
import BaseStatsDetailScreen from "./BaseStatsDetailScreen";
import typeColors from "../utils/typeColors";

const AboutDetailScreen = ({ pokemon, isExiting, isEntering }: any) => {
  const mainColor = pokemon?.types?.[0] ? typeColors[pokemon.types[0]] : "#AAA";

  return (
    <div className="background_about">
      <div className="img_poke_detail">
        {pokemon?.image && (
          <img
            key={pokemon.name}
            src={pokemon.image}
            alt={pokemon.name}
            className={`animated_title ${isExiting ? "exit_effect" : ""}`}
          />
        )}
      </div>

      <div className="badge_about">
        <div className="badge_wrapper">
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

      <h2 className="h2_about" style={{ color: mainColor }}>About</h2>

      <div className="attribute_about">
        <div className="div_attribute">
          <div className="header1_div_attribute">
            <div className="symbol_attribute">
              <span className="material-symbols-rounded weight_attribute">weight</span>
            </div>
            <span className={`text_header_attribute animated_title ${isExiting ? "exit_effect" : ""}`}>
              {pokemon?.weight ? `${pokemon.weight / 10} kg` : "Carregando..."}
            </span>
          </div>
          <h3>Weight</h3>
        </div>

        <div className="divider_attribute"></div>

        <div className="div_attribute">
          <div className="header2_div_attribute">
            <div className="symbol_attribute">
              <span className="material-symbols-rounded straighten_attribute">straighten</span>
            </div>
            <span className={`text_header_attribute animated_title ${isExiting ? "exit_effect" : ""}`}>
              {pokemon?.height ? `${pokemon.height / 10} m` : "Carregando..."}
            </span>
          </div>
          <h3>Height</h3>
        </div>

        <div className="divider_attribute"></div>

        <div className="div_attribute">
          <div className="text_header_attribute3_wrapper">
            {pokemon?.abilities?.length > 0 ? (
              <div
                key={`${pokemon.name}-abilities`}
                className={`text_header_attribute3 animated_title ${pokemon.abilities.length === 1 ? "one-line" : ""} ${isExiting ? "exit_effect" : ""}`}
              >
                {pokemon?.abilities?.map((ability: string, index: number) => (
                  <div key={index}>
                    {ability
                      .split("-")
                      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
                      .join("-")}
                  </div>
                ))}
              </div>
            ) : (
              <span className={`text_header_attribute3 animated_title ${isExiting ? "exit_effect" : ""}`}>
                Carregando...
              </span>
            )}
          </div>
          <h3>Abilities</h3>
        </div>
      </div>

      <h3 className={`text_about animated_title ${isExiting ? "exit_effect" : ""}`}>
        {pokemon?.description ? pokemon.description : "Carregando descrição..."}
      </h3>

      {/* BaseStats (Gráfico) */}
      <BaseStatsDetailScreen pokemon={pokemon} isExiting={isExiting} mainColor={mainColor} />
    </div>
  );
};

export default AboutDetailScreen;
