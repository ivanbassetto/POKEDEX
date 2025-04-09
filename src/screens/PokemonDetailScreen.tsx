import { useParams } from "react-router-dom";

const PokemonDetailScreen = () => {
  const { number } = useParams();

  return (
    <div className="pokemon_detail_screen">

{/* -------------------------------------------------------------------------------------------------- */}
        <div className="img_pokeball_detail"><img src="/diversos/pokeball_detail.png" alt="pokeball" /></div>
{/* -------------------------------------------------------------------------------------------------- */}
<div className="header_detail">
  <div className="left_group_detail">
    <div className="div_arrow_back">
      <span className="material-symbols-rounded">arrow_back</span>
    </div>
    <h1>Pokemon</h1>
  </div>
  <span className="number_detail">#{number}</span>
</div>

{/* -------------------------------------------------------------------------------------------------- */}
                <div className="chevron_detail">
                  <span className="material-symbols-rounded chevron_left_detail">chevron_left</span>
                  <span className="material-symbols-rounded chevron_right_detail">chevron_right</span>
                </div>
{/* -------------------------------------------------------------------------------------------------- */}
                
{/* -------------------------------------------------------------------------------------------------- */}
{/* --------------------------------------------ISOLAR------------------------------------------------ */}
{/* -------------------------------------------------------------------------------------------------- */}
                <div className="background_about">

                <div className="img_poke_detail">
                 
                </div>

                  <div className="badge_about">
                    <span>BADGES</span>
                  </div>

                  <h2 className="h2_about">About</h2>

                  <div className="attribute_about">

                    <div className="div_attribute">
                        <div className="header1_div_attribute">
                          <div className="symbol_attribute">
                            <span className="material-symbols-rounded weight_attribute">weight</span>
                          </div>
                          <span className="text_header_attribute">api kg</span>
                        </div>
                        <h3>Weight</h3>         
                    </div>

                    <div className="divider_attribute"></div>

                    <div className="div_attribute">
                        <div className="header2_div_attribute">
                          <div className="symbol_attribute">
                            <span className="material-symbols-rounded straighten_attribute">straighten</span>
                          </div>
                          <span className="text_header_attribute">api m</span>
                        </div>
                        <h3>Height</h3>         
                    </div>

                    <div className="divider_attribute"></div>

                    <div className="div_attribute">
                          <span className="text_header_attribute3">api moves</span>
                        <h3>Moves</h3>         
                    </div>

                    {/*DIV attribute_about */}
                  </div>

                  <h3 className="text_about">Lorem ipsum, dolor sit amet consectetur adipisicing elit.dsdsdsasaddsa</h3>

                  <h2 className="h2_about">Base Stats</h2>



                  <div className="basestats_about">
  {[
    { label: "HP", value: 45 },
    { label: "ATK", value: 49 },
    { label: "DEF", value: 49 },
    { label: "SATK", value: 65 },
    { label: "SDEF", value: 65 },
    { label: "SPD", value: 45 },
  ].map((stat, index) => (
    <div className="stat_row" key={index}>
      <span className="label">{stat.label}</span>
      <div className="divider_basestats" />
      <span className="value">{stat.value.toString().padStart(3, "0")}</span>
      <div className="stat_bar">
        <div
          className="stat_bar_fill"
          style={{ width: `${(stat.value / 250) * 100}%` }}
        ></div>
      </div>
    </div>
  ))}
</div>




                 {/*DIV background_about */}
                </div>

            {/*DIV pokemon_detail_screen */}
        </div>

  );
};

export default PokemonDetailScreen;
