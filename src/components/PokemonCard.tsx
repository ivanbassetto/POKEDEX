import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface Pokemon {
  number: string;
  name: string;
  image: string;
}

interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
  selectedOption: 'Number' | 'Name';
  pokemonList: Pokemon[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  number,
  selectedOption,
  pokemonList,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${number}`, {
      state: {
        selectedOption,
        pokemonList,
      },
    });
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
