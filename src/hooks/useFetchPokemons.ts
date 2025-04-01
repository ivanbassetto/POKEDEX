import { useState, useEffect } from "react";

const useFetchPokemons = (pokemonIds: number[]) => {
  const [pokemons, setPokemons] = useState<{ number: string; name: string; image: string }[]>([]);

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
