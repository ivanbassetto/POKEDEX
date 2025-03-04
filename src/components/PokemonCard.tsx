interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;