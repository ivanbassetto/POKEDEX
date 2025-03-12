interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <div className="pokemon-card-footer">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;