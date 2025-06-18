

import styles from "./About.module.css";

const AboutDetail = ({ pokemon, isExiting, mainColor }: any) => {
    return (
// Props 
// pokemon: objeto com os dados do pokémon
// isExiting: se está saindo da tela, usado pra aplicar animações
// mainColor: cor principal baseada no tipo 
      <>
        <h2 className={styles.h2_about} style={{ color: mainColor }}>About</h2>
  
        <div className={styles.attribute_about}>
          <div className={styles.div_attribute}>
            <div className={styles.header_div_attribute}>
              <div className={styles.symbol_attribute}>
              <span className={`material-symbols-rounded ${styles.weight_attribute}`}>weight</span>
              </div>
              <span className={`${styles.text_header_attribute} animated_title ${isExiting ? "exit_effect" : ""}`}>
                {pokemon?.weight ? `${pokemon.weight / 10} kg` : "Carregando..."}
                {/* Exibe o peso do pokémon (dividido por 10 pra converter de hectogramas pra kg)
                Se não tiver carregado ainda, mostra "Carregando..." */}
              </span>
            </div>
            <h3>Weight</h3>
          </div>
  
          <div className={styles.divider_attribute}></div>
  
          <div className={styles.div_attribute}>
            <div className={styles.header_div_attribute}>
              <div className={styles.symbol_attribute}>
                <span className={`material-symbols-rounded ${styles.straighten_attribute}`}>straighten</span>
              </div>
              <span className={`${styles.text_header_attribute} animated_title ${isExiting ? "exit_effect" : ""}`}>
                {pokemon?.height ? `${pokemon.height / 10} m` : "Carregando..."}
                {/* Mesma lógica do peso */}
              </span>
            </div>
            <h3>Height</h3>
          </div>
  
          <div className={styles.divider_attribute}></div>
  
          <div className={styles.div_attribute}>
            <div className={styles.header_div_attribute}>
              {pokemon?.abilities?.length > 0 ? (
                <div
                  key={`${pokemon.name}-abilities`}
                  className={`${styles.text_header_attribute3} animated_title ${pokemon.abilities.length === 1 ? "one-line" : ""} ${isExiting ? "exit_effect" : ""}`}
                  // Aplica classe one-line se tiver só 1 habilidade
                >
                  {pokemon?.abilities?.map((ability: string, index: number) => ( // Itera com .map() e exibe cada uma dentro de uma <div>
                    <div key={index}>
                      {ability
                        .split("-")
                        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)) // primeira letra maiúscula de cada parte
                        .join("-")}
                    </div>
                  ))}
                </div>
              ) : (
                <span className={`${styles.text_header_attribute3} animated_title ${isExiting ? "exit_effect" : ""}`}>
                  Carregando...
                </span>
              )}
            </div>
            <h3>Abilities</h3>
          </div>
        </div>
      </>
    );
  };
  
  export default AboutDetail;
  