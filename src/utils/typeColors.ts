const typeColors: Record<string, string> = { // é um objeto onde cada chave é uma string e cada valor também é uma string (no caso, uma cor).

    normal: "#AAA67F",
    fighting: "#C12239",
    flying: "#A891EC",
    ground: "#DEC16B",
    poison: "#A43E9E",
    rock: "#B69E31",
    bug: "#A7B723",
    ghost: "#70559B",
    steel: "#B7B9D0",
    fire: "#F57D31",
    water: "#6493EB",
    grass: "#74CB48",
    electric: "#F9CF30",
    psychic: "#FB5584",
    ice: "#9AD6DF",
    dragon: "#7037FF",
    dark: "#7037FF",
    fairy: "#E69EAC",
  };
  
  export default typeColors;
  

// RESUMO:
// typeColors é um dicionário de cores por tipo.
// mainColor pega a cor do primeiro tipo do pokémon.
// Se não tiver tipo, usa um cinza como cor genérica.