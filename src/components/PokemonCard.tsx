import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${number}`); // Navega para a tela de detalhes
  };

  return (
    <Button onClick={handleClick} className="pokemon_card">
      <div className="number_card">
        <span>#{number}</span>
      </div>
      <img src={image} alt={name} />
      <div className="pokemon_card_footer">
        <h3>{name}</h3>
      </div>
    </Button>
  );
};

export default PokemonCard;
