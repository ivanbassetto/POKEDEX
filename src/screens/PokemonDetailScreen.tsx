const PokemonDetailScreen: React.FC = () => {
  return (
    <div className="pokemon-detail">
      <h1>Bulbasaur</h1>
      <img src="/assets/pokemon-icons/bulbasaur.png" alt="Bulbasaur" />
      {/* Adicionaremos stats e detalhes mais tarde */}
      <p>Detalhes do Pokémon virão aqui.</p>
    </div>
  );
};

export default PokemonDetailScreen;