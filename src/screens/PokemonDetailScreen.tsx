import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Chevron from "../components/Chevron";
import useFetchPokemons from "../hooks/useFetchPokemons";
import PokemonTypeBadge from "../components/PokemonTypeBadge";
import typeColors from "../utils/typeColors"; // ✅ Importa o mapa de cores dos tipos

const PokemonDetailScreen = () => {
  const { number } = useParams();
  const pokemonId = Number(number); // garante que vira número

  const location = useLocation();
  const { selectedOption, pokemonList } = location.state || { selectedOption: "Number", pokemonList: [] };

  const pokemons = useFetchPokemons([pokemonId]);
  const pokemon = pokemons[0]; // só vem 1, então pega direto

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", {
      state: {
        selectedOption,
        pokemonList,
      },
    });
  };

  // Verifica a posição do Pokémon na lista
  const currentIndex = pokemonList?.findIndex((p: any) => Number(p.number) === pokemonId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === pokemonList?.length - 1;

  // ✅ Obtém a cor do primeiro tipo do Pokémon (para estilizar dinamicamente)
  const mainType = pokemon?.types?.[0];
  const mainColor = mainType ? typeColors[mainType] : "#AAA";

  return (
    <div className="pokemon_detail_screen" style={{ backgroundColor: mainColor }}>
      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="img_pokeball_detail"><img src="/diversos/pokeball_detail.png" alt="pokeball" /></div>
      {/* -------------------------------------------------------------------------------------------------- */}

      <div className="header_detail">
        <div className="left_group_detail">
          <Button onClick={handleBack} className="div_arrow_back">
            <span className="material-symbols-rounded">arrow_back</span>
          </Button>
          <h1>{pokemon ? pokemon.name : "Carregando..."}</h1>
        </div>
        <span className="number_detail">#{number}</span>
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}
      <Chevron
        isFirst={isFirst}
        isLast={isLast}
        pokemonList={pokemonList}
        currentIndex={currentIndex}
        selectedOption={selectedOption}
      />
      {/* -------------------------------------------------------------------------------------------------- */}

      <div className="background_about">
        <div className="img_poke_detail">
          {pokemon?.image && (
            <img src={pokemon.image} alt={pokemon.name} className="poke_image_detail" />
          )}
        </div>

        <div className="badge_about">
          <div className="badge_wrapper">
            {pokemon?.types?.length > 0 ? (
              pokemon.types.map((type: string) => (
                <PokemonTypeBadge key={type} type={type} />
              ))
            ) : (
              <span className="text_loading_badges">Carregando tipos...</span>
            )}
          </div>
        </div>

        <h2 className="h2_about" style={{ color: mainColor }}>About</h2> {/* ✅ cor aplicada */}

        <div className="attribute_about">
          <div className="div_attribute">
            <div className="header1_div_attribute">
              <div className="symbol_attribute">
                <span className="material-symbols-rounded weight_attribute">weight</span>
              </div>
              <span className="text_header_attribute">
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
              <span className="text_header_attribute">
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
                  className={`text_header_attribute3 ${
                    pokemon.abilities.length === 1 ? "one-line" : ""
                  }`}
                >
                  {pokemon.abilities.map((ability, index) => (
                    <div key={index}>
                      {ability
                        .split("-")
                        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                        .join("-")}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text_header_attribute3">Carregando...</span>
              )}
            </div>
            <h3>Abilities</h3>
          </div>
        </div>

        <h3 className="text_about">
          {pokemon?.description ? pokemon.description : "Carregando descrição..."}
        </h3>

        <h2 className="h2_about" style={{ color: mainColor }}>Base Stats</h2> {/* ✅ cor aplicada */}

        <div className="basestats_about">
          {pokemon?.stats && [
            { label: "HP", value: pokemon.stats.hp },
            { label: "ATK", value: pokemon.stats.attack },
            { label: "DEF", value: pokemon.stats.defense },
            { label: "SATK", value: pokemon.stats.specialAttack },
            { label: "SDEF", value: pokemon.stats.specialDefense },
            { label: "SPD", value: pokemon.stats.speed },
          ].map((stat, index) => (
            <div className="stat_row" key={index}>
              <span className="label" style={{ color: mainColor }}>{stat.label}</span> {/* ✅ cor aplicada */}
              <div className="divider_basestats" />
              <span className="value">{stat.value.toString().padStart(3, "0")}</span>
              <div
  className="stat_bar"
  style={{ "--main-color": mainColor } as React.CSSProperties}
>
  <div
    className="stat_bar_fill"
    style={{
      width: `${(stat.value / 250) * 100}%`,
    }}
  ></div>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailScreen;
