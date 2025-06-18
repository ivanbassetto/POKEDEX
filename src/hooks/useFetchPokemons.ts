import { useQueries } from "@tanstack/react-query"; // Importa o hook useQueries do React Query, que permite fazer várias requisições em paralelo.
import { Pokemon } from "../types/pokemon"; // Importa o tipo Pokemon que define a estrutura dos dados de um Pokémon.



const fetchPokemon = async (id: number): Promise<Pokemon> => { //Define uma função assíncrona chamada fetchPokemon que recebe um id do tipo number.
  const [pokemonRes, speciesRes] = await Promise.all([ //aguardando duas requisições ao mesmo tempo (em paralelo) usando Promise.all.
    // pokemonRes e speciesRes serão as respostas dessas requisições.
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`), // Primeira requisição: busca os dados principais do Pokémon (nome, tipos, stats, etc.).
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`) // Segunda requisição: busca os dados de espécie do Pokémon (descrição, habilidades, etc.).
  ]);
  // Ambas usam o mesmo id como parâmetro.

  const data = await pokemonRes.json(); // Converte a resposta da primeira requisição (pokemonRes) de JSON cru para um objeto JavaScript.
  const speciesData = await speciesRes.json(); // Converte a resposta da segunda requisição (speciesRes) de JSON cru para um objeto JavaScript.

  const englishEntry = speciesData.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en"
  );
  // Dentro dos dados da espécie (speciesData), existe um array chamado flavor_text_entries com várias descrições do Pokémon em idiomas diferentes.
  // A função .find() busca a primeira entrada que esteja em inglês (language.name === "en").
  // englishEntry será o objeto dessa descrição em inglês.

  const stats = data.stats.reduce((acc: any, stat: any) => {
// data.stats é um array com os status do Pokémon (ex: HP, ataque, defesa, etc).
// O .reduce() vai transformar esse array em um objeto único.
// acc é o acumulador (objeto que vai armazenar os resultados).
// stat é cada item do array enquanto ele itera.
    switch (stat.stat.name) { // Para cada status (stat), ele verifica o nome do status, como "hp", "attack", etc
      case "hp": // Se o nome for "hp", cria (ou atualiza) a propriedade hp do acumulador com o valor stat.base_stat (o valor numérico do status).
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
    }
    return acc; // Retorna o acumulador atualizado para a próxima iteração.
  }, {}); // O segundo argumento do reduce é o valor inicial do acumulador: um objeto vazio {}.


// Resumo:
// Esse código pega o array de status e transforma em um objeto só com as propriedades:
// {
//   hp: number,
//   attack: number,
//   defense: number,
//   specialAttack: number,
//   specialDefense: number,
//   speed: number
// }
// Facilita acessar os status depois pelo nome direto, tipo stats.hp ou stats.speed.

  return { // Esse return está formatando os dados crus da API em um objeto mais limpo e pronto pra usar no app
    number: String(data.id).padStart(3, "0"), // Transforma o id do Pokémon em string com 3 dígitos, com 0 à esquerda se necessário (Ex: 7 vira "007")
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // deixa a primeira letra maiúscula
    image: data.sprites.other["official-artwork"].front_default || "/pokeimg/default.png", // Imagem oficial do Pokémon. Se não tiver, usa uma imagem padrão.
    types: data.types.map((t: any) => t.type.name), // Extrai os tipos do Pokémon (ex: "electric", "fire", etc).
    weight: data.weight,
    height: data.height,
    moves: data.moves.slice(0, 2).map((m: any) => m.move.name), // Pega os 2 primeiros movimentos e extrai o nome deles.
    abilities: data.abilities.slice(0, 2).map((a: any) =>
      a.ability.name
        .split("-")
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("-")
    ),
    // Pega as 2 primeiras habilidades.
    // Se a habilidade tiver hífen (ex: "solar-power"), divide, capitaliza cada parte e junta de volta com -
    // Ex: "solar-power" → "Solar-Power"

    description: englishEntry?.flavor_text.replace(/\f|\n/g, " ") || "No description available.",
    // Usa a descrição em inglês (flavor_text) da Pokédex.
    // Troca \f e \n por espaço pra limpar o texto.
    // Se não existir, mostra "No description available."
    stats: {
      hp: stats.hp || 0,
      attack: stats.attack || 0,
      defense: stats.defense || 0,
      specialAttack: stats.specialAttack || 0,
      specialDefense: stats.specialDefense || 0,
      speed: stats.speed || 0
    }
    // Monta o objeto de stats formatados (com base na constante stats que você fez no reduce).
    // Se algum valor não existir, coloca 0.
  };
};

const useFetchPokemons = (pokemonIds: number[]) => { // Um hook personalizado que recebe um array de IDs de Pokémon (ex: [1, 4, 7]).
  const results = useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: ["pokemon", id],
      queryFn: () => fetchPokemon(id),
      staleTime: 1000 * 60 * 30, // 30 minutos
    })),
  });
// Para cada ID, cria uma query com:
// queryKey: única por Pokémon (["pokemon", id])
// queryFn: função que busca os dados do Pokémon (fetchPokemon)
// staleTime: tempo em que os dados são considerados “frescos” (30 min = evita refetch desnecessário)
// Resultado: um array de objetos, um pra cada Pokémon (results).

  const pokemons = results.map((r) => r.data).filter(Boolean) as Pokemon[];
// Pega o data de cada resultado.
// filter(Boolean) remove qualquer undefined (caso ainda esteja carregando ou com erro).
// Usa as Pokemon[] pra garantir que o resultado final seja um array de Pokemon.

  return pokemons; // Retorna só os dados dos Pokémons, prontos pra usar no componente.
};

export default useFetchPokemons; // Exporta o hook personalizado para ser usado em outros componentes.
