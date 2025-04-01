import typeColors from "../utils/typeColors"; // Importa as cores dos tipos

type Props = {
  type: string;
};

const PokemonTypeBadge = ({ type }: Props) => {
  return (
    <span
      style={{
        backgroundColor: typeColors[type] || "#aaa",
        color: "#FFFFFF", // Cor do texto
        paddingTop: "2px",
        paddingRight: "8px",
        paddingBottom: "2px",
        paddingLeft: "8px",
        borderRadius: "10px",
        fontFamily: "Poppins", // Fonte do Figma
        fontWeight: 700, // Peso da fonte
        fontSize: "10px", // Tamanho da fonte
        lineHeight: "16px", // Altura da linha
        letterSpacing: "0px", // Espaçamento entre letras
        verticalAlign: "middle", // Alinha verticalmente
        margin: "5px",
        textTransform: "capitalize", // Primeira letra maiúscula
      }}
    >
      {type}
    </span>
  );
};

export default PokemonTypeBadge;
