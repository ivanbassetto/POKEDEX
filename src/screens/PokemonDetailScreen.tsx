import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Chevron from "../components/Chevron";
import useFetchPokemons from "../hooks/useFetchPokemons";
import PokemonTypeBadge from "../components/PokemonTypeBadge";
import typeColors from "../utils/typeColors";

const PokemonDetailScreen = () => {
  const { number } = useParams();
  const pokemonId = Number(number);

  const location = useLocation();
  const { selectedOption, pokemonList, transition } = location.state || {
    selectedOption: "Number",
    pokemonList: [],
    transition: null,
  };

  const [isImageExiting, setIsImageExiting] = useState(false);
  const [isBadgeExiting, setIsBadgeExiting] = useState(false); // 👈 novo estado
  const [isAttributesExiting, setIsAttributesExiting] = useState(false);


  const pokemons = useFetchPokemons([pokemonId]);
  const pokemon = pokemons[0];

  // Resetar os efeitos de saída quando o Pokémon muda
  useEffect(() => {
    setIsImageExiting(false);
    setIsBadgeExiting(false); // 👈 reset badge também
    setIsAttributesExiting(false);

  }, [pokemon?.name]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", {
      state: {
        selectedOption,
        pokemonList,
      },
    });
  };

  const currentIndex = pokemonList?.findIndex((p: any) => Number(p.number) === pokemonId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === pokemonList?.length - 1;

  const mainType = pokemon?.types?.[0];
  const mainColor = mainType ? typeColors[mainType] : "#AAA";

  // O Pokémon atual está entrando
  const isEntering =
    transition === "next" || transition === "prev"
      ? pokemonList?.[currentIndex]?.number === pokemon?.number
      : true;




  return (
    <div className="pokemon_detail_screen" style={{ backgroundColor: mainColor }}>
      {/* Imagem do Pokébola */}
      <div className="img_pokeball_detail">
        <img src="/diversos/pokeball_detail.png" alt="pokeball" />
      </div>

      {/* Cabeçalho da tela de detalhes */}
      <div className="header_detail">
        <div className="left_group_detail">
          <Button onClick={handleBack} className="div_arrow_back">
            <span className="material-symbols-rounded">arrow_back</span>
          </Button>
          <h1 key={pokemon?.name} className="animated_title">
            {pokemon ? pokemon.name : "Carregando..."}
          </h1>
        </div>
        <span key={number} className="number_detail animated_title">
          #{number}
        </span>
      </div>

      {/* Componente Chevron para navegação */}
      <Chevron
  isFirst={isFirst}
  isLast={isLast}
  currentIndex={currentIndex}
  pokemonList={pokemonList}
  selectedOption={selectedOption}
  setIsImageExiting={setIsImageExiting}
  setIsBadgeExiting={setIsBadgeExiting}
  setIsAttributesExiting={setIsAttributesExiting} // 👈 aqui
/>





      {/* Seção de detalhes do Pokémon */}
      <div className="background_about">
      <div className="img_poke_detail">
  {pokemon?.image && (
    <img
      key={pokemon.name}
      src={pokemon.image}
      alt={pokemon.name}
      className={`animated_title ${isImageExiting ? "exit_effect" : ""}`}
    />
  )}
</div>



        {/* Badges do Pokémon */}
        <div className="badge_about">
  <div className="badge_wrapper">
    {pokemon?.types?.length > 0 ? (
      pokemon.types.map((type: string, index: number) => {
        let animateClass = "";

        // Aplica o efeito apenas na primeira badge, se houver exatamente 2 badges
        if (pokemon.types.length === 2 && index === 0) {
          if (isBadgeExiting) animateClass = "animate_to_center";
          else if (isEntering) animateClass = "animate_from_center";
        }

        // Adiciona a animação de fade em todas as badges
        const badgeClass = `animated_title ${animateClass}`;

        return (
          <PokemonTypeBadge
            key={type}
            type={type}
            className={badgeClass} // Aplica a classe de fade aqui
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
              <span className={`text_header_attribute animated_title ${isAttributesExiting ? "exit_effect" : ""}`}>
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
              <span className={`text_header_attribute animated_title ${isAttributesExiting ? "exit_effect" : ""}`}>
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
        key={`${pokemon.name}-abilities`} // 👈 força re-render
        className={`text_header_attribute3 animated_title ${
          pokemon.abilities.length === 1 ? "one-line" : ""
        } ${isAttributesExiting ? "exit_effect" : ""}`}
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
      <span
        key="loading-abilities" // 👈 também força re-render do "Carregando..."
        className={`text_header_attribute3 animated_title ${isAttributesExiting ? "exit_effect" : ""}`}
      >
        Carregando...
      </span>
              )}
            </div>
            <h3>Abilities</h3>
          </div>
        </div>

        <h3 className="text_about">
          {pokemon?.description ? pokemon.description : "Carregando descrição..."}
        </h3>

        <h2 className="h2_about" style={{ color: mainColor }}>Base Stats</h2>

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
              <span className="label" style={{ color: mainColor }}>{stat.label}</span>
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
