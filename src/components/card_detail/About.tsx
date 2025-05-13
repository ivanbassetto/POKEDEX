

import styles from "./About.module.css";

const AboutDetailScreen = ({ pokemon, isExiting, mainColor }: any) => {
    return (
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
  
  export default AboutDetailScreen;
  