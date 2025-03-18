import { useState } from "react";
import Button from "./Button";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="partA_header">
        <img src="/diversos/Pokeball.png" alt="pokeball" />
        <h1>Pokédex</h1>
      </div>
      
      <div className="partB_header">
        <div className="input-container">
          <span className="material-symbols-rounded search-icon">search</span>
          <input type="text" placeholder="Search" />
        </div>
        <div className="dropdown-container">
          <Button className="circle" onClick={() => setIsOpen(!isOpen)}>
            <div className="back_sort_header">
              <span className="material-symbols-rounded">text_format</span>
            </div>
          </Button>
          {isOpen && (
            <div className="dropdown-box">
              {/* Conteúdo da dropdown */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
