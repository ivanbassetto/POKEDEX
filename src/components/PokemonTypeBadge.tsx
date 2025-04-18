import typeColors from "../utils/typeColors"; // Importa as cores dos tipos

type Props = {
  type: string;
  isMain?: boolean;
  className?: string; // Novo: recebe animações por classe
};

const PokemonTypeBadge = ({ type, isMain = false, className = "" }: Props) => {
  return (
    <span
      className={`${isMain ? "badge_slide_in" : ""} ${className}`} // Aplica a animação
      style={{
        backgroundColor: typeColors[type] || "#aaa",
        color: "#FFFFFF",
        padding: "2px 8px",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontWeight: 700,
        fontSize: "10px",
        lineHeight: "16px",
        letterSpacing: "0px",
        verticalAlign: "middle",
        margin: "5px",
        textTransform: "capitalize",
        display: "inline-block",
      }}
    >
      {type}
    </span>
  );
};

export default PokemonTypeBadge;
