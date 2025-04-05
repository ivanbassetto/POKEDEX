import { useParams } from "react-router-dom";

const PokemonDetailScreen = () => {
  const { number } = useParams();

  return (
    <div className="pokemon_detail_screen">

{/* -------------------------------------------------------------------------------------------------- */}
        <div className="img_pokeball_detail"><img src="/diversos/pokeball_detail.png" alt="pokeball" /></div>
{/* -------------------------------------------------------------------------------------------------- */}
            <div className="header_detail">
                <span className="material-symbols-rounded">arrow_back</span>
                <h1>Nome do Pokemon</h1>
                <span className="number_detail">#{number}</span>
            </div>
{/* -------------------------------------------------------------------------------------------------- */}
                <div className="chevron_detail">
                  <span className="material-symbols-rounded">chevron_left</span>
                  <span className="material-symbols-rounded">chevron_right</span>
                </div>
{/* -------------------------------------------------------------------------------------------------- */}
                <div className="img_poke_detail">
                  <h2>IMAGEM DO POKEMON</h2>
                </div>
{/* -------------------------------------------------------------------------------------------------- */}
{/* --------------------------------------------ISOLAR------------------------------------------------ */}
{/* -------------------------------------------------------------------------------------------------- */}
                <div className="background_about">

                  <div className="badge_about">
                    CARACTERÍSTICAS
                  </div>

                  <h2 className="h2_about">About</h2>

                  <div className="attribute_about">

                    <div className="div_attribute">
                        <div className="header1_div_attribute">
                          <div className="symbol_attribute">
                            <span className="material-symbols-rounded">weight</span>
                          </div>
                          <span>api kg</span>
                        </div>
                        <h3>Weight</h3>         
                    </div>

                    <div className="divider_attribute"></div>

                    <div className="div_attribute">
                        <div className="header2_div_attribute">
                          <div className="symbol_attribute">
                            <span className="material-symbols-rounded">straighten</span>
                          </div>
                          <span>api m</span>
                        </div>
                        <h3>Height</h3>         
                    </div>

                    <div className="divider_attribute"></div>

                    <div className="div_attribute">
                          <span>api moves</span>
                        <h3>Moves</h3>         
                    </div>

                    {/*DIV attribute_about */}
                  </div>

                  <div className="text_about">
                    <span>TEXT ABOUT</span>
                  </div>

                  <h2 className="h2_about">Base Stats</h2>



                  <div className="basestats_about">
                    <div>
                      <span>
                        HP 
                        ATK 
                        DEF 
                        SATK 
                        SDEF 
                        SPD 
                      </span>
                    </div>



                  {/*DIV basestats_about */}
                  </div>  



                 {/*DIV background_about */}
                </div>




            {/*DIV pokemon_detail_screen */}
        </div>

  );
};

export default PokemonDetailScreen;
