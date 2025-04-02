import { useParams } from "react-router-dom";

const PokemonDetailScreen = () => {
  const { number } = useParams();

  return (
    <div className="pokemon_detail_screen">
      <h3>Detalhes do Pokémon #{number}</h3>

        <div className="img_pokeball_detail"><img src="/diversos/pokeball_detail.png" alt="pokeball" /></div>

            <div className="header_detail">
                <span className="material-symbols-rounded search-icon">arrow_back</span>
                <h1>Nome do Pokemon</h1>
                <span className="number_detail">#{number}</span>
            </div>

                <div className="chevron_detail">
                    <span className="material-symbols-rounded search-icon">chevron_left</span>
                    <span className="material-symbols-rounded search-icon">chevron_right</span>
                </div>

                <div className="img_poke_detail">
                    <h2>IMAGEM DO POKEMON</h2>
                </div>

                <div className="fundo_about">
                




                </div>
            
        </div>

  );
};

export default PokemonDetailScreen;
