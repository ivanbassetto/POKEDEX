import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./PokeList.module.css";

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

const PokeList: React.FC<PokemonCardProps> = ({
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
    <Button onClick={handleClick} className={`${styles.poke_list} animated_title`}>
      <div className={styles.number_list}>
        <span>#{number}</span>
      </div>
      <img src={image} alt={name} />
      <div className={styles.footer_list}>
        <h3>{name}</h3>
      </div>
    </Button>
  );
};

export default PokeList;
