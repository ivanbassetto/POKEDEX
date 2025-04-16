import Button from "./Button";
import DropdownBox from "./DropdownBox";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: "Number" | "Name";
  setSelectedOption: React.Dispatch<React.SetStateAction<"Number" | "Name">>;
  searchTerm: string; // Receber searchTerm
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Receber setSearchTerm
}

const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  searchTerm, // Desestruturar searchTerm
  setSearchTerm, // Desestruturar setSearchTerm
}) => {
  return (
    <header className="header">
      <div className="partA_header">
        <img src="/diversos/Pokeball.png" alt="pokeball" />
        <h1>Pokédex</h1>
      </div>

    <div className="partB_header">
          <div className="input_container">
                <span className="material-symbols-rounded search_icon">search</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <div
                  className={`input_close ${searchTerm ? 'active' : ''}`}
                  onClick={() => setSearchTerm('')}
                >
                  <span className="material-symbols-rounded close_icon">close</span>
                </div>
          </div>

          <div className="dropdown-container">
            <Button className="circle" onClick={() => setIsOpen(!isOpen)}>
              <div className="back_sort_header">
                <span className="material-symbols-rounded">
                  {selectedOption === "Number" ? "numbers" : "text_format"}
                </span>
              </div>
            </Button>

            {/* Overlay para escurecer o fundo */}
            {isOpen && (
              <div
                    className="overlay"
                    onClick={() => setIsOpen(false)} // Fecha ao clicar no fundo
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
