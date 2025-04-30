import React from "react";

const BaseStatsDetailScreen = ({ pokemon, isExiting, mainColor }: {
  pokemon: any;
  isExiting: boolean;
  mainColor: string;
}) => {
  return (
    <>
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
            <span className="label_basestats" style={{ color: mainColor }}>{stat.label}</span>
            <div className="divider_basestats" />
            <span className={`value_basestats animated_title ${isExiting ? "exit_effect" : ""}`}>
              {stat.value.toString().padStart(3, "0")}
            </span>
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
    </>
  );
};

export default BaseStatsDetailScreen;
