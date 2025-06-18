
import styles from "./BaseStats.module.css";

const BaseStatsDetail = ({ pokemon, isExiting, mainColor }: { // PROPS
  pokemon: any;
  isExiting: boolean;
  mainColor: string;
}) => {
  return (
    <>
      <h2 className={styles.h2_b_stats} style={{ color: mainColor }}>Base Stats</h2> 
      {/* COR VEM DA PROP MAINCOLOR */}

      <div className={styles.basestats_about}>
        {pokemon?.stats && [
          { label: "HP", value: pokemon.stats.hp },
          { label: "ATK", value: pokemon.stats.attack },
          { label: "DEF", value: pokemon.stats.defense },
          { label: "SATK", value: pokemon.stats.specialAttack },
          { label: "SDEF", value: pokemon.stats.specialDefense },
          { label: "SPD", value: pokemon.stats.speed },
          // Se pokemon.stats existir, cria um array de objetos com as labels e valores das estatísticas base do Pokémon, extraídas do objeto pokemon.stats.
        ].map((stat, index) => ( // Usa .map para iterar e renderizar cada estatística.
          <div className={styles.stat_row} key={index}> 
          {/* // Para cada estatística, cria uma linha com a classe stat_row e chave index para o React. */}
            <span className={styles.label_basestats} style={{ color: mainColor }}>{stat.label}</span>
            <div className={styles.divider_basestats} />
            <span className={`${styles.value_basestats} animated_title ${isExiting ? "exit_effect" : ""}`}>
              {stat.value.toString().padStart(3, "0")}
              {/* valor da estatística formatado com 3 dígitos (ex: 005, 120), usando padStart. */}
            </span>
            <div
              className={styles.stat_bar}
              style={{ "--main-color": mainColor } as React.CSSProperties} 
              // Variável CSS customizada --main-color para estilizar a barra, usando a cor principal.
              // O as React.CSSProperties só está ali para o TypeScript não reclamar da sintaxe, porque ele não reconhece --main-color como uma propriedade válida por padrão.
              // Aplica cores dinâmicas via props diretamente no CSS
            >
              <div
                className={styles.stat_bar_fill}
                style={{
                  width: `${(stat.value / 250) * 100}%`, // Preenche a barra com largura proporcional ao valor da estatística (máximo 250 como base).
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BaseStatsDetail;
