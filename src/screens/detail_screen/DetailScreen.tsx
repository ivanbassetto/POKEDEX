

import { useParams, useNavigate, useLocation } from "react-router-dom";
// useParams: pega os parâmetros da URL, ex: /pokemon/25 → { number: "25" }
// useNavigate: serve pra navegar entre rotas (voltar, ir pra outra página).
// useLocation: acessa o state passado pela navegação anterior, tipo selectedOption e pokemonList.
import { useState, useEffect } from "react";


import useFetchPokemons from "../../hooks/useFetchPokemons";
import typeColors from "../../utils/typeColors";


import Button from "../../components/button/Button";
import Chevron from "../../components/chevron/Chevron";
import CardDetail from "../../components/card_detail/card_detail/CardDetail";


import styles from "./DetailScreen.module.css";


const PokemonDetailScreen = () => {
  const { number } = useParams();
  const pokemonId = Number(number);
  // Pega o número da URL (number) e transforma em número real (pokemonId).

  const location = useLocation();
  const { selectedOption, pokemonList, transition } = location.state || {
    selectedOption: "Number",
    pokemonList: [],
    transition: null,
  };
  // Pega os dados enviados pela tela anterior. Se não tiver, usa valores padrão.

  const [isExiting, setIsExiting] = useState(false); // Controle de animação de saída.

  const pokemons = useFetchPokemons([pokemonId]);
  const pokemon = pokemons[0];
  // Usa o hook para buscar os dados do Pokémon atual e pega o primeiro (e único) resultado.

  useEffect(() => {
    setIsExiting(false);
  }, [pokemon?.name]);
  // Toda vez que o nome do Pokémon mudar (ou seja, trocou de Pokémon), reseta isExiting.

  const navigate = useNavigate(); // Para usar a função de navegação depois.

  const handleBack = () => { // Função chamada ao clicar em voltar. Retorna para a Home e envia o estado pra manter a ordenação e lista.
    navigate("/", {
      state: {
        selectedOption,
        pokemonList,
      },
    });
  };
  

  const currentIndex = pokemonList?.findIndex((p: any) => Number(p.number) === pokemonId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === pokemonList?.length - 1;
  // Calcula qual posição o Pokémon atual tá na lista.
  // Marca se ele é o primeiro ou o último, útil pra desativar os botões de navegação.

  const mainType = pokemon?.types?.[0];
  const mainColor = mainType ? typeColors[mainType] : "#AAA";
  // Pega o tipo principal do Pokémon e busca a cor correspondente. Se não tiver, usa cinza claro.

  const isEntering =
    transition === "next" || transition === "prev"
      ? pokemonList?.[currentIndex]?.number === pokemon?.number
      : true;
      // Define se o Pokémon está entrando com animação. Isso depende da transição vinda da navegação.

  return (
    <div className={styles.pokemon_detail_screen} style={{ backgroundColor: mainColor }}>
      <div className={styles.img_pokeball_detail}>   {/* pokeball background */}
        <img src={`${import.meta.env.BASE_URL}diversos/pokeball_detail.png`} alt="pokeball" />
      </div>

      {/* header */}
      <div className={styles.header_detail}> 
        {/* // Cabeçalho da tela com botão de voltar, nome do Pokémon e número. */}
        <div className={styles.left_group_detail}>
          <Button onClick={handleBack} className={styles.div_arrow_back}>
            <span className="material-symbols-rounded">arrow_back</span>
          </Button>
          <h1 key={pokemon?.name} className={`animated_title ${isExiting ? "exit_effect" : ""}`}>
            {pokemon ? pokemon.name : "Carregando..."}
          </h1>
        </div>
        <span key={number} className={`${styles.number_detail} animated_title ${isExiting ? "exit_effect" : ""}`}>
          #{number}
        </span>
      </div>

      {/* navigation */}
      <Chevron
        isFirst={isFirst}
        isLast={isLast}
        currentIndex={currentIndex}
        pokemonList={pokemonList}
        selectedOption={selectedOption}
        setIsExiting={setIsExiting}
      />
      {/* PROPS ENVIADAS PARA O COMPONENTE CHEVRON */}

      {/* details */}
      <CardDetail // Componente que mostra as informações detalhadas, recebendo o Pokémon atual e status da animação.
      pokemon={pokemon} 
      isExiting={isExiting} 
      isEntering={isEntering} />
    </div>
  );
};

export default PokemonDetailScreen;

// O IMPORT DO USEFETCHPOKEMONS É NECESSÁRIO EM SCREENS, OS DADOS SERÃO PASSADOS VIA PROPS PARA OS COMPONENTES FILHOS