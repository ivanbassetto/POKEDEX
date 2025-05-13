import { useState, useEffect } from "react";

type Pokemon = {
  number: string;
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  moves: string[];
  abilities: string[];
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

const useFetchPokemons = (pokemonIds: number[]) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = await Promise.all(
        pokemonIds.map(async (id) => {
          const [pokemonRes, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          ]);

          const data = await pokemonRes.json();
          const speciesData = await speciesRes.json();

          // description in English
          const englishEntry = speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          );

          // statistics
          const stats = data.stats.reduce((acc: any, stat: any) => {
            switch (stat.stat.name) {
              case "hp":
                acc.hp = stat.base_stat;
                break;
              case "attack":
                acc.attack = stat.base_stat;
                break;
              case "defense":
                acc.defense = stat.base_stat;
                break;
              case "special-attack":
                acc.specialAttack = stat.base_stat;
                break;
              case "special-defense":
                acc.specialDefense = stat.base_stat;
                break;
              case "speed":
                acc.speed = stat.base_stat;
                break;
              default:
                break;
            }
            return acc;
          }, {});

          return {
            number: String(data.id).padStart(3, "0"),
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other["official-artwork"].front_default || "/pokeimg/default.png",
            types: data.types.map((t: any) => t.type.name),
            weight: data.weight,
            height: data.height,
            moves: data.moves.slice(0, 2).map((m: any) => m.move.name),
            abilities: data.abilities.slice(0, 2).map((a: any) =>
              a.ability.name
                .split("-")
                .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
                .join("-")
            ),
            description: englishEntry?.flavor_text.replace(/\f|\n/g, " ") || "No description available.",
            stats: {
              hp: stats.hp || 0,
              attack: stats.attack || 0,
              defense: stats.defense || 0,
              specialAttack: stats.specialAttack || 0,
              specialDefense: stats.specialDefense || 0,
              speed: stats.speed || 0
            }
          };
        })
      );

      setPokemons(fetchedPokemons);
    };

    fetchPokemons();
  }, [pokemonIds]);

  return pokemons;
};

export default useFetchPokemons;
