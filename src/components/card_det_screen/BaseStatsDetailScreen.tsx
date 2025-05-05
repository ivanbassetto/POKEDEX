import React from "react";
import styles from "./BaseStatsDetailScreen.module.css";

const BaseStatsDetailScreen = ({ pokemon, isExiting, mainColor }: {
  pokemon: any;
  isExiting: boolean;
  mainColor: string;
}) => {
  return (
    <>
      <h2 className={styles.h2_b_stats} style={{ color: mainColor }}>Base Stats</h2>

      <div className={styles.basestats_about}>
        {pokemon?.stats && [
          { label: "HP", value: pokemon.stats.hp },
          { label: "ATK", value: pokemon.stats.attack },
          { label: "DEF", value: pokemon.stats.defense },
          { label: "SATK", value: pokemon.stats.specialAttack },
          { label: "SDEF", value: pokemon.stats.specialDefense },
          { label: "SPD", value: pokemon.stats.speed },
        ].map((stat, index) => (
          <div className={styles.stat_row} key={index}>
            <span className={styles.label_basestats} style={{ color: mainColor }}>{stat.label}</span>
            <div className={styles.divider_basestats} />
            <span className={`${styles.value_basestats} animated_title ${isExiting ? "exit_effect" : ""}`}>
              {stat.value.toString().padStart(3, "0")}
            </span>
            <div
              className={styles.stat_bar}
              style={{ "--main-color": mainColor } as React.CSSProperties}
            >
              <div
                className={styles.stat_bar_fill}
                style={{
                  width: `${(stat.value / 250) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BaseStatsDetailScreen;
