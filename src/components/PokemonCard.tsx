interface PokemonCardProps {
  number: string; // Alterar de number para string
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, number }) => {
  return (
    <div className="pokemon_card">
      <div className="number_card">
        <span>#{number}</span>
      </div>
      <img src={image} alt={name} />
      <div className="pokemon_card_footer">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
