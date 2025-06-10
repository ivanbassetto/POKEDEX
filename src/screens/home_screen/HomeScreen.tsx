
import { useState, useEffect } from "react";
// useState e useEffect são hooks do React que permitem gerenciar estado e efeitos colaterais em componentes funcionais
// useState: cria um estado local no componente
// useEffect: executa uma função depois da renderização (montagem ou atualização do componente).

import { useLocation, useNavigate } from "react-router-dom";
//só funcionam se o componente onde eles estão sendo usados estiver dentro de um <Router>, em main ou App

import useFetchPokemons from "../../hooks/useFetchPokemons";
// hook personalizado que busca dados de Pokémon

import Header from "../../components/header/Header";
import PokemonCard from "../../components/poke_list/PokemonCard";

import styles from "./HomeScreen.module.css";


const pokemonIds = [1, 4, 7, 304, 25, 12, 132, 92, 151];
// array de números que representam os IDs dos Pokémon a serem buscados e exibidos na tela inicial. 

const HomeScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialSelectedOption = location.state?.selectedOption || "Number";
  // Pega o valor de location.state.selectedOption se existir, senão use "Number" como valor padrão.
  // Não está salvando "Number" ou "Name" de forma definitiva. 
  // Fica salvo apenas na memória da navegação atual (state da rota). 
  // Se der F5, ele ainda mantém (porque o React Router mantém o state),
  // mas se abrir em outra aba ou digitar a URL direto, não vai manter.
  const [selectedOption, setSelectedOption] = useState<"Number" | "Name">(initialSelectedOption);
  // Estado que guarda se está selecionado "Number" ou "Name".
  // Controla a opção marcada no Dropdown.
  const [isOpen, setIsOpen] = useState(false);
  // Estado que controla se o Dropdown está aberto ou fechado.
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Estado que guarda o texto digitado na caixa de busca.

  const pokemons = useFetchPokemons(pokemonIds);
  // Chama o hook personalizado useFetchPokemons passando os IDs dos Pokémon.

  
 // Envia para a raiz (/) sempre que Number ou Name são selecionados,
  useEffect(() => {
    navigate("/", { state: { selectedOption }, replace: true });
    // chama a função navigate (do React Router), mandando pra / e passando selectedOption como dado interno de navegação (via state, não como query param).
    // replace: true faz com que essa navegação substitua a entrada atual no histórico do navegador (ou seja, não cria uma nova "página" no botão voltar).
  }, [selectedOption, navigate]);
  // vai rodar sempre que selectedOption mudar.

  // Filtra por nome, número com # ou número sem #
  const filteredPokemons = pokemons.filter((pokemon) => { //Cria um novo array chamado filteredPokemons filtrando o array pokemons.
    const search = searchTerm.toLowerCase(); // transforma tudo em minúsculo para facilitar a comparação sem diferenciar maiúsculas/minúsculas.
    const nameMatch = pokemon.name.toLowerCase().startsWith(search); 
    // Pega o nome do Pokémon, transforma em minúsculo e verifica se ele começa com o termo buscado (search). Resultado é true ou false.
    const numberWithHash = `#${pokemon.number}`.toLowerCase(); // Cria uma string que é o número do Pokémon precedido do caractere #.
    const numberWithoutHash = `${pokemon.number}`.toLowerCase(); // Cria uma string só com o número do Pokémon, sem o #.

    return nameMatch || numberWithHash.startsWith(search) || numberWithoutHash.startsWith(search);
    //Retorna true se o nome começar com o termo buscado OU se o número com o # começar com o termo buscado OU se o número sem o # começar com o termo buscado
    // Ou seja, mantém o Pokémon no filtro se qualquer uma dessas condições for verdadeira.
  });

  // Ordena por número ou nome
  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (selectedOption === "Number") { //Verifica se a opção selecionada pelo usuário é "Number" (ou seja, ele quer ordenar os pokémons por número).
      return parseInt(a.number) - parseInt(b.number); // Se for por número, converte os campos number de a e b (strings) em inteiros com parseInt().
      // Subtrai os dois valores: se o resultado for negativo, a vem antes de b; se for positivo, b vem antes de a; se for 0, mantêm a ordem.
    } else {
      return a.name.localeCompare(b.name); //Ordena os pokémons por ordem alfabética, comparando os nomes com localeCompare() (que leva em conta acentos e ordem correta de caracteres).
    }
  });
//   const sortedPokemons =: Cria uma constante chamada sortedPokemons que vai armazenar a lista de pokémons ordenada.
// [...filteredPokemons]: Cria uma cópia do array filteredPokemons usando o spread operator (...) — isso evita alterar o array original.
// .sort((a, b) => { ... }): Usa a função sort() para ordenar os elementos da cópia. A função recebe dois pokémons por vez (a e b) e decide quem vem primeiro.

  return (
    <div className={styles.home_screen}>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // passando as props necessárias para o Header
      />
      <div className={styles.pokemon_container}>
        {sortedPokemons.map((pokemon) => (
          // map que faz um loop nos Pokémon filtrados e ordenados, criando um componente PokemonCard para cada um.
          <PokemonCard
          // importando o componente PokemonCard, que recebe as props necessárias para exibir cada Pokémon.
            key={pokemon.number} // React precisa disso pra performance e organização interna
            pokemon={pokemon} // passa o objeto inteiro (nome, número, imagem) do Pokémon
            selectedOption={selectedOption}
            pokemonList={sortedPokemons}
            // passando as props necessárias para o PokemonCard
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;


// KEY
// O React usa o key para otimizar renderização quando faz o .map() e reordena itens.
// O key não aparece dentro das props que o componente recebe — ele é só para o React.
// Sempre passe o key no componente dentro do .map()
// Passe os dados necessários via props normalmente, mesmo que o key seja o mesmo valor

