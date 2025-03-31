import React from 'react';

interface DropdownBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Adicionando o setIsOpen aqui
  selectedOption: 'Number' | 'Name';
  setSelectedOption: React.Dispatch<React.SetStateAction<'Number' | 'Name'>>;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ isOpen, selectedOption, setSelectedOption, setIsOpen }) => {
  if (!isOpen) return null;

  const options: ('Number' | 'Name')[] = ['Number', 'Name'];

  return (
    <div className="dropdown-box">
      <div className="dropdown-header">
        <span className="dropdown-title">Sort by:</span>
      </div>
      <div className="dropdown-options">
        {options.map((option) => (
          <div
            key={option}
            className={`dropdown-option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => {
              setSelectedOption(option);
              setIsOpen(false); // Fecha a DropdownBox ao selecionar
            }}
          >
            <div className="radio-button">
              {selectedOption === option && <div className="selected-indicator" />}
            </div>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownBox;
