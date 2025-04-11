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
};

const useFetchPokemons = (pokemonIds: number[]) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = await Promise.all(
        pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();

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
