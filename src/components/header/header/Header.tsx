import Button from "../../button/Button";
import DropdownBox from "../dropdownbox/DropdownBox";
import styles from "./Header.module.css";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: "Number" | "Name";
  setSelectedOption: React.Dispatch<React.SetStateAction<"Number" | "Name">>;
  searchTerm: string; 
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; 
}
// React.Dispatch é um tipo que representa uma função que pode ser usada para atualizar o estado.
// No pokemoncard foi feito somente a leitura 

const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  searchTerm, 
  setSearchTerm, 
}) => {
  return (
    <header className={`${styles.header} animated_title`}>
      <div className={styles.partA_header}>
        <img src={`${import.meta.env.BASE_URL}diversos/Pokeball.png`} alt="pokeball" />
        <h1>Pokédex</h1>
      </div>

    <div className={styles.partB_header}>
          <div className={styles.input_container}>
                <span className={`material-symbols-rounded ${styles.search_icon}`}>search</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <div
                  className={`${styles.input_close} ${searchTerm ? styles.input_active : ''}`}
                  onClick={() => setSearchTerm('')}
                >
                  <span className={`material-symbols-rounded ${styles.close_icon}`}>close</span>
                </div>
          </div>

          <div className={styles.dropdown_container}>
            <Button className={styles.circle_dropdown} onClick={() => setIsOpen(!isOpen)}>
              <div className={styles.symbol_circle}>
                <span className="material-symbols-rounded">
                  {selectedOption === "Number" ? "numbers" : "text_format"}
                </span>
              </div>
            </Button>

            {/* Overlay */}
            {isOpen && ( 
              <div
                    className={styles.overlay_dropdown}
                    onClick={() => setIsOpen(false)} // Fecha ao clicar fora
                  />
                )}

                <DropdownBox
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
            </div>
    </div>
    </header>
  );
};

export default Header;


// O React Context serve pra evitar o repasse de props em cadeia (prop drilling).

// Em vez de mandar props de HomeScreen → Header → DropdownBox, cria um "portal global" onde qualquer componente acessa ou altera o estado, sem precisar que ele venha por props.

// EX:
// 1. Crie o contexto (em DropdownContext.tsx)
// 2. Envolva sua app com esse provider
// 3. Use o contexto em qualquer componente
// Resultado:
// Agora o DropdownBox não precisa receber nenhuma prop. Ele acessa e altera os dados direto do contexto.

