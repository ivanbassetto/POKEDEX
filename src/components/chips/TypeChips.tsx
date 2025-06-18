import typeColors from "../../utils/typeColors"; 

type Props = {
  type: string;
  className?: string; 
};
//Define o tipo das props que esse componente recebe
// type: obrigatório, nome do tipo do pokémon (ex: "fire")
// className: opcional, permite passar classes CSS externas pra aplicar animações ou estilos extras

const TypeChips = ({ type, className = "" }: Props) => { // Desestrutura as props e garante que className seja string, mesmo se não vier nada ("" por padrão).
  return (
    <span
      className={className}
      style={{
        backgroundColor: typeColors[type] || "#aaa",
        // Renderiza uma tag <span> com as classes externas (como animações).
        // Aplica backgroundColor com base no tipo recebido, usando typeColors.
        // Se não encontrar a cor do tipo, usa cinza "#aaa" como padrão.
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
        textTransform: "capitalize", // ex: "fire" vira "Fire"
        display: "inline-block",
      }}
    >
      {type}
    </span>
  );
};

export default TypeChips;
