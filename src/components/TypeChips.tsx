import typeColors from "../utils/typeColors"; 

type Props = {
  type: string;
  className?: string; 
};

const TypeChips = ({ type, className = "" }: Props) => {
  return (
    <span
      className={className}
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

export default TypeChips;
